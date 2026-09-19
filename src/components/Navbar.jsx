import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const [isHidden, setIsHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });

  const listRef = useRef(null);
  const linkRefs = useRef([]);
  const barRef = useRef(null);
  const lastY = useRef(0);

  /* ---------------------------------------------------------------
   * Scroll: progress, state "scrolled", dan auto-hide saat scroll turun
   * ------------------------------------------------------------- */
  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;

      setProgress(Math.min(Math.max(y / max, 0), 1));
      setIsScrolled(y > 24);

      const delta = y - lastY.current;
      if (Math.abs(delta) > 8) {
        setIsHidden(delta > 0 && y > 240);
        lastY.current = y;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navbar tidak boleh ngumpet saat menu mobile terbuka
  useEffect(() => {
    if (mobileOpen) setIsHidden(false);
  }, [mobileOpen]);

  /* ---------------------------------------------------------------
   * Scrollspy: menandai section yang sedang dibaca
   * ------------------------------------------------------------- */
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const winner = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (winner?.target?.id) setActiveHash(`#${winner.target.id}`);
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.2, 0.5, 0.9],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------------------------
   * Indikator geser: mengukur posisi link aktif / yang sedang di-hover
   * ------------------------------------------------------------- */
  const measurePill = useCallback(() => {
    const activeIndex = navItems.findIndex((item) => item.href === activeHash);
    const index = hoverIndex !== null ? hoverIndex : activeIndex;
    const link = linkRefs.current[index];
    const list = listRef.current;

    if (!link || !list) {
      setPill((prev) => ({ ...prev, visible: false }));
      return;
    }

    const linkBox = link.getBoundingClientRect();
    const listBox = list.getBoundingClientRect();

    setPill({
      left: linkBox.left - listBox.left,
      width: linkBox.width,
      visible: true,
    });
  }, [activeHash, hoverIndex]);

  useEffect(() => {
    measurePill();
    // ukur ulang setelah webfont selesai dimuat agar posisi tidak meleset
    const timer = setTimeout(measurePill, 250);
    window.addEventListener("resize", measurePill);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measurePill);
    };
  }, [measurePill]);

  /* ---------------------------------------------------------------
   * Sorotan halus yang mengikuti kursor di atas bar
   * ------------------------------------------------------------- */
  const handlePointerMove = (event) => {
    const bar = barRef.current;
    if (!bar) return;
    const box = bar.getBoundingClientRect();
    bar.style.setProperty("--mx", `${event.clientX - box.left}px`);
    bar.style.setProperty("--my", `${event.clientY - box.top}px`);
    bar.style.setProperty("--sheen", "1");
  };

  const handlePointerLeave = () => {
    barRef.current?.style.setProperty("--sheen", "0");
    setHoverIndex(null);
  };

  /* ---------------------------------------------------------------
   * Overlay mobile: kunci scroll + tutup dengan Escape
   * ------------------------------------------------------------- */
  useEffect(() => {
    if (!mobileOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  const handleNavClick = (href) => {
    setActiveHash(href);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Garis progres baca, menempel di tepi atas viewport */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent">
        <div
          className="h-full origin-left bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)]"
          style={{
            transform: `scaleX(${progress})`,
            opacity: progress > 0.01 ? 1 : 0,
            transition: "transform 120ms linear, opacity 300ms ease",
          }}
        />
      </div>

      {/*
        Centering pakai inset-x-0 + mx-auto, BUKAN left-1/2 + translate.
        Di Tailwind v4 utility -translate-x-1/2 memakai properti `translate`,
        yang akan bertumpuk dengan `transform` inline dan menggeser navbar.
      */}
      <header
        className="fixed inset-x-0 top-4 z-50 mx-auto w-[94%] max-w-6xl transition-[transform,opacity] duration-500 ease-out"
        style={{
          transform: isHidden ? "translateY(-140%)" : "translateY(0)",
          opacity: isHidden ? 0 : 1,
        }}
      >
        <div
          ref={barRef}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          className={`nav-shell relative overflow-hidden rounded-full border transition-[background-color,border-color,box-shadow,padding] duration-500 ${
            isScrolled
              ? "border-white/12 bg-slate-950/70 px-5 py-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              : "border-white/8 bg-white/[0.04] px-6 py-4 backdrop-blur-md"
          }`}
        >
          <div className="relative flex items-center justify-between gap-4">
            {/* Logo */}
            <a
              href="#home"
              onClick={() => handleNavClick("#home")}
              className="group shrink-0 text-2xl font-extrabold tracking-tight"
            >
              <span className="text-gradient">Ricep</span>
              <span className="text-white/90 transition-colors duration-300 group-hover:text-white">
                .dev
              </span>
            </a>

            {/* Menu desktop */}
            <div
              ref={listRef}
              className="relative hidden items-center md:flex"
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Indikator yang meluncur mengikuti link aktif */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-1 rounded-full border border-white/10 bg-white/10"
                style={{
                  left: pill.left,
                  width: pill.width,
                  opacity: pill.visible ? 1 : 0,
                  transition:
                    "left 420ms cubic-bezier(0.22, 1, 0.36, 1), width 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease",
                }}
              />

              {navItems.map((item, index) => {
                const isActive = item.href === activeHash;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    ref={(el) => (linkRefs.current[index] = el)}
                    onMouseEnter={() => setHoverIndex(index)}
                    onFocus={() => setHoverIndex(index)}
                    onBlur={() => setHoverIndex(null)}
                    onClick={() => handleNavClick(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative z-10 rounded-full px-4 py-2 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60 ${
                      isActive
                        ? "font-medium text-white"
                        : "text-[var(--text-secondary)] hover:text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-glow relative hidden overflow-hidden rounded-full bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--accent-purple)]/20 transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 md:inline-flex"
              >
                <span className="relative z-10">Hubungi saya</span>
              </a>

              {/* Tombol menu mobile */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Buka menu"
                aria-expanded={mobileOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors duration-300 hover:bg-white/10 md:hidden"
              >
                <span className="flex flex-col items-end gap-[5px]">
                  <span className="block h-[2px] w-5 rounded-full bg-white" />
                  <span className="block h-[2px] w-3.5 rounded-full bg-white/70" />
                  <span className="block h-[2px] w-5 rounded-full bg-white" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay menu mobile */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi"
          className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-slate-950/92 backdrop-blur-2xl overlay-in md:hidden"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-[var(--accent-teal)]/10 blur-[110px]" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[var(--accent-purple)]/10 blur-[110px]" />
          </div>

          <div className="relative flex h-full flex-col overflow-y-auto">
            <div className="flex shrink-0 items-center justify-between px-6 pt-6">
              <a
                href="#home"
                onClick={() => handleNavClick("#home")}
                className="text-2xl font-extrabold tracking-tight"
              >
                <span className="text-gradient">Ricep</span>
                <span className="text-white">.dev</span>
              </a>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Tutup menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:bg-white/10"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 py-10">
              {navItems.map((item, index) => {
                const isActive = item.href === activeHash;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    style={{ animationDelay: `${80 + index * 60}ms` }}
                    className={`overlay-item flex items-center gap-4 rounded-2xl px-4 py-4 text-3xl font-semibold tracking-tight transition-colors duration-300 active:bg-white/10 ${
                      isActive ? "text-white" : "text-[var(--text-secondary)]"
                    }`}
                  >
                    <span
                      className={`h-6 w-[3px] rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-b from-[var(--accent-teal)] to-[var(--accent-purple)]"
                          : "bg-white/10"
                      }`}
                    />
                    {item.name}
                  </a>
                );
              })}
            </nav>

            <div
              className="overlay-item shrink-0 px-6 pb-10 pt-2"
              style={{ animationDelay: `${80 + navItems.length * 60}ms` }}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] px-6 py-4 text-base font-semibold text-white shadow-lg shadow-[var(--accent-purple)]/20 transition-transform duration-300 active:scale-[0.98]"
              >
                Hubungi saya
              </a>
              <p className="mt-4 text-center text-sm text-[var(--text-secondary)]">
                Balasan biasanya dalam 1×24 jam lewat WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Sorotan lembut yang mengikuti kursor di atas bar */
        .nav-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: var(--sheen, 0);
          background: radial-gradient(
            180px circle at var(--mx, 50%) var(--my, 50%),
            rgba(255, 255, 255, 0.10),
            transparent 65%
          );
          transition: opacity 400ms ease;
          pointer-events: none;
        }

        /* Kilau yang lewat sekali saat tombol di-hover */
        .cta-glow::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 45%;
          left: -60%;
          background: linear-gradient(
            100deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          transform: skewX(-18deg);
        }
        .cta-glow:hover::after {
          animation: navSheen 750ms ease-out;
        }
        @keyframes navSheen {
          to { left: 120%; }
        }

        .overlay-in {
          animation: navOverlayIn 260ms ease-out both;
        }
        @keyframes navOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .overlay-item {
          opacity: 0;
          animation: navItemIn 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes navItemIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .overlay-in,
          .overlay-item,
          .cta-glow:hover::after {
            animation: none !important;
          }
          .overlay-item { opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default Navbar;