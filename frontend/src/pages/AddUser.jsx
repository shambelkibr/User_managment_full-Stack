import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const initialForm = {
  first_name: "",
  last_name: "",
  age: "",
  email: "",
};

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await axiosInstance.post("/api/users", {
        ...formData,
        age: Number(formData.age),
      });

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-7 sm:px-6 sm:py-10">
      <div className="fade-in-up grid overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_18px_50px_-26px_rgba(15,23,42,0.35)] lg:grid-cols-[1.1fr_1fr]">
        <div className="bg-gradient-to-br from-teal-700 to-cyan-700 p-7 text-white">
          <p className="text-xs uppercase tracking-[0.22em] text-teal-100">User Creation</p>
          <h2 className="mt-2 text-3xl font-bold">Add New Team Member</h2>
          <p className="mt-3 text-sm text-teal-50/90">
            Fill in profile details to create a new user record in the system.
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
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-teal-500 focus:ring"
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-teal-500 focus:ring"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-teal-500 focus:ring"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none ring-teal-500 focus:ring"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-teal-700 px-4 py-2.5 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Saving..." : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddUser;
