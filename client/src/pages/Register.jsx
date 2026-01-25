import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      login(data.token);
      navigate("/", { replace: true });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#f7f6ef] px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-black/5 p-8">

        <h1 className="text-2xl font-bold text-[#111] mb-1 text-center">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Start learning on Learning Hub
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1f7a1f] focus:ring-1 focus:ring-[#1f7a1f] outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1f7a1f] focus:ring-1 focus:ring-[#1f7a1f] outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1f7a1f] focus:ring-1 focus:ring-[#1f7a1f] outline-none pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#facc15] hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          {/* SOCIAL LOGIN */}
<div className="mt-6 space-y-3">
  <button
    onClick={() => window.location.href = "http://localhost:5000/auth/google"}
    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-semibold hover:bg-gray-50 transition"
  >
    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
    Continue with Google
  </button>

  <button
    onClick={() => window.location.href = "http://localhost:5000/auth/github"}
    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 text-sm font-semibold hover:bg-gray-50 transition"
  >
    <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5" />
    Continue with GitHub
  </button>
</div>

        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-[#1f7a1f] font-semibold hover:underline">
            Login
          </a>
        </div>

      </div>
    </section>
  );
}
