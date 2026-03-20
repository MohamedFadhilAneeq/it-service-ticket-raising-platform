import { useState } from "react";

function TrackTicket() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleTrack() {
    setError("");
    setTicket(null);

    if (!ticketId) {
      setError("Please enter a Ticket ID");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${apiUrl}/api/track-ticket/${ticketId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ticket not found");
      }

      setTicket(data);
    } catch (err) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Track Your Ticket
          </h1>

          <form onSubmit={(e) => { e.preventDefault(); handleTrack(); }}>
            <input
              type="text"
              placeholder="Enter Ticket ID (e.g., TCK123456)"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              disabled={isLoading}
              className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded font-semibold text-white transition ${
                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800"
              }`}
            >
              {isLoading ? "Checking Status..." : "Check Status"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}

          {ticket && (
  <div className="mt-6 bg-gray-100 p-4 rounded space-y-3">
    <p>
      <strong>Ticket ID:</strong> {ticket.ticket_id}
    </p>

    <p>
      <strong>Brand:</strong> {ticket.brand}
    </p>

    <p>
      <strong>Issue:</strong> {ticket.issue}
    </p>

    <p>
      <strong>Status:</strong>{" "}
      <span className="font-semibold text-blue-900">
        {ticket.status}
      </span>
    </p>

    {/* MESSAGE HISTORY */}
    {ticket.messages && ticket.messages.length > 0 && (
      <div className="mt-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Updates from Service Center
        </h3>

        <ul className="space-y-3">
          {ticket.messages.map((m, index) => (
            <li
              key={index}
              className="bg-white p-3 rounded border-l-4 border-blue-900"
            >
              <p className="text-sm text-gray-700">
                {m.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(m.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}


        </div>
      </div>
    </section>
  );
}

export default TrackTicket;
