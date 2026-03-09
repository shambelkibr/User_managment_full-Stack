import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import UserTable from "../components/UserTable";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.get("/api/users");
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmed) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user.user_id !== userId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const query = searchText.toLowerCase().trim();
    return (
      fullName.includes(query) ||
      user.email.toLowerCase().includes(query) ||
      String(user.user_id).includes(query)
    );
  });

  const totalUsers = users.length;
  const averageAge =
    users.length > 0
      ? Math.round(users.reduce((sum, user) => sum + Number(user.age || 0), 0) / users.length)
      : 0;
  const uniqueDomains = new Set(
    users.map((user) => user.email.split("@")[1]).filter(Boolean)
  ).size;

  return (
    <section className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10">
      <div className="fade-in-up mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-teal-700">Overview</p>
          <h2 className="text-3xl font-bold text-slate-900">Team Dashboard</h2>
          <p className="text-sm text-slate-500">Monitor and manage user records in one place.</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchUsers}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Refresh Data
          </button>
          {/* <button
            type="button"
            onClick={() => navigate("/add-user")}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            New User
          </button> */}
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="fade-in-up rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total Users</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{totalUsers}</p>
        </article>
        <article className="fade-in-up rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm [animation-delay:120ms]">
          <p className="text-xs uppercase tracking-wide text-slate-500">Average Age</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{averageAge}</p>
        </article>
        <article className="fade-in-up rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-sm [animation-delay:240ms] sm:col-span-2 lg:col-span-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">Email Domains</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{uniqueDomains}</p>
        </article>
      </div>

      <div className="mb-5 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm">
        <label htmlFor="search-users" className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">
          Search users
        </label>
        <input
          id="search-users"
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search by name, email, or id"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none ring-teal-500 focus:ring"
        />
      </div>

      {loading && (
        <p className="rounded-lg bg-white p-4 text-slate-600">
          Loading users...
        </p>
      )}

      {error && (
        <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-700">
          {error}
        </p>
      )}

      {!loading && !error && (
        <UserTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
};

export default Home;
