import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function AIPlayground() {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
  if (!prompt.trim()) return;

  setLoading(true);
  setOutput("");

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/ai/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "AI failed");
    }

    setOutput(data.output);
  } catch (err) {
    setOutput("⚠️ AI error. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="bg-[#f7f6ef] py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-16 max-w-3xl">
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 text-xs font-semibold rounded-full bg-[#1f7a1f]/10 text-[#1f7a1f]">
            ⚡ AI Playground
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#111] leading-tight">
            AI-Powered Coding Assistant
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Get instant explanations, debug errors, and understand concepts
            faster with Learning Hub’s AI assistant.
          </p>
        </div>

        {/* PLAYGROUND */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* INPUT CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#111]">
                Ask a Question
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Paste code, errors, or ask conceptual questions
              </p>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Examples:\n• Explain closures in JavaScript\n• Fix this React error\n• Difference between REST and GraphQL`}
              className="
                flex-1 w-full resize-none
                rounded-xl
                border border-black/10
                bg-[#fafafa]
                p-4
                text-sm text-[#111]
                placeholder:text-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#1f7a1f]/30
              "
            />

            <button
              onClick={handleRun}
              disabled={loading}
              className="
                mt-6
                inline-flex items-center justify-center gap-2
                rounded-lg
                bg-[#facc15]
                px-6 py-3
                text-sm font-semibold text-black
                hover:bg-[#fbbf24]
                transition
                disabled:opacity-60
              "
            >
              {loading ? "Thinking…" : "Run AI"}
            </button>
          </div>

          {/* OUTPUT CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 flex flex-col">
<div
  className="
    h-[420px]
    rounded-xl
    bg-[#0d1117]
    text-gray-200
    p-5
    overflow-y-auto
    text-sm
    leading-relaxed
  "
>

  {output ? (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-xl font-bold mt-4 mb-2 text-white">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-semibold mt-4 mb-2 text-white">
            {children}
          </h2>
        ),
        p: ({ children }) => (
          <p className="mb-3 text-gray-300">{children}</p>
        ),
        li: ({ children }) => (
          <li className="ml-5 list-disc mb-1 text-gray-300">
            {children}
          </li>
        ),
        code: ({ inline, children }) =>
          inline ? (
            <code className="bg-black/40 px-1 py-0.5 rounded text-yellow-300">
              {children}
            </code>
          ) : (
            <pre className="bg-black rounded-lg p-4 overflow-x-auto mb-4">
              <code className="text-green-300">{children}</code>
            </pre>
          ),
      }}
    >
      {output}
    </ReactMarkdown>
  ) : (
    <span className="text-gray-500">
      AI output will appear here after you run a prompt.
    </span>
  )}
</div>


            <div className="mt-4 text-xs text-gray-500">
              💡 Tip: Be specific for better results. Include code snippets if possible.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AIPlayground;


