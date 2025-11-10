import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "BUYER",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", form);

      setAuth(data);
      localStorage.setItem("rebax_auth", JSON.stringify(data));

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Email already exists or invalid input");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-neutral-900 dark:to-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 dark:bg-neutral-800 backdrop-blur-xl shadow-xl rounded-2xl p-10 w-full max-w-lg border border-indigo-100 dark:border-neutral-700"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-400 mb-3">
          Create Your Account ✨
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Join RebaX to explore premium properties
        </p>

        <form onSubmit={submit} className="grid gap-4">

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              className="input input-bordered w-full pl-10 dark:bg-neutral-700"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              className="input input-bordered w-full pl-10 dark:bg-neutral-700"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              className="input input-bordered w-full pl-10 dark:bg-neutral-700"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <select
            className="select select-bordered w-full dark:bg-neutral-700"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="BUYER">Buyer</option>
            <option value="BROKER">Broker</option>
          </select>

          <button
            disabled={loading}
            className="btn btn-primary w-full text-lg font-semibold bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
