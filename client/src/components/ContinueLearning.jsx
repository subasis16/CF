import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const getYouTubeThumbnail = (url) => {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);
  if (!match) return null;

  return `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg`;
};

export default function ContinueLearning() {
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("continueLearning");
    if (saved) {
      setCourse(JSON.parse(saved));
    }
  }, []);

  if (!course) return null;

  return (
    <section className="bg-[#f7f6ef] px-6 py-14">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Continue Learning</h2>
          <span className="text-[#1f7a1f] font-semibold cursor-pointer">
            My learning →
          </span>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">

          {/* THUMBNAIL */}
          <div className="relative w-36 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
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

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                ▶
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="flex-1 space-y-2">
            <p className="text-sm text-gray-500">Course in progress</p>

            <h3 className="text-lg font-semibold">
              {course.title}
            </h3>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1f7a1f]"
                style={{ width: `${course.progress || 0}%` }}
              />
            </div>

            <p className="text-sm text-gray-500">
              {course.progress || 0}% completed
            </p>
          </div>

          {/* ACTION */}
          <button
            onClick={() => navigate(`/learn/${course.courseId}`)}
            className="bg-[#facc15] hover:bg-[#fbbf24] px-6 py-3 rounded-lg font-semibold text-black"
          >
            Resume
          </button>

        </div>
      </div>
    </section>
  );
}



