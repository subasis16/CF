import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  // 🔐 Protect route
  useEffect(() => {
    if (loading) return;
  }, [loading, user, navigate]);

  const becomeInstructor = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/users/become-instructor",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to upgrade role");
      }

      // 🔁 Refresh user in AuthContext
      await login(token);

      alert("You are now an Instructor!");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6ef] text-gray-700">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-6 py-20 text-[#111]">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">
            Welcome, {user.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account and role
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6">

          {/* ROLE ACTION */}
          {user.role === "student" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-[#1f7a1f]">
                  Become an Instructor
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Start creating and managing your own courses
                </p>
              </div>

              <button
                onClick={becomeInstructor}
                className="inline-flex items-center justify-center rounded-md bg-[#facc15] px-6 py-3 text-sm font-semibold text-black hover:bg-[#fbbf24] transition"
              >
                Upgrade Role
              </button>
            </div>
          )}

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <span className="inline-block mt-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-[#1f7a1f] capitalize">
                {user.role}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="text-lg">
                {new Date(user.createdAt).toDateString()}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Profile;
