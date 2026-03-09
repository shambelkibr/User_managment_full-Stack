import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const EditUser = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axiosInstance.get(`/api/users/${user_id}`);
        const user = response.data;

        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          age: user.age ?? "",
          email: user.email || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch user details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user_id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await axiosInstance.put(`/api/users/${user_id}`, {
        ...formData,
        age: Number(formData.age),
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-10">
        <p className="rounded-lg bg-white p-4 text-slate-600">
          Loading user...
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-10">
      <div className="fade-in-up grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_18px_50px_-26px_rgba(15,23,42,0.35)] lg:grid-cols-[1.1fr_1fr]">
        <div className="bg-gradient-to-br from-sky-700 to-indigo-700 p-7 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-sky-100">User Update</p>
          <h2 className="mt-2 text-3xl font-bold">Edit User #{user_id}</h2>
          <p className="mt-3 text-sm text-sky-50/90">
            Update profile information and keep your team records accurate.
          </p>
        </div>

        <div className="p-6">
          <h3 className="mb-6 text-xl font-bold text-slate-900">Profile Details</h3>

          {error && (
            <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-700">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-sky-500 focus:ring"
                required
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-sky-500 focus:ring"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-sky-500 focus:ring"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-sky-500 focus:ring"
                required
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-sky-700 px-4 py-2.5 font-semibold text-white hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Updating..." : "Update User"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
