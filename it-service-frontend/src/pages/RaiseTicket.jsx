import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, Mail, Phone, Monitor, FileText, 
  CheckCircle2, AlertCircle, Loader2, 
  ShieldCheck, Clock, Wrench, ArrowRight 
} from "lucide-react";

function RaiseTicket() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brand: "",
    issue: "",
  });

  const [errors, setErrors] = useState({});
  const [ticketId, setTicketId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const brands = ["Dell", "HP", "Lenovo", "Acer", "Asus", "Canon", "Others"];

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = "Name should contain only letters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.brand) {
      newErrors.brand = "Please select a brand";
    }

    if (!formData.issue) {
      newErrors.issue = "Problem description is required";
    }

    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setSubmitError(null);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/raise-ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit ticket");
      }

      setTicketId(data.ticket_id);

      // Clear form on success
      setFormData({
        name: "",
        email: "",
        phone: "",
        brand: "",
        issue: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setSubmitError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Helper to reset the form and submit another ticket
  const resetForm = () => setTicketId(null);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* LEFT COLUMN: Info & Trust Elements */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">
                Let's get your device fixed.
              </h1>
              <p className="text-gray-600 leading-relaxed text-lg">
                Fill out the service request form, and our certified technicians will start diagnosing your issue immediately.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Fast Response</h3>
                  <p className="text-gray-600 text-sm">Most tickets are reviewed and quoted within 2 hours of submission.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 flex-shrink-0">
                  <Wrench size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Expert Technicians</h3>
                  <p className="text-gray-600 text-sm">Your hardware is handled only by highly trained and certified professionals.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Data Security</h3>
                  <p className="text-gray-600 text-sm">We ensure strict privacy protocols so your personal data remains untouched.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: The Form */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
              
              {/* Conditional Rendering: Success State vs Form */}
              {ticketId ? (
                <div className="text-center py-10 animation-fade-in">
                  <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={50} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
                  <p className="text-gray-600 mb-6 text-lg">
                    We've successfully received your details.
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8 inline-block">
                    <p className="text-sm text-gray-500 mb-1">Your Tracking ID</p>
                    <p className="text-3xl font-mono font-bold text-blue-900 tracking-wider">{ticketId}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/track-ticket" className="bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition shadow-md">
                      Track Status
                    </Link>
                    <button onClick={resetForm} className="bg-gray-100 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition">
                      Submit Another
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    Service Details
                  </h2>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    
                    <div className="grid md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Name *</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <User size={18} />
                          </div>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 transition ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-600'}`}
                            disabled={isLoading}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
                        <div className="relative flex">
                          <span className="flex items-center px-4 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 font-medium">
                            +91
                          </span>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 10) setFormData({ ...formData, phone: value });
                            }}
                            placeholder="Mobile Number"
                            className={`w-full border rounded-r-lg px-4 py-2.5 focus:outline-none focus:ring-2 transition ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-600'}`}
                            disabled={isLoading}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Mail size={18} />
                        </div>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 transition ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-600'}`}
                          disabled={isLoading}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                    </div>

                    {/* Brand */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Device Brand *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Monitor size={18} />
                        </div>
                        <select
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                          className={`w-full border rounded-lg pl-10 pr-4 py-2.5 appearance-none focus:outline-none focus:ring-2 transition bg-white ${errors.brand ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-600'}`}
                          disabled={isLoading}
                        >
                          <option value="">-- Select Brand --</option>
                          {brands.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                      {errors.brand && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.brand}</p>}
                    </div>

                    {/* Issue */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Problem Description *</label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none text-gray-400">
                          <FileText size={18} />
                        </div>
                        <textarea
                          name="issue"
                          rows="4"
                          value={formData.issue}
                          onChange={handleChange}
                          className={`w-full border rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 transition resize-none ${errors.issue ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-600'}`}
                          disabled={isLoading}
                          placeholder="Please describe the issue in detail (e.g., Screen flickering, not booting up...)"
                        />
                      </div>
                      {errors.issue && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={12} />{errors.issue}</p>}
                    </div>

                    {/* API Error Box */}
                    {submitError && (
                      <div className="bg-red-50 text-red-800 p-4 rounded-lg flex items-start gap-3 border border-red-200">
                        <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-red-500" />
                        <p className="text-sm font-medium">{submitError}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3.5 rounded-lg font-bold text-white transition flex items-center justify-center gap-2 shadow-lg ${
                        isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800 hover:-translate-y-0.5"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Processing Request...
                        </>
                      ) : (
                        <>
                          Submit Service Ticket
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RaiseTicket;
