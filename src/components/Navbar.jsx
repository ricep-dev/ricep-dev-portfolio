import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-dark)]/80 backdrop-blur-md shadow-lg py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-24 flex justify-between items-center whitespace-nowrap">
        <a
          href="#"
          className="text-2xl font-bold tracking-tighter text-gradient flex-shrink-0"
        >
          Ricep<span className="text-white">.dev</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 ml-auto">
          <a href="#home" className="hover:text-[var(--accent-teal)] transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-[var(--accent-teal)] transition-colors">
            About
          </a>
          <a href="#skills" className="hover:text-[var(--accent-teal)] transition-colors">
            Skills
          </a>
          <a href="#projects" className="hover:text-[var(--accent-teal)] transition-colors">
            Projects
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white hover:text-[var(--accent-teal)]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full card-glass mt-2 flex flex-col p-4 space-y-4">
          <a href="#home" className="hover:text-[var(--accent-teal)] transition-colors py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#about" className="hover:text-[var(--accent-teal)] transition-colors py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#skills" className="hover:text-[var(--accent-teal)] transition-colors py-2 border-b border-white/10" onClick={() => setIsMobileMenuOpen(false)}>Skills</a>
          <a href="#projects" className="hover:text-[var(--accent-teal)] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Projects</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
