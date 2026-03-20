import { useState } from "react";

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

  const brands = ["Dell", "HP", "Lenovo", "Acer", "Asus", "Canon","Others"];

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


  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Raise a Service Request
          </h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Name */}
            <div>
              <label className="block font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1">
                Phone <span className="text-red-500">*</span>
              </label>

              <div className="flex">
                <span className="flex items-center px-4 bg-gray-100 border border-r-0 rounded-l">
                  +91
                </span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setFormData({ ...formData, phone: value });
                    }
                  }}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full border rounded-r px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  disabled={isLoading}
                />
              </div>

              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Brand */}
            <div>
              <label className="block font-medium mb-1">
                Brand <span className="text-red-500">*</span>
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={isLoading}
              >
                <option value="">-- Select Brand --</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.brand && (
                <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
              )}
            </div>

            {/* Issue */}
            <div>
              <label className="block font-medium mb-1">
                Problem Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="issue"
                rows="4"
                value={formData.issue}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                disabled={isLoading}
              />
              {errors.issue && (
                <p className="text-red-500 text-sm mt-1">{errors.issue}</p>
              )}
            </div>

            {submitError && (
              <div className="bg-red-100 text-red-800 p-3 rounded">
                {submitError}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded font-semibold text-white transition ${
                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>

          {ticketId && (
            <div className="mt-6 bg-green-100 text-green-800 p-4 rounded text-center">
              <strong>Ticket Submitted Successfully!</strong>
              <p className="mt-1">
                Your Ticket ID: <strong>{ticketId}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default RaiseTicket;
