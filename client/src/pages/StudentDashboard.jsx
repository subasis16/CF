import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [continueCourse, setContinueCourse] = useState(null);
  const getYouTubeThumbnail = (url) => {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);
  if (!match) return null;

  return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
};


  useEffect(() => {
    fetch("http://localhost:5000/enrollments/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setEnrolledCourses)
      .catch(console.error);

    const saved = localStorage.getItem("continueLearning");
    if (saved) {
      setContinueCourse(JSON.parse(saved));
    }
  }, []);

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-6 py-20">
      <div className="max-w-7xl mx-auto space-y-14">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Track your learning progress
          </p>
        </div>

        {/* CONTINUE LEARNING */}
   {continueCourse && (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-6">

    {/* THUMBNAIL */}
    <div className="w-36 h-24 rounded-xl overflow-hidden bg-gray-200 relative">
      {continueCourse.videoUrl ? (
        <img
          src={getYouTubeThumbnail(continueCourse.videoUrl)}
          alt={continueCourse.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          No preview
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/60 text-white p-2 rounded-full text-sm">
          ▶
        </div>
      </div>
    </div>

    {/* INFO */}
    <div className="flex-1 space-y-2">
      <p className="text-sm text-gray-500">Course in progress</p>

      <h3 className="text-lg font-semibold">
        {continueCourse.title}
      </h3>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1f7a1f]"
          style={{ width: `${continueCourse.progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-500">
        {continueCourse.progress}% completed
      </p>
    </div>

    {/* RESUME */}
    <button
      onClick={() => navigate(`/learn/${continueCourse.courseId}`)}
      className="bg-[#facc15] hover:bg-[#fbbf24] px-6 py-3 rounded-lg font-semibold text-black"
    >
      Resume
    </button>

  </div>
)}

        {/* MY COURSES */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>

          {enrolledCourses.length === 0 ? (
            <div className="bg-white border rounded-xl p-6 text-center">
              <p className="text-gray-500 mb-4">
                No courses enrolled yet
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="bg-[#1f7a1f] text-white px-6 py-2 rounded-lg"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl border p-5 shadow-sm"
                >
                  <h3 className="font-semibold mb-2">{course.title}</h3>
                  <button
                    onClick={() => navigate(`/learn/${course.id}`)}
                    className="w-full bg-[#1f7a1f] text-white py-2 rounded-lg"
                  >
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-3 gap-6">
          <button onClick={() => navigate("/courses")} className="bg-white border p-6 rounded-xl">
            Explore Courses
          </button>
          <button onClick={() => navigate("/notes")} className="bg-white border p-6 rounded-xl">
            Developer Notes
          </button>
          <button onClick={() => navigate("/ai-playground")} className="bg-white border p-6 rounded-xl">
            AI Playground
          </button>
        </div>

      </div>
    </section>
  );
}

