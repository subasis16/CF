export default function Notes() {
  return (
    <section className="min-h-screen bg-[#f7f6ef] px-6 py-20 text-[#111]">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* HEADER */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">
            Developer Documentation & Notes
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Structured documentation covering programming languages, web & app
            development, backend systems, databases, AI, deployment, Git,
            and essential developer tools.
          </p>
        </header>

        {/* ================= PROGRAMMING LANGUAGES ================= */}
        <Section title="Programming Languages">

          <Doc title="JavaScript (JS)">
            <p>
              JavaScript is the core language of the web. It runs in the browser
              and on servers using Node.js.
            </p>
            <ul>
              <li>Used for frontend (React, Vue, Angular)</li>
              <li>Used for backend (Node.js, Express)</li>
              <li>Event-driven, asynchronous</li>
              <li>Supports async/await and Promises</li>
            </ul>
          </Doc>

          <Doc title="TypeScript (TS)">
            <p>
              TypeScript is JavaScript with types. It prevents many runtime bugs
              and improves large applications.
            </p>
            <ul>
              <li>Strong typing on top of JavaScript</li>
              <li>Used heavily in React, Angular, enterprise apps</li>
              <li>Improves code readability and maintenance</li>
            </ul>
          </Doc>

          <Doc title="Python">
            <p>
              Python is a high-level language known for readability and simplicity.
            </p>
            <ul>
              <li>Used in AI, ML, data science</li>
              <li>Backend development (Django, Flask, FastAPI)</li>
              <li>Scripting, automation, APIs</li>
            </ul>
          </Doc>

          <Doc title="Java">
            <p>
              Java is a strongly-typed, object-oriented language used widely in
              enterprise and Android development.
            </p>
            <ul>
              <li>Android app development</li>
              <li>Large-scale enterprise systems</li>
              <li>Spring Boot for backend APIs</li>
            </ul>
          </Doc>

        </Section>

        {/* ================= WEB DEVELOPMENT ================= */}
        <Section title="Web Development">

          <Doc title="HTML (Structure)">
            <p>
              HTML defines the structure and content of web pages.
            </p>
            <ul>
              <li>Semantic tags improve SEO</li>
              <li>Accessible by screen readers</li>
              <li>Base of every website</li>
            </ul>
          </Doc>

          <Doc title="CSS & Tailwind CSS (Styling)">
            <p>
              CSS controls layout, colors, spacing, and responsiveness.
            </p>
            <ul>
              <li>Flexbox & Grid for layouts</li>
              <li>Tailwind CSS = utility-first styling</li>
              <li>Responsive design for all screens</li>
            </ul>
          </Doc>

          <Doc title="React (Frontend)">
            <p>
              React is a component-based UI library used to build fast,
              interactive interfaces.
            </p>
            <ul>
              <li>Reusable components</li>
              <li>Hooks: useState, useEffect, useContext</li>
              <li>SPA (Single Page Applications)</li>
            </ul>
          </Doc>

        </Section>

        {/* ================= BACKEND ================= */}
        <Section title="Backend Development">

          <Doc title="Node.js">
            <p>
              Node.js allows JavaScript to run on the server.
            </p>
            <ul>
              <li>Non-blocking, event-driven</li>
              <li>Fast APIs</li>
              <li>Scales well</li>
            </ul>
          </Doc>

          <Doc title="Express.js">
            <p>
              Express is a minimal backend framework for Node.js.
            </p>
            <ul>
              <li>Routing & middleware</li>
              <li>REST APIs</li>
              <li>Authentication & authorization</li>
            </ul>
          </Doc>

          <Doc title="Authentication">
            <ul>
              <li>JWT (JSON Web Tokens)</li>
              <li>Role-based access</li>
              <li>Secure APIs</li>
            </ul>
          </Doc>

        </Section>

        {/* ================= DATABASE ================= */}
        <Section title="Databases">

          <Doc title="SQL Databases">
            <ul>
              <li>MySQL, PostgreSQL</li>
              <li>Relational structure</li>
              <li>Strong consistency</li>
            </ul>
          </Doc>

          <Doc title="Prisma ORM">
            <p>
              Prisma is an ORM that simplifies database access.
            </p>
            <ul>
              <li>Type-safe queries</li>
              <li>Auto migrations</li>
              <li>Works with SQL databases</li>
            </ul>
          </Doc>

        </Section>

        {/* ================= AI DEVELOPMENT ================= */}
        <Section title="AI & Machine Learning">

          <Doc title="AI APIs (OpenAI)">
            <p>
              AI APIs allow apps to generate text, code, explanations, and more.
            </p>
            <ul>
              <li>Chatbots</li>
              <li>Code assistants</li>
              <li>Summarization & Q&A</li>
            </ul>
          </Doc>

          <Doc title="Python for AI">
            <ul>
              <li>Libraries: NumPy, Pandas</li>
              <li>ML: TensorFlow, PyTorch</li>
              <li>Data analysis & modeling</li>
            </ul>
          </Doc>

        </Section>

        {/* ================= GIT & GITHUB ================= */}
        <Section title="Git & GitHub">

          <Doc title="Git Basics">
            <CodeBlock>
{`git init
git add .
git commit -m "Initial commit"`}
            </CodeBlock>
          </Doc>

          <Doc title="GitHub Workflow">
            <CodeBlock>
{`git remote add origin https://github.com/username/repo.git
git push -u origin main`}
            </CodeBlock>
          </Doc>

        </Section>

        {/* ================= DEPLOYMENT ================= */}
        <Section title="Deployment">

          <Doc title="Frontend Deployment">
            <ul>
              <li>Vercel, Netlify</li>
              <li>GitHub integration</li>
            </ul>
            <CodeBlock>
{`npm run build`}
            </CodeBlock>
          </Doc>

          <Doc title="Backend Deployment">
            <ul>
              <li>Render, Railway, VPS</li>
              <li>Environment variables</li>
            </ul>
          </Doc>

        </Section>

      </div>
    </section>
  );
}

/* ================= UI COMPONENTS ================= */

function Section({ title, children }) {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold border-b border-gray-300 pb-3">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function Doc({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-3">
      <h3 className="font-semibold text-lg">
        {title}
      </h3>
      <div className="text-sm text-gray-700 space-y-2">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ children }) {
  return (
    <pre className="bg-[#0d1117] text-green-400 text-sm rounded-lg p-4 overflow-x-auto">
      <code>{children}</code>
    </pre>
  );
}

