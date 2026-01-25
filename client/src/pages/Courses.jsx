import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEnrollments } from "../utils/enrollment";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getYouTubeThumbnail = (url) => {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);

  if (!match) return null;

  return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
};


  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/courses").then(res => res.json()),
      getMyEnrollments()
    ])
      .then(([coursesData, enrolledIds]) => {
        setCourses(coursesData);
        setPurchased(enrolledIds);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f6ef] text-gray-500 font-medium">
        Loading courses…
      </div>
    );
  }

  const freeCourses = courses.filter(c => c.price === 0 && c.id);
  const paidCourses = courses.filter(c => c.price > 0 && c.id);

  return (
    <section className="min-h-screen bg-[#f7f6ef] text-[#111] py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Web Development Courses
          </h1>
          <p className="mt-3 text-gray-600 text-lg max-w-2xl">
            Learn practical, job-ready skills with structured learning paths.
          </p>
        </div>

        {/* FREE COURSES */}
        {freeCourses.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#1f7a1f] rounded-full" />
              Free Courses
            </h3>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              {freeCourses.map(course => (
                <div
                  key={course.id}
                  onClick={() => navigate(`/learn/${course.id}`)}
                  className="min-w-[300px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <div className="relative h-40 rounded-t-2xl overflow-hidden bg-gray-200">
  {course.videoUrl ? (
    <img
      src={getYouTubeThumbnail(course.videoUrl)}
      alt={course.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="flex items-center justify-center h-full text-gray-400">
      No preview
    </div>
  )}

  {/* Play icon */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="bg-black/60 text-white p-3 rounded-full">
      ▶
    </div>
  </div>
</div>


                  <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                      {course.title}
                    </h3>

                    <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-[#1f7a1f] text-xs font-semibold">
                      Free
                    </span>

                    <button className="w-full mt-2 py-2.5 rounded-lg bg-[#1f7a1f] text-white font-semibold hover:bg-green-800 transition">
                      Start Learning
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAID COURSES */}
        {paidCourses.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#facc15] rounded-full" />
              Premium Courses
            </h3>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
              {paidCourses.map(course => {
                const isPurchased = purchased.includes(course.id);

                return (
                  <div
                    key={course.id}
                    className="min-w-[300px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative h-40 rounded-t-2xl overflow-hidden bg-gray-200">
  {course.videoUrl ? (
    <img
      src={getYouTubeThumbnail(course.videoUrl)}
      alt={course.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="flex items-center justify-center h-full text-gray-400">
      No preview
    </div>
  )}

  {/* Play icon */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="bg-black/60 text-white p-3 rounded-full">
      ▶
    </div>
  </div>
</div>


                    <div className="p-6 space-y-4">
                      <h3 className="font-semibold text-lg leading-snug line-clamp-2">
                        {course.title}
                      </h3>

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold">
                          ₹{course.price}
                        </span>

                        {isPurchased && (
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-[#1f7a1f] font-semibold">
                            Purchased
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() =>
                          isPurchased
                            ? navigate(`/learn/${course.id}`)
                            : navigate(`/checkout/course/${course.id}`)
                        }
                        className={`w-full py-2.5 rounded-lg font-semibold transition ${
                          isPurchased
                            ? "bg-[#1f7a1f] text-white hover:bg-green-800"
                            : "bg-[#facc15] text-black hover:bg-yellow-400"
                        }`}
                      >
                        {isPurchased ? "Continue Learning" : "Enroll Now"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

export default Courses;
