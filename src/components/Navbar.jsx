import React, { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Publications", href: "#publications" },
];

const whatsappUrl =
  "https://wa.me/6281563139212?text=Halo%20Ricep,%20saya%20tertarik%20dengan%20portfolio%20Anda.%20Saya%20ingin%20berdiskusi%20mengenai%20proyek%20website%20atau%20aplikasi.%20Terima%20kasih.";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the fullscreen mobile overlay is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500
        ${
          isScrolled
            ? "w-[95%] max-w-6xl"
            : "w-[96%] max-w-6xl"
        }`}
      >
        <div
          className="
            rounded-full
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            px-6
            py-4
            transition-all
            duration-500
          "
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="text-2xl font-extrabold tracking-tight"
            >
              <span className="text-gradient">Ricep</span>
              <span className="text-white">.dev</span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    text-[var(--text-secondary)]
                    hover:text-white
                    hover:bg-white/10
                    transition-all
                    duration-300
                  "
                >
                  {item.name}
                </a>
              ))}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  ml-3
                  rounded-full
                  bg-gradient-to-r
                  from-[var(--accent-teal)]
                  to-[var(--accent-purple)]
                  px-6
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                Contact Me
              </a>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            >
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="
            fixed inset-0 z-[60] md:hidden
            flex h-[100dvh] flex-col
            bg-slate-950/90 backdrop-blur-2xl
            animate-[overlayFadeIn_0.4s_ease_forwards]
          "
        >
          {/* Ambient background glows to match theme */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[var(--accent-teal)]/10 blur-[100px]" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[var(--accent-purple)]/10 blur-[100px]" />
          </div>

          {/* Scrollable container so nothing ever gets cut off */}
          <div className="relative flex h-full flex-col overflow-y-auto">
            {/* Top bar: logo + close */}
            <div className="flex shrink-0 items-center justify-between px-6 pt-6">
              <a
                href="#home"
                onClick={closeMobileMenu}
                className="text-2xl font-extrabold tracking-tight"
              >
                <span className="text-gradient">Ricep</span>
                <span className="text-white">.dev</span>
              </a>

              <button
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-full border border-white/10 bg-white/5
                  text-white transition-all duration-300
                  hover:border-red-400/40 hover:bg-white/10 hover:text-red-300
                "
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6 py-10">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  style={{ animationDelay: `${100 + index * 70}ms` }}
                  className="
                    group flex items-center justify-between
                    rounded-2xl px-5 py-4
                    text-2xl font-semibold text-[var(--text-secondary)]
                    opacity-0
                    transition-all duration-300
                    hover:bg-white/10 hover:text-white
                    active:bg-white/15 active:scale-[0.98]
                    animate-[overlayItemIn_0.5s_ease_forwards]
                  "
                >
                  <span>{item.name}</span>
                  <span
                    className="
                      text-[var(--accent-teal)]
                      opacity-0 -translate-x-2
                      transition-all duration-300
                      group-hover:opacity-100 group-hover:translate-x-0
                    "
                  >
                    &rarr;
                  </span>
                </a>
              ))}
            </nav>

            {/* Contact Me button — always visible, never cut off */}
            <div
              className="shrink-0 px-6 pb-8 pt-2 opacity-0 animate-[overlayItemIn_0.5s_ease_forwards]"
              style={{ animationDelay: `${100 + navItems.length * 70}ms` }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="
                  flex w-full items-center justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-[var(--accent-teal)]
                  to-[var(--accent-purple)]
                  px-6
                  py-4
                  text-center
                  text-base
                  font-semibold
                  text-white
                  shadow-lg shadow-[var(--accent-purple)]/20
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Keyframes for overlay animations */}
      <style>{`
        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes overlayItemIn {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;