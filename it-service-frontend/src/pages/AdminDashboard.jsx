import { useEffect, useState } from "react";

function AdminDashboard() {

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessages, setNewMessages] = useState({});
  const [adminKey, setAdminKey] = useState(sessionStorage.getItem("adminKey") || "");
  const [authError, setAuthError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [lastRefresh, setLastRefresh] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  /* ---------- Analytics ---------- */

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(t => t.status === "Open").length;

  const highPriorityTickets = tickets.filter(
    t => t.priority === "High" || t.priority === "Critical"
  ).length;

  const todayTickets = tickets.filter(t => {
    const today = new Date().toDateString();
    return new Date(t.createdAt).toDateString() === today;
  }).length;

  /* ---------- Filtering ---------- */

  const filteredTickets = tickets.filter((t) => {

    const matchesSearch =
      t.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || t.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" || t.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;

  });

  /* ---------- Badges ---------- */

  function priorityBadge(priority) {

    const colors = {
      Low: "bg-green-100 text-green-700",
      Medium: "bg-yellow-100 text-yellow-700",
      High: "bg-red-100 text-red-700",
      Critical: "bg-red-200 text-red-900"
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${colors[priority]}`}>
        {priority}
      </span>
    );
  }

  function statusBadge(status) {

    const colors = {
      Open: "bg-blue-100 text-blue-700",
      "In Progress": "bg-yellow-100 text-yellow-700",
      Closed: "bg-green-100 text-green-700"
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${colors[status]}`}>
        {status}
      </span>
    );
  }

  /* ---------- Fetch Tickets ---------- */

  async function fetchTickets(key = adminKey) {

    try {

      setLoading(true);

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

      /* Show newest tickets first */
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setTickets(sorted);

      setLastRefresh(new Date());

      setAuthError("");

    } catch (err) {

      console.error(err);
      setAuthError("Error connecting to server.");

    } finally {

      setLoading(false);

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

    if (res.ok) fetchTickets();

  }

  /* ---------- Send Message ---------- */

  async function sendMessage(ticketId) {

    const message = newMessages[ticketId];

    if (!message) return;

    const res = await fetch(`${apiUrl}/api/admin/add-message`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },

      body: JSON.stringify({ ticketId, message }),

    });

    if (res.ok) {

      setNewMessages(prev => ({
        ...prev,
        [ticketId]: ""
      }));

      fetchTickets();

    }

  }

  /* ---------- Auto Refresh ---------- */
useEffect(() => {

  if (!adminKey) {
    setLoading(false);
    return;
  }

  fetchTickets(adminKey);

}, [adminKey]);

  /* ---------- Login ---------- */

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

  /* ---------- Login Screen ---------- */

  if (!adminKey) {

    return (

      <section className="py-16 bg-gray-50 flex justify-center">

        <form onSubmit={handleLogin} className="bg-white shadow p-8 rounded w-80">

          <h2 className="text-xl font-bold mb-4">Admin Login</h2>

          <input
            type="password"
            name="adminKeyInput"
            placeholder="Enter Admin Key"
            className="w-full border p-2 rounded mb-4"
            required
          />

          <button className="w-full bg-blue-900 text-white py-2 rounded">
            Login
          </button>

        </form>

      </section>

    );

  }

  if (loading) return <div className="text-center py-16">Loading...</div>;

  /* ---------- Dashboard ---------- */

  return (

    <section className="py-16 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-2">

          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

        {/* Last Refresh */}

        {lastRefresh && (

          <p className="text-xs text-gray-500 mb-6">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </p>

        )}

        {/* Analytics */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Total Tickets</p>
            <p className="text-2xl font-bold">{totalTickets}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Open Tickets</p>
            <p className="text-2xl font-bold">{openTickets}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">High Priority</p>
            <p className="text-2xl font-bold text-red-600">{highPriorityTickets}</p>
          </div>

          <div className="bg-white shadow rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Tickets Today</p>
            <p className="text-2xl font-bold text-green-600">{todayTickets}</p>
          </div>

        </div>

        {/* Filters */}

        <div className="flex flex-wrap gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Ticket ID or Customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="All">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

        {/* Table */}

        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="w-full text-sm">

            <thead className="bg-blue-900 text-white">

              <tr>

                <th className="p-3 text-left">Ticket ID</th>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Contact</th>
                <th className="p-3 text-left">Issue</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Messages</th>
                <th className="p-3 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredTickets.length === 0 ? (

                <tr>
                  <td colSpan="9" className="p-6 text-center text-gray-500">
                    No tickets match the filter.
                  </td>
                </tr>

              ) : (

                filteredTickets.map(t => (

                  <tr key={t._id} className="border-t align-top">

                    <td className="p-3 font-medium">{t.ticketId}</td>

                    <td className="p-3">
                      <div>{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.brand}</div>
                    </td>

                    <td className="p-3">
                      <div>{t.email}</div>
                      <div className="text-gray-500 text-xs">{t.phone}</div>
                    </td>

                    <td className="p-3 max-w-xs">{t.issue}</td>

                    <td className="p-3">{t.category}</td>

                    <td className="p-3">{priorityBadge(t.priority)}</td>

                    <td className="p-3">{statusBadge(t.status)}</td>

                    <td className="p-3 w-64">

                      {t.messages?.length > 0 ? (

                        <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">

                          {t.messages.map((m, i) => (

                            <li key={i} className="bg-gray-100 p-2 rounded border-l-4 border-blue-900">

                              <p>{m.message}</p>

                              <p className="text-xs text-gray-500">
                                {new Date(m.timestamp).toLocaleString()}
                              </p>

                            </li>

                          ))}

                        </ul>

                      ) : (

                        <span className="text-gray-400">No updates yet</span>

                      )}

                    </td>

                    <td className="p-3 space-y-2">

                      <select
                        defaultValue={t.status}
                        onChange={(e) => updateStatus(t.ticketId, e.target.value)}
                        className="border rounded px-2 py-1 w-full"
                      >
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Closed</option>
                      </select>

                      <textarea
                        value={newMessages[t.ticketId] || ""}
                        onChange={(e) =>
                          setNewMessages({
                            ...newMessages,
                            [t.ticketId]: e.target.value,
                          })
                        }
                        placeholder="Type new update..."
                        className="border rounded px-2 py-1 w-full text-sm"
                        rows={2}
                      />

                      <button
                        onClick={() => sendMessage(t.ticketId)}
                        className="w-full bg-blue-900 text-white text-sm py-1 rounded hover:bg-blue-800"
                      >
                        Send Message
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </section>

  );

}

export default AdminDashboard;