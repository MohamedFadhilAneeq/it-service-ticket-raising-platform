require("dotenv").config();
const mongoose = require("mongoose");

const { trainClassifier, classifyIssue } = require("../ai/ticketClassifier");

// --- Ticket schema (same as server.js) ---
const ticketSchema = new mongoose.Schema({
  ticketId: String,
  name: String,
  email: String,
  phone: String,
  brand: String,
  issue: String,
  status: String,
  priority: String,
  category: String,
  confidence: Number,
  messages: Array,
  createdAt: Date
});

const Ticket = mongoose.model("Ticket", ticketSchema);

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // train the classifier first
    await trainClassifier();
    console.log("AI model trained");

    const tickets = await Ticket.find();

    console.log(`Found ${tickets.length} tickets`);

    for (const ticket of tickets) {
      const result = classifyIssue(ticket.issue);

      await Ticket.updateOne(
        { _id: ticket._id },
        {
          category: result.category,
          priority: result.priority,
          confidence: result.confidence
        }
      );

      console.log(
        `Updated ${ticket.ticketId} → ${result.category} (${result.confidence}%)`
      );
    }

    console.log("All tickets updated ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();