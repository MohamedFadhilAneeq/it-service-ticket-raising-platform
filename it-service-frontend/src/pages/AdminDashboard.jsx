import { useEffect, useState } from "react";
import { 
  Lock, LogOut, RefreshCcw, Search, 
  Ticket, AlertCircle, Clock, CheckCircle2, 
  Send, MessageSquare, User, ShieldAlert 
} from "lucide-react";

function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessages, setNewMessages] = useState({});
  const [adminKey, setAdminKey] = useState(sessionStorage.getItem("adminKey") || "");
  const [authError, setAuthError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest"); // <-- New Sort State

  const [lastRefresh, setLastRefresh] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* ---------- Analytics ---------- */
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === "Open").length;
  const highPriorityTickets = tickets.filter(
    t => t.priority === "High" || t.priority === "Critical"
  ).length;

  const todayTickets = tickets.filter(t => {
    if (!t.createdAt) return false;
    const today = new Date().toDateString();
    return new Date(t.createdAt).toDateString() === today;
  }).length;

  /* ---------- Filtering & Sorting ---------- */
  const processedTickets = tickets
    .filter((t) => {
      const matchesSearch =
        (t.ticketId || "").toLowerCase().includes(search.toLowerCase()) ||
        (t.name || "").toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === "All" || t.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      // Safe date fallback (uses 0 if date is missing/invalid)
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

      if (sortBy === "Newest") return dateB - dateA;
      if (sortBy === "Oldest") return dateA - dateB;
      if (sortBy === "Priority") {
        const priorityWeight = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        const pA = priorityWeight[a.priority] || 1; // Default to Low
        const pB = priorityWeight[b.priority] || 1;
        return pB - pA;
      }
      return 0;
    });

  /* ---------- Badges ---------- */
  function priorityBadge(priority) {
    const colors = {
      Low: "bg-gray-100 text-gray-700 border-gray-200",
      Medium: "bg-blue-100 text-blue-700 border-blue-200",
      High: "bg-orange-100 text-orange-700 border-orange-200",
      Critical: "bg-red-100 text-red-700 border-red-200 font-bold"
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs border ${colors[priority] || colors.Low}`}>
        {priority || "Low"}
      </span>
    );
  }

  function statusBadge(status) {
    const colors = {
      Open: "bg-blue-100 text-blue-700 border-blue-200",
      "In Progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
      Closed: "bg-green-100 text-green-700 border-green-200"
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap border flex items-center gap-1.5 w-fit ${colors[status] || colors.Open}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'Closed' ? 'bg-green-500' : status === 'In Progress' ? 'bg-yellow-500' : 'bg-blue-500'}`}></span>
        {status || "Open"}
      </span>
    );
  }

  /* ---------- Fetch Tickets ---------- */
  async function fetchTickets(key = adminKey, manual = false) {
    if (manual) setIsRefreshing(true);
    try {
      if (!manual) setLoading(true);

      const res = await fetch(`${apiUrl}/api/admin/tickets`, {
        headers: { "x-admin-key": key },
      });

      if (!res.ok) {
        if (res.status === 403) {
          setAuthError("Unauthorized access. Invalid admin key.");
          sessionStorage.removeItem("adminKey");
          setAdminKey("");
        } else {
          setAuthError("Failed to fetch tickets.");
        }
        setTickets([]);
        return;
      }

      const data = await res.json();
      
      // We don't need to sort here anymore, our processedTickets logic handles it!
      setTickets(data);
      setLastRefresh(new Date());
      setAuthError("");
    } catch (err) {
      console.error(err);
      setAuthError("Error connecting to server.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  /* ---------- Update Status ---------- */
  async function updateStatus(ticketId, status) {
    const res = await fetch(`${apiUrl}/api/admin/update-status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ ticketId, status }),
    });

    if (res.ok) fetchTickets(adminKey, true);
  }

  /* ---------- Send Message ---------- */
  async function sendMessage(ticketId) {
    const message = newMessages[ticketId];
    if (!message || !message.trim()) return;

    const res = await fetch(`${apiUrl}/api/admin/add-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({ ticketId, message }),
    });

    if (res.ok) {
      setNewMessages(prev => ({ ...prev, [ticketId]: "" }));
      fetchTickets(adminKey, true);
    }
  }

  /* ---------- Auto Refresh ---------- */
  useEffect(() => {
    if (!adminKey) {
      setLoading(false);
      return;
    }
    fetchTickets(adminKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminKey]);

  /* ---------- Auth Handlers ---------- */
  function handleLogin(e) {
    e.preventDefault();
    const key = e.target.adminKeyInput.value;
    sessionStorage.setItem("adminKey", key);
    setAdminKey(key);
    fetchTickets(key);
  }

  function handleLogout() {
    sessionStorage.removeItem("adminKey");
    setAdminKey("");
    setTickets([]);
  }

  /* =========================================
     RENDER: LOGIN SCREEN
     ========================================= */
  if (!adminKey) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Admin Portal</h2>
          <p className="text-center text-gray-500 mb-8">Enter your secure key to access the dashboard</p>

          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 border border-red-100">
              <ShieldAlert size={16} /> {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Access Key</label>
              <input
                type="password"
                name="adminKeyInput"
                placeholder="••••••••••••"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
              />
            </div>
            <button className="w-full bg-blue-950 text-white font-bold py-3 rounded-lg hover:bg-blue-900 hover:-translate-y-0.5 transition-all shadow-md">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* =========================================
     RENDER: LOADING
     ========================================= */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <RefreshCcw size={40} className="text-blue-900 animate-spin mb-4" />
        <p className="text-gray-500 font-medium text-lg">Loading secure dashboard...</p>
      </div>
    );
  }

  /* =========================================
     RENDER: DASHBOARD
     ========================================= */
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-blue-950 flex items-center gap-2">
              <ShieldAlert className="text-yellow-500" /> Control Center
            </h1>
            {lastRefresh && (
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <Clock size={12} /> Last synced: {lastRefresh.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchTickets(adminKey, true)}
              disabled={isRefreshing}
              className={`flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RefreshCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
              {isRefreshing ? "Syncing..." : "Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition border border-red-100"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 pt-8">

        {/* ANALYTICS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Ticket size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Tickets</p>
              <p className="text-3xl font-bold text-gray-900">{totalTickets}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Open & Pending</p>
              <p className="text-3xl font-bold text-gray-900">{openTickets}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">High Priority</p>
              <p className="text-3xl font-bold text-red-600">{highPriorityTickets}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">New Today</p>
              <p className="text-3xl font-bold text-green-600">{todayTickets}</p>
            </div>
          </div>
        </div>

        {/* FILTERS & SORTING */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by ID or Customer Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-blue-900"
            >
              <option value="Newest">Sort: Newest First</option>
              <option value="Oldest">Sort: Oldest First</option>
              <option value="Priority">Sort: Highest Priority</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold">Ticket Details</th>
                  <th className="p-4 font-semibold">Contact Info</th>
                  <th className="p-4 font-semibold w-64">Reported Issue</th>
                  <th className="p-4 font-semibold">Status & Priority</th>
                  <th className="p-4 font-semibold w-72">Message Log</th>
                  <th className="p-4 font-semibold w-64">Admin Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {processedTickets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search size={40} className="text-gray-300 mb-3" />
                        <p className="text-lg font-medium">No tickets found</p>
                        <p className="text-sm">Try adjusting your filters or search term.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  processedTickets.map(t => (
                    <tr key={t._id} className="hover:bg-gray-50/50 transition-colors align-top">
                      
                      {/* TICKET DETAILS */}
                      <td className="p-4">
                        <div className="font-mono font-bold text-blue-900 mb-1">{t.ticketId}</div>
                        {/* THE TIME DISPLAY IS BACK */}
                        <div className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                          <Clock size={12} className="flex-shrink-0" /> 
                          {t.createdAt ? new Date(t.createdAt).toLocaleString() : "N/A"}
                        </div>
                        <div className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded">
                          {t.category || "General"}
                        </div>
                      </td>

                      {/* CONTACT INFO */}
                      <td className="p-4">
                        <div className="font-semibold text-gray-900 flex items-center gap-1.5 mb-1">
                          <User size={14} className="text-gray-400" /> {t.name}
                        </div>
                        <div className="text-gray-600 mb-1">{t.email}</div>
                        <div className="text-gray-500 text-xs">{t.phone}</div>
                        <div className="mt-2 text-xs font-medium text-blue-800 bg-blue-50 w-fit px-2 py-0.5 rounded border border-blue-100">
                          {t.brand}
                        </div>
                      </td>

                      {/* REPORTED ISSUE */}
                      <td className="p-4">
                        <p className="text-gray-700 whitespace-pre-wrap break-words line-clamp-4" title={t.issue}>
                          {t.issue}
                        </p>
                      </td>

                      {/* STATUS & PRIORITY */}
                      <td className="p-4 space-y-3">
                        <div>{statusBadge(t.status)}</div>
                        <div>{priorityBadge(t.priority)}</div>
                      </td>

                      {/* MESSAGE LOG */}
                      <td className="p-4">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 h-32 overflow-y-auto p-3 custom-scrollbar">
                          {t.messages?.length > 0 ? (
                            <ul className="space-y-3">
                              {[...(t.messages || [])]
                                .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // Chronological order
                                .map((m, i) => (
                                  <li key={i} className="bg-white p-2.5 rounded shadow-sm border border-gray-100 border-l-2 border-l-blue-600 text-xs">
                                    <p className="text-gray-800 mb-1">{m.message}</p>
                                    <p className="text-gray-400 text-[10px]">
                                      {m.timestamp ? new Date(m.timestamp).toLocaleString() : "No time"}
                                    </p>
                                  </li>
                                ))}
                            </ul>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-xs">
                              <MessageSquare size={20} className="mb-1 opacity-50" />
                              No updates sent
                            </div>
                          )}
                        </div>
                      </td>

                      {/* ADMIN ACTIONS */}
                      <td className="p-4 bg-gray-50/30 border-l border-gray-100">
                        <div className="flex flex-col gap-3">
                          
                          <select
                            value={t.status}
                            onChange={(e) => updateStatus(t.ticketId, e.target.value)}
                            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          >
                            <option value="Open">Status: Open</option>
                            <option value="In Progress">Status: In Progress</option>
                            <option value="Closed">Status: Closed</option>
                          </select>

                          <div className="relative">
                            <textarea
                              value={newMessages[t.ticketId] || ""}
                              onChange={(e) =>
                                setNewMessages({
                                  ...newMessages,
                                  [t.ticketId]: e.target.value,
                                })
                              }
                              placeholder="Type reply to customer..."
                              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={2}
                            />
                            <button
                              onClick={() => sendMessage(t.ticketId)}
                              disabled={!newMessages[t.ticketId]?.trim()}
                              className="absolute bottom-2 right-2 bg-blue-600 text-white p-1.5 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Send Message"
                            >
                              <Send size={14} />
                            </button>
                          </div>
                          
                        </div>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
