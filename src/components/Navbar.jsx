import React, { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
];

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
          className={`
            rounded-full
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            shadow-2xl
            px-6
            py-4
            transition-all
            duration-500
          `}
        >
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a
              href="#home"
              className="text-2xl font-extrabold tracking-tight flex items-center gap-2"
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
                href="#contact"
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
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden
            overflow-hidden
            transition-all
            duration-500
            ${
              mobileOpen
                ? "max-h-96 opacity-100 mt-4"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-5">

            <div className="flex flex-col gap-2">

              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="
                    rounded-xl
                    px-4
                    py-3
                    text-[var(--text-secondary)]
                    hover:bg-white/10
                    hover:text-white
                    transition
                  "
                >
                  {item.name}
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="
                  mt-3
                  rounded-xl
                  bg-gradient-to-r
                  from-[var(--accent-teal)]
                  to-[var(--accent-purple)]
                  px-4
                  py-3
                  text-center
                  font-semibold
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Contact Me
              </a>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;