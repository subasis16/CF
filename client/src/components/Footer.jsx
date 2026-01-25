function Footer() {
  return (
    <footer className="bg-[#f7f6ef] text-[#111] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-6 mb-10">
          {[
            {
              label: "Facebook",
              icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
            },
            {
              label: "Instagram",
              icon: "M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10z",
            },
            {
              label: "X",
              icon: "M18.3 2H21l-6.4 7.4L22 22h-6.3l-5-6.2L5 22H2l6.9-8L2 2h6.4l4.5 5.6z",
            },
            {
              label: "GitHub",
              icon: "M12 2a10 10 0 00-3 19c.5.1.7-.2.7-.5v-2c-3 .6-3.6-1.5-3.6-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7-.7 2.1-1.1-.1-.7-.4-1.1-.7-1.4-2.4-.3-4.9-1.2-4.9-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.9 1.1a10 10 0 015.3 0c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.4.1 2.7.7.8 1.1 1.8 1.1 3 0 4.2-2.5 5.1-4.9 5.4.4.3.8 1 .8 2v3c0 .3.2.6.7.5A10 10 0 0012 2z",
            },
            {
              label: "YouTube",
              icon: "M10 15l5-3-5-3z",
            },
          ].map((social) => (
            <a
              key={social.label}
              href="#"
              aria-label={social.label}
              className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-[#1f7a1f]/10
                hover:bg-[#1f7a1f]/20
                transition
              "
            >
              <svg
                className="w-4 h-4 text-[#1f7a1f]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={social.icon} />
              </svg>
            </a>
          ))}
        </div>

        {/* COPYRIGHT */}
        <p className="text-center text-sm text-[#111]/60">
          © 2025 CodeForge. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
