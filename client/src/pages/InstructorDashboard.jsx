import { useEffect, useState } from "react";

function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchCourses = async () => {
    const res = await fetch("http://localhost:5000/courses/my", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    setCourses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const createCourse = async () => {
    if (!title || price === "" || !videoUrl) {
      alert("Title, price and video URL are required");
      return;
    }

    const res = await fetch("http://localhost:5000/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        videoUrl,
      }),
    });

    if (!res.ok) {
      alert("Course creation failed");
      return;
    }

    setTitle("");
    setPrice("");
    setVideoUrl("");
    fetchCourses();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6ef] text-gray-600">
        Loading dashboard…
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-6 py-20 text-[#111]">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your video courses
          </p>
        </div>

        {/* Create Course */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-6">
          <h2 className="text-xl font-semibold">Create New Course</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course title"
              className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1f7a1f] outline-none"
            />

            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price (0 = Free)"
              className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1f7a1f] outline-none"
            />

            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="YouTube video URL"
              className="md:col-span-2 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#1f7a1f] outline-none"
            />
          </div>

          <button
            onClick={createCourse}
            className="bg-[#facc15] hover:bg-[#fbbf24] text-black font-semibold px-6 py-3 rounded-md transition"
          >
            Create Course
          </button>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-xl font-semibold mb-6">My Courses</h2>

          {courses.length === 0 ? (
            <p className="text-gray-600">No courses created yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{course.title}</h3>

                    {course.price === 0 ? (
                      <span className="inline-block mt-2 text-xs font-semibold bg-green-100 text-[#1f7a1f] px-3 py-1 rounded-full">
                        Free
                      </span>
                    ) : (
                      <p className="mt-2 font-medium">₹{course.price}</p>
                    )}
                  </div>

                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this course?")) return;

                      await fetch(
                        `http://localhost:5000/courses/${course.id}`,
                        {
                          method: "DELETE",
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }
                      );

                      setCourses((prev) =>
                        prev.filter((c) => c.id !== course.id)
                      );
                    }}
                    className="mt-6 text-sm font-semibold text-red-600 border border-red-200 rounded-md py-2 hover:bg-red-50 transition"
                  >
                    Delete Course
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default InstructorDashboard;



