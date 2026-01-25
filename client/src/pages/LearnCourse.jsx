import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LearnCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [question, setQuestion] = useState("");
const [doubts, setDoubts] = useState([]);


const submitDoubt = () => {
  if (!question.trim()) return;

  setDoubts(prev => [
    ...prev,
    {
      text: question,
      time: new Date().toLocaleString(),
    },
  ]);

  setQuestion("");
};

  // 🔁 Convert any YouTube URL into embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Full YouTube URL
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Short YouTube URL
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Already embed format
    return url;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/courses/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }).then(async (res) => {
      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (res.status === 403) {
        navigate(`/checkout/course/${id}`);
        return;
      }

     const data = await res.json();

if (data.access === "admin") {
  setCourse(data.course);
  return;
}

if (data.access === "free" || data.access === "paid") {
  setCourse(data.course);
  return;
}

      localStorage.setItem(
      "continueLearning",
      JSON.stringify({
        courseId: data.course.id,
        title: data.course.title,
        videoUrl: data.course.videoUrl,
        progress: 35, // temporary static value
      })
    );
    });
  }, [id, navigate]);

  if (!course) return null;

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-6 py-20 text-[#111]">
      <div className="max-w-6xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold">
          {course.title}
        </h1>

        {/* 🎥 VIDEO PLAYER */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-gray-200">
          {course.videoUrl ? (
            <iframe
              src={getEmbedUrl(course.videoUrl)}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Course Video"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No video added yet
            </div>
          )}
        </div>

        {/* INFO SECTION */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">
            About this lesson
          </h2>
          <p className="text-gray-600">
            Watch the full video carefully. Practice the concepts alongside
            the video to gain real-world coding experience.
          </p>
        </div>

      </div>
    </section>
  );
}

export default LearnCourse;



