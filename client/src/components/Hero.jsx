import { useNavigate } from "react-router-dom";


function Hero() {
  const navigate = useNavigate();
  return (
    <section className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 pt-1 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div>

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-[#111]">
            A smarter way to <br />
            <span className="text-[#1f7a1f]">learn coding</span> & build skills
          </h1>

          <p className="mt-6 text-lg text-[#6b7280] max-w-xl">
            Learn real-world coding skills with structured courses, hands-on practice,
            and personalized learning paths designed for developers.
          </p>

          {/* CTA */}
{/* CTA */}
<div className="mt-10 flex flex-wrap gap-4">
  <button
    onClick={() => navigate("/courses")}
    className="rounded-full bg-[#1f7a1f] px-8 py-4 text-white font-semibold hover:bg-[#166534] transition"
  >
    Start Learning Free →
  </button>

  <button
    onClick={() => navigate("/courses")}
    className="rounded-full border border-black/20 px-8 py-4 font-semibold text-[#111] hover:bg-black/5 transition"
  >
    Explore Courses
  </button>
</div>

          {/* STATS */}
          <div className="mt-14 flex gap-10 text-sm">
            <div>
              <p className="text-2xl font-bold text-[#111]">10+</p>
              <p className="text-[#6b7280]">Active Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111]">5+</p>
              <p className="text-[#6b7280]">Courses</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#111]">98%</p>
              <p className="text-[#6b7280]">Success Rate</p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT VISUAL ================= */}
        <div className="relative">

          {/* Card 1 */}
          <div className="absolute -top-10 left-0 bg-white rounded-2xl shadow-lg p-6 w-56">
            <p className="text-sm font-semibold text-[#111]">
              JavaScript Basics
            </p>
            <p className="mt-2 text-xs text-[#6b7280]">
              Variables, loops, functions
            </p>
            <span className="inline-block mt-3 text-xs rounded-full bg-[#e6f4ea] px-3 py-1 text-[#1f7a1f]">
              Beginner
            </span>
          </div>

          {/* Card 2 */}
          <div className="absolute top-24 right-0 bg-white rounded-2xl shadow-lg p-6 w-60">
            <p className="text-sm font-semibold text-[#111]">
              React Development
            </p>
            <p className="mt-2 text-xs text-[#6b7280]">
              Components, hooks, projects
            </p>
            <span className="inline-block mt-3 text-xs rounded-full bg-[#e6f4ea] px-3 py-1 text-[#1f7a1f]">
              Intermediate
            </span>
          </div>

          {/* Card 3 */}
          <div className="absolute bottom-0 left-20 bg-white rounded-2xl shadow-lg p-6 w-64">
            <p className="text-sm font-semibold text-[#111]">
              Full-Stack Roadmap
            </p>
            <p className="mt-2 text-xs text-[#6b7280]">
              Frontend → Backend → Deployment
            </p>
            <span className="inline-block mt-3 text-xs rounded-full bg-[#e6f4ea] px-3 py-1 text-[#1f7a1f]">
              Career Path
            </span>
          </div>

          {/* Background soft shape */}
          <div className="h-[420px] rounded-3xl bg-gradient-to-br from-[#e6f4ea] to-[#f5f4ec]"></div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
