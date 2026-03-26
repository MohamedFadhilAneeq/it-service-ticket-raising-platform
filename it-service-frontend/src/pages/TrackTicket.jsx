import { useState } from "react";
import { 
  Search, Ticket as TicketIcon, Monitor, 
  AlertCircle, MessageSquare, Loader2, 
  CheckCircle2, Clock, Info
} from "lucide-react";

function TrackTicket() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleTrack() {
    setError("");
    setTicket(null);

    if (!ticketId.trim()) {
      setError("Please enter a valid Ticket ID.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/track-ticket/${ticketId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ticket not found. Please check the ID and try again.");
      }

      setTicket(data);
    } catch (err) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setIsLoading(false);
    }
  }

  // Helper function to style the status badge
  const getStatusStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s.includes("resolved") || s.includes("closed") || s.includes("completed")) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    if (s.includes("progress") || s.includes("working") || s.includes("diagnosing")) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
    // Default / Open / Pending
    return "bg-blue-100 text-blue-800 border-blue-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Search Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transform rotate-3">
            <Search size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 mb-4">
            Track Your Service Ticket
          </h1>
          <p className="text-gray-600 text-lg">
            Enter your tracking ID below to check the real-time status and updates from our technicians.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8 mb-8 border border-gray-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleTrack(); }}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <TicketIcon size={20} />
              </div>
              <input
                type="text"
                placeholder="e.g., TCK123456"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                disabled={isLoading}
                className="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition uppercase"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`md:w-48 py-4 rounded-xl font-bold text-white transition flex items-center justify-center gap-2 shadow-md ${
                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-900 hover:bg-blue-800 hover:-translate-y-0.5"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Checking...
                </>
              ) : (
                "Check Status"
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 bg-red-50 text-red-800 p-4 rounded-lg flex items-start gap-3 border border-red-200 animation-fade-in">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5 text-red-500" />
              <p className="font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Ticket Results Dashboard */}
        {ticket && (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animation-fade-in">
            
            {/* Dashboard Header */}
            <div className="bg-blue-950 px-6 py-6 md:px-8 md:py-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-1">Ticket ID</p>
                <h2 className="text-2xl font-bold font-mono tracking-widest">{ticket.ticket_id}</h2>
              </div>
              <div className={`px-4 py-2 rounded-full border font-bold text-sm uppercase tracking-wide inline-flex items-center gap-2 self-start md:self-auto ${getStatusStyle(ticket.status)}`}>
                {ticket.status?.toLowerCase().includes('resolved') ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                {ticket.status || "Pending"}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              
              {/* Device Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Monitor size={16} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Device Brand</span>
                  </div>
                  <p className="text-lg font-medium text-gray-900">{ticket.brand}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Info size={16} />
                    <span className="text-sm font-semibold uppercase tracking-wider">Reported Issue</span>
                  </div>
                  <p className="text-gray-900">{ticket.issue}</p>
                </div>
              </div>

              {/* Service Center Updates (Timeline) */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b pb-4">
                  <MessageSquare className="text-blue-600" size={24} />
                  Service Center Updates
                </h3>

                {ticket.messages && ticket.messages.length > 0 ? (
                  <div className="relative pl-4 md:pl-0">
                    {/* Vertical Timeline Line */}
                    <div className="absolute left-4 md:left-[39px] top-4 bottom-0 w-0.5 bg-gray-200"></div>

                    <div className="space-y-8">
                      {ticket.messages.map((m, index) => (
                        <div key={index} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                          
                          {/* Timeline Dot & Date (Desktop) */}
                          <div className="hidden md:flex flex-col items-end w-24 pt-1 flex-shrink-0 relative z-10">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                              {new Date(m.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(m.timestamp).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          {/* Timeline Dot (Mobile) */}
                          <div className="absolute -left-6 top-1.5 md:relative md:left-0 md:top-2 w-3 h-3 bg-blue-600 rounded-full ring-4 ring-white z-10 flex-shrink-0"></div>

                          {/* Message Bubble */}
                          <div className="bg-white border border-gray-100 shadow-sm p-4 md:p-5 rounded-2xl rounded-tl-none flex-grow relative z-10 hover:shadow-md transition-shadow">
                            
                            {/* Date (Mobile only) */}
                            <p className="md:hidden text-xs font-semibold text-gray-400 mb-2">
                              {new Date(m.timestamp).toLocaleString()}
                            </p>
                            
                            <p className="text-gray-700 leading-relaxed">
                              {m.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <Clock className="mx-auto text-gray-400 mb-3" size={32} />
                    <p className="text-gray-600 font-medium">Your ticket is in the queue.</p>
                    <p className="text-sm text-gray-500 mt-1">Updates from the technician will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackTicket;
