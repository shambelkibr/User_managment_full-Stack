import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import UserTable from "../components/UserTable";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">All Users</h2>
        <button
          type="button"
          onClick={fetchUsers}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Refresh
        </button>
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
        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </section>
  );
};

export default Home;
