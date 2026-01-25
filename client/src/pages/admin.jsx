import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  /* ================= USERS ================= */
  useEffect(() => {
    fetch("http://localhost:5000/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => (res.ok ? res.json() : []))
      .then(data => {
        if (Array.isArray(data)) setUsers(data);
        else setUsers([]);
      })
      .catch(() => setUsers([]));
  }, []);

  const changeRole = async (id, role) => {
    await fetch(`http://localhost:5000/admin/users/${id}/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, role } : u))
    );
  };

  /* ================= COURSES ================= */
  useEffect(() => {
    fetch("http://localhost:5000/admin/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => (res.ok ? res.json() : []))
      .then(data => {
        if (Array.isArray(data)) setCourses(data);
        else setCourses([]);
      })
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;

    await fetch(`http://localhost:5000/admin/courses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const toggleVisibility = async (id) => {
    await fetch(`http://localhost:5000/courses/${id}/visibility`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCourses(prev =>
      prev.map(c =>
        c.id === id ? { ...c, hidden: !c.hidden } : c
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 bg-[#f7f6ef]">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-6 py-20 text-[#111]">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ================= USERS ================= */}
        <div>
          <h1 className="text-3xl font-bold mb-6">
            User Management
          </h1>

          {users.length === 0 ? (
            <p className="text-gray-600">No users found</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-[#f1f5f1] border-b border-gray-200">
                  <tr className="text-left">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr
                      key={u.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4">{u.name}</td>
                      <td className="p-4 text-gray-700">{u.email}</td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          onChange={(e) =>
                            changeRole(u.id, e.target.value)
                          }
                          className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#1f7a1f]"
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= COURSES ================= */}
        <div>
          <h1 className="text-3xl font-bold mb-6">
            Course Management
          </h1>

          {courses.length === 0 ? (
            <p className="text-gray-600">No courses found</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-[#f1f5f1] border-b border-gray-200">
                  <tr className="text-left">
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Instructor</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(c => (
                    <tr
                      key={c.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="p-4">{c.title}</td>

                      <td className="p-4">
                        {c.price === 0 ? (
                          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#1f7a1f]">
                            Free
                          </span>
                        ) : (
                          `₹${c.price}`
                        )}
                      </td>

                      <td className="p-4 text-gray-700">
                        {c.instructor?.name || "—"}
                      </td>

                      <td className="p-4">
                        {c.hidden ? (
                          <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                            Hidden
                          </span>
                        ) : (
                          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-[#1f7a1f]">
                            Visible
                          </span>
                        )}
                      </td>

                      <td className="p-4 space-x-4">
                        <button
                          onClick={() => toggleVisibility(c.id)}
                          className="text-sm font-semibold text-[#1f7a1f] hover:underline"
                        >
                          {c.hidden ? "Unhide" : "Hide"}
                        </button>

                        <button
                          onClick={() => deleteCourse(c.id)}
                          className="text-sm font-semibold text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

