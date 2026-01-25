import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#f3f1e7]/90 backdrop-blur border-b border-black/10">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-[#1f7a1f]"
        >
          CodeForge
        </Link>

        {user && (
          <div className="hidden md:flex gap-8 text-sm font-semibold text-[#1f2937]">
            <Link to="/courses">Courses</Link>
            <Link to="/pricing">Plans & Pricing</Link>
            <Link to="/notes">Notes</Link>

            {user?.role === "student" && (
  <Link to="/dashboard">Dashboard</Link>
)}

            {["instructor", "admin"].includes(user.role) && (
              <Link to="/instructor">Instructor Dashboard</Link>
            )}
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
          </div>
        )}

        {!user ? (
          <div className="flex gap-6 font-semibold">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-[#1f7a1f] text-white font-bold"
            >
              {user.name?.[0]}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-52 rounded-xl bg-white shadow-lg border border-black/5">
                <Link to="/profile" className="block px-4 py-3 hover:bg-black/5">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
