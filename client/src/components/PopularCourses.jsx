import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEnrollments } from "../utils/enrollment";

function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const getYouTubeThumbnail = (url) => {
  if (!url) return null;

  const regExp =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const match = url.match(regExp);

  if (!match) return null;

 return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;

};


  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/courses").then(res => res.json()),
      getMyEnrollments(),
    ])
      .then(([coursesData, enrolledIds]) => {
        setCourses(coursesData.filter(c => c.id));
        setPurchased(enrolledIds);
      })
      .catch(console.error);
  }, []);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-24 relative">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-[#111]">
          What to learn next
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Recommended for you
        </p>

        {/* LEFT ARROW */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-100"
        >
          ←
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md items-center justify-center hover:bg-gray-100"
        >
          →
        </button>

        {/* CARD STRIP */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-hidden"
        >
          {courses.map(course => {
            const isPurchased = purchased.includes(course.id);

            return (
              <div
                key={course.id}
                className="min-w-[320px] bg-white rounded-2xl border border-black/5 shadow-sm hover:shadow-lg transition flex flex-col"
              >
                {/* THUMBNAIL */}
               <div className="relative h-44 rounded-t-2xl overflow-hidden bg-gray-200">
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
    <div className="bg-black/60 text-white p-3 rounded-full">
      ▶
    </div>
  </div>
</div>


                {/* CONTENT */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <span className="w-fit text-xs px-3 py-1 rounded-full bg-[#e6f4ea] text-[#166534]">
                    programming
                  </span>

                  <h3 className="font-semibold text-[#111] leading-snug line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="text-lg font-semibold text-[#111]">
                    {course.price === 0 ? "Free" : `₹${course.price}`}
                  </div>

                  <div className="flex gap-2">
                    {course.price > 0 && (
                      <span className="text-xs px-2 py-1 rounded bg-[#ede9fe] text-[#5b21b6]">
                        Premium
                      </span>
                    )}
                    {isPurchased && (
                      <span className="text-xs px-2 py-1 rounded bg-[#e6f4ea] text-[#1f7a1f]">
                        Purchased
                      </span>
                    )}
                  </div>
                </div>

                {/* BUTTON (ALWAYS BOTTOM) */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() =>
                      course.price === 0 || isPurchased
                        ? navigate(`/learn/${course.id}`)
                        : navigate(`/checkout/course/${course.id}`)
                    }
                    className={`w-full py-3 rounded-lg text-sm font-semibold transition ${
                      course.price === 0 || isPurchased
                        ? "bg-[#1f7a1f] text-white hover:bg-[#166534]"
                        : "bg-[#facc15] text-black hover:bg-[#fbbf24]"
                    }`}
                  >
                    {course.price === 0
                      ? "Start Learning"
                      : isPurchased
                      ? "Continue Learning"
                      : "Enroll Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default PopularCourses;

