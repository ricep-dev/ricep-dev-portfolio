import React, { useEffect, useRef, useState } from "react";

/**
 * ---------------------------------------------------------------
 * useCountUp
 * Animates a number from 0 -> target once the element scrolls
 * into view. Works with values like "10" or "3" (suffix handled
 * separately so "+" doesn't break the counter).
 * ---------------------------------------------------------------
 */
const useCountUp = (target, isVisible, duration = 1400) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo — fast start, gentle settle
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(from + (target - from) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isVisible, target, duration]);

  return value;
};

/**
 * ---------------------------------------------------------------
 * useInView
 * Tiny IntersectionObserver hook so cards animate in only once,
 * the moment they actually enter the viewport.
 * ---------------------------------------------------------------
 */
const useInView = (options = { threshold: 0.35 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
};

/**
 * ---------------------------------------------------------------
 * StatCard
 * A single glass stat card with: count-up number, animated ring
 * progress behind the icon, tilt-on-hover, and a subtle shimmer.
 * ---------------------------------------------------------------
 */
const StatCard = ({
  icon,
  value,
  suffix = "+",
  label,
  sub,
  accent,
  ringPercent = 80,
  delay = 0,
  wide = false,
  isVisible,
}) => {
  const count = useCountUp(value, isVisible);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  const circumference = 2 * Math.PI * 34;
  const dashOffset = isVisible
    ? circumference - (ringPercent / 100) * circumference
    : circumference;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`stat-card ${wide ? "stat-card--wide" : ""}`}
      style={{
        "--accent": accent,
        transitionDelay: `${delay}ms`,
      }}
      data-visible={isVisible}
    >
      <span className="stat-card__glow" />
      <span className="stat-card__sheen" />

      <div className="stat-card__ring-wrap">
        <svg viewBox="0 0 80 80" className="stat-card__ring">
          <circle cx="40" cy="40" r="34" className="stat-card__ring-track" />
          <circle
            cx="40"
            cy="40"
            r="34"
            className="stat-card__ring-progress"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span className="stat-card__icon">{icon}</span>
      </div>

      <h4 className="stat-card__value">
        {count}
        <span className="stat-card__suffix">{suffix}</span>
      </h4>

      <p className="stat-card__label">{label}</p>
      <p className="stat-card__sub">{sub}</p>
    </div>
  );
};

/**
 * ---------------------------------------------------------------
 * TechChip — small animated pill for the tech-stack list
 * ---------------------------------------------------------------
 */
const TechChip = ({ label, delay, isVisible }) => (
  <span
    className="tech-chip"
    style={{ transitionDelay: `${delay}ms` }}
    data-visible={isVisible}
  >
    {label}
  </span>
);

const About = () => {
  const [listRef, listInView] = useInView({ threshold: 0.2 });
  const [statsRef, statsInView] = useInView({ threshold: 0.2 });

  const bulletItems = [
    { icon: "🚀", text: "I'm currently building modern Mobile & Web Applications." },
    { icon: "🌱", text: "Currently learning System Design & Scalable Architecture." },
    { icon: "🎯", text: "Specialized in React, Next.js, Golang & Flutter." },
    { icon: "💡", text: "Passionate about Backend Engineering & AI Recommendation Systems." },
    { icon: "⚡", text: "I enjoy solving real-world business problems through software." },
  ];

  const techStack = ["React", "Next.js", "Flutter", "Golang", "TypeScript", "Node.js", "PostgreSQL",];

  return (
    <section id="about" className="about-section py-20">
      <style>{`
        .about-section {
          position: relative;
          overflow: hidden;
        }

        /* ---------- Heading ---------- */
        .about-heading {
          opacity: 0;
          transform: translateY(18px);
          animation: aboutFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes aboutFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .underline-grow {
          width: 0;
          animation: underlineGrow 1s 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes underlineGrow {
          to { width: 6rem; }
        }

        /* ---------- Left card: bullet list ---------- */
        .about-list-item {
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .about-list-item[data-visible="true"] {
          opacity: 1;
          transform: translateX(0);
        }
        .about-list-item .bullet-icon {
          display: inline-flex;
          transition: transform 0.35s ease;
        }
        .about-list-item:hover .bullet-icon {
          transform: scale(1.25) rotate(-8deg);
        }
        .about-list-item:hover {
          transform: translateX(4px);
        }

        .about-card-left {
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .about-card-left:hover {
          box-shadow: 0 20px 50px -20px rgba(45, 212, 191, 0.25);
          border-color: rgba(45, 212, 191, 0.3);
        }

        /* ---------- Tech chips ---------- */
        .tech-chip {
          display: inline-block;
          padding: 0.4rem 0.9rem;
          margin: 0.25rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--text-secondary, #cbd5e1);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          opacity: 0;
          transform: translateY(10px) scale(0.9);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
          cursor: default;
        }
        .tech-chip[data-visible="true"] {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .tech-chip:hover {
          background: rgba(45, 212, 191, 0.15);
          border-color: rgba(45, 212, 191, 0.5);
          color: #fff;
          transform: translateY(-3px) scale(1.05);
        }

        /* ---------- Stat cards ---------- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; }
        }

        .stat-card {
          position: relative;
          padding: 1.75rem 1.25rem 1.5rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.04);
          text-align: center;
          overflow: hidden;
          isolation: isolate;
          cursor: default;

          opacity: 0;
          transform: translateY(28px) scale(0.96);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.35s ease,
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;

          transform-style: preserve-3d;
          --rx: 0deg;
          --ry: 0deg;
          --mx: 50%;
          --my: 50%;
        }
        .stat-card[data-visible="true"] {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .stat-card:hover {
          transform: perspective(700px) rotateX(var(--rx)) rotateY(var(--ry)) translateY(-4px);
          border-color: color-mix(in srgb, var(--accent) 55%, transparent);
          box-shadow: 0 24px 45px -22px color-mix(in srgb, var(--accent) 60%, transparent);
        }
        .stat-card--wide {
          grid-column: 1 / -1;
        }

        .stat-card__glow {
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 35%, transparent), transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
          z-index: 0;
          pointer-events: none;
        }
        .stat-card:hover .stat-card__glow { opacity: 1; }

        .stat-card__sheen {
          position: absolute;
          top: 0;
          left: -60%;
          width: 40%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.12), transparent);
          transform: skewX(-20deg);
          transition: left 0.9s ease;
          pointer-events: none;
          z-index: 1;
        }
        .stat-card:hover .stat-card__sheen { left: 140%; }

        .stat-card__ring-wrap {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto 0.9rem;
          z-index: 2;
        }
        .stat-card__ring { width: 100%; height: 100%; transform: rotate(-90deg); }
        .stat-card__ring-track {
          fill: none;
          stroke: rgba(255,255,255,0.08);
          stroke-width: 5;
        }
        .stat-card__ring-progress {
          fill: none;
          stroke: var(--accent);
          stroke-width: 5;
          stroke-linecap: round;
          transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 0 6px color-mix(in srgb, var(--accent) 70%, transparent));
        }
        .stat-card__icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: transform 0.4s ease;
        }
        .stat-card:hover .stat-card__icon {
          transform: scale(1.15) rotate(6deg);
        }

        .stat-card__value {
          position: relative;
          z-index: 2;
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          color: var(--accent);
          font-variant-numeric: tabular-nums;
        }
        .stat-card__suffix { font-size: 1.5rem; margin-left: 2px; }

        .stat-card__label {
          position: relative;
          z-index: 2;
          margin-top: 0.65rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
        }
        .stat-card__sub {
          position: relative;
          z-index: 2;
          margin-top: 0.35rem;
          font-size: 0.85rem;
          color: var(--text-secondary, #94a3b8);
        }

        .about-card-right {
          transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .about-card-right:hover {
          box-shadow: 0 20px 50px -20px rgba(168, 85, 247, 0.25);
        }

        @media (prefers-reduced-motion: reduce) {
          .about-heading, .underline-grow, .about-list-item, .tech-chip, .stat-card {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="text-center mb-16 about-heading">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">About Me</span>
        </h2>

        <div className="underline-grow h-1 bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch">
        {/* Left */}
        <div className="w-full lg:w-1/2">
          <div className="card-glass about-card-left p-6 sm:p-8 h-full">
            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
              <span className="text-3xl">👨‍💻</span>
              A little about myself
            </h3>

            <ul ref={listRef} className="space-y-5 text-lg text-[var(--text-secondary)]">
              {bulletItems.map((item, i) => (
                <li
                  key={item.text}
                  className="about-list-item flex items-start gap-4"
                  data-visible={listInView}
                  style={{ transitionDelay: `${i * 110}ms` }}
                >
                  <span className="bullet-icon text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-3">
                Core Stack
              </p>
              <div className="-m-1">
                {techStack.map((tech, i) => (
                  <TechChip
                    key={tech}
                    label={tech}
                    delay={i * 70}
                    isVisible={listInView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2">
          <div className="card-glass about-card-right p-6 sm:p-8 h-full">
            <div ref={statsRef} className="stats-grid">
              <StatCard
                icon="📂"
                value={3}
                label="Projects Built"
                sub="Web & Mobile Applications"
                accent="var(--accent-teal)"
                ringPercent={85}
                delay={0}
                isVisible={statsInView}
              />

              <StatCard
                icon="💻"
                value={10}
                label="Technologies"
                sub="React, Next.js, Flutter, Go & More"
                accent="var(--accent-purple)"
                ringPercent={75}
                delay={120}
                isVisible={statsInView}
              />

              <StatCard
                icon="🚀"
                value={3}
                label="Years Learning"
                sub="Continuously Improving in Software Development"
                accent="var(--accent-gold)"
                ringPercent={60}
                delay={240}
                wide
                isVisible={statsInView}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;