import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState("monthly");

  const handleBuy = (plan) => {
    navigate(`/checkout/plan/${plan}`);
  };

  return (
    <section className="min-h-screen bg-[#f7f6ef] py-28 px-6 text-[#111]">
      <div className="max-w-7xl mx-auto text-center">

        {/* HEADER */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Choose the right plan for you
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 mb-16">
          Simple pricing for individuals and teams.
          Upgrade anytime as you grow.
        </p>

        {/* BILLING TOGGLE */}
        <div className="inline-flex items-center rounded-full border border-gray-300 p-1 mb-20 bg-white">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
              billing === "monthly"
                ? "bg-[#1f7a1f] text-white"
                : "text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annually")}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
              billing === "annually"
                ? "bg-[#1f7a1f] text-white"
                : "text-gray-700"
            }`}
          >
            Annually
          </button>
        </div>

        {/* PRICING CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* INDIVIDUAL */}
          <div className="rounded-2xl bg-white border border-gray-200 p-10 text-left shadow-sm">
            <h3 className="text-lg font-semibold mb-2">
              Individual
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">₹549</span>
              <span className="text-sm text-gray-500">/ month</span>
            </div>

            <p className="text-gray-600 mb-8">
              Perfect for students and individual learners.
            </p>

            <ul className="space-y-4 text-sm mb-10 text-gray-700">
              <li>✔ Access all courses</li>
              <li>✔ AI Playground</li>
              <li>✔ Progress tracking</li>
              <li>✔ Community support</li>
            </ul>

            <button
              onClick={() => handleBuy("starter")}
              className="w-full rounded-md bg-[#1f7a1f] py-3 text-sm font-semibold text-white hover:bg-[#166316] transition"
            >
              Get started
            </button>
          </div>

          {/* TEAM */}
          <div className="relative rounded-2xl bg-white border-2 border-[#1f7a1f] p-12 text-left shadow-md">

            <span className="absolute -top-4 left-6 bg-[#1f7a1f] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Recommended
            </span>

            <h3 className="text-lg font-semibold mb-2">
              Team
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">₹1,999</span>
              <span className="text-sm text-gray-500">/ month</span>
            </div>

            <p className="text-gray-600 mb-8">
              Best for teams, colleges, and organizations.
            </p>

            <ul className="space-y-4 text-sm mb-10 text-gray-700">
              <li>✔ Everything in Individual</li>
              <li>✔ Multi-user access</li>
              <li>✔ Instructor & admin dashboards</li>
              <li>✔ Priority support</li>
            </ul>

            <button
              onClick={() => handleBuy("scale")}
              className="w-full rounded-md bg-[#facc15] py-3 text-sm font-semibold text-black hover:bg-[#fbbf24] transition"
            >
              Get started
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Pricing;
