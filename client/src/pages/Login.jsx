import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      await login(data.token);
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
          Sign in to Learning Hub
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Continue your coding journey
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1f7a1f] focus:ring-1 focus:ring-[#1f7a1f] outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#1f7a1f] focus:ring-1 focus:ring-[#1f7a1f] outline-none pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#facc15] hover:bg-yellow-300 text-black font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Sign In"}
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
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#1f7a1f] font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </div>

      </div>
    </section>
  );
}

export default Login;
