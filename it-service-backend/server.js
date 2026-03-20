require("dotenv").config();

const twilio = require("twilio");

const smsClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const ADMIN_KEY = process.env.ADMIN_KEY;

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

/* ---------- AI CLASSIFIER ---------- */
const { trainClassifier, classifyIssue } = require("./ai/ticketClassifier");

const app = express();
const PORT = 5000;

/* Train AI model when server starts */
trainClassifier();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

/* ---------- MongoDB Connection ---------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* ---------- Ticket Schema ---------- */
const ticketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    unique: true,
  },

  name: String,
  email: String,
  phone: String,
  brand: String,
  issue: String,

  status: {
    type: String,
    default: "Open",
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },

  category: {
    type: String,
    default: "Unclassified",
  },

  confidence: {
    type: Number,
    default: 0
  },

  messages: [
    {
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

/* ---------- Routes ---------- */

// Test route
app.get("/", (req, res) => {
  res.send("MongoDB backend is running");
});

/* ---------- Raise Ticket ---------- */
app.post("/api/raise-ticket", async (req, res) => {
  try {
    const { name, email, phone, brand, issue } = req.body;

    if (!name || !email || !phone || !brand || !issue) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const ticketId = "TCK" + Math.floor(100000 + Math.random() * 900000);

    /* AI classification */
    const aiResult = classifyIssue(issue);

    const ticket = new Ticket({
      ticketId,
      name,
      email,
      phone,
      brand,
      issue,
      category: aiResult.category,
      priority: aiResult.priority,
      confidence: aiResult.confidence,
      messages: [],
     });

    await ticket.save();

    /* ---------- EMAIL ---------- */
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter
        .sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: `Ticket Registered - ${ticketId}`,
          text: `
Hello ${name},

Your service request has been registered.

Ticket ID: ${ticketId}
Category: ${aiResult.category}
Priority: ${aiResult.priority}

Our team will get back to you shortly.

Thank you,
Genuine Computers & Technologies
          `,
        })
        .catch((err) => console.error("Email send error:", err));
    }

    /* ---------- SMS ---------- */
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE
    ) {
      await smsClient.messages
        .create({
          body: `Genuine Computers: Ticket ${ticketId} registered. Priority: ${aiResult.priority}`,
          from: process.env.TWILIO_PHONE,
          to: `+91${phone}`,
        })
        .catch((err) => console.error("SMS send error:", err));
    }

    res.json({
      message: "Ticket created successfully",
      ticket_id: ticketId,
      category: aiResult.category,
      priority: aiResult.priority,
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------- Track Ticket ---------- */
app.get("/api/track-ticket/:ticketId", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      ticketId: req.params.ticketId,
    });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({
      ticket_id: ticket.ticketId,
      brand: ticket.brand,
      issue: ticket.issue,
      status: ticket.status,
      category: ticket.category,
      priority: ticket.priority,
      messages: ticket.messages || [],
    });
  } catch (error) {
    console.error("Error tracking ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------- Admin Auth ---------- */
function adminAuth(req, res, next) {
  const key = req.headers["x-admin-key"];

  if (!ADMIN_KEY || key !== ADMIN_KEY) {
    return res.status(403).json({ error: "Unauthorized access" });
  }

  next();
}

/* ---------- Admin: Get Tickets ---------- */
app.get("/api/admin/tickets", adminAuth, async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ _id: -1 });
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------- Admin: Update Status ---------- */
app.put("/api/admin/update-status", adminAuth, async (req, res) => {
  try {
    const { ticketId, status } = req.body;

    if (!ticketId || !status) {
      return res
        .status(400)
        .json({ error: "Ticket ID and status are required" });
    }

    const ticket = await Ticket.findOneAndUpdate(
      { ticketId },
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({ message: "Status updated", ticket });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------- Admin: Add Message ---------- */
app.post("/api/admin/add-message", adminAuth, async (req, res) => {
  try {
    const { ticketId, message } = req.body;

    if (!ticketId || !message) {
      return res
        .status(400)
        .json({ error: "Ticket ID and message are required" });
    }

    const ticket = await Ticket.findOneAndUpdate(
      { ticketId },
      {
        $push: {
          messages: { message },
        },
      },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    /* Email user */
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter
        .sendMail({
          from: process.env.EMAIL_USER,
          to: ticket.email,
          subject: `Update on Ticket ${ticket.ticketId}`,
          text: `
Hello ${ticket.name},

There is a new update on your service request.

Ticket ID: ${ticket.ticketId}
Current Status: ${ticket.status}

Message:
${message}

Thank you,
Genuine Computers & Technologies
          `,
        })
        .catch((err) => console.error("Email send error:", err));
    }

    /* SMS */
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_PHONE
    ) {
      await smsClient.messages
        .create({
          body: `Genuine Computers Update:
Ticket ${ticket.ticketId}
Status: ${ticket.status}
Message: ${message}`,
          from: process.env.TWILIO_PHONE,
          to: `+91${ticket.phone}`,
        })
        .catch((err) => console.error("SMS send error:", err));
    }

    res.json({ message: "Message sent successfully", ticket });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------- Start Server ---------- */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});