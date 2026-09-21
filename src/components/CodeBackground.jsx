import { useEffect, useRef } from "react";

/**
 * Animasi latar belakang bertema programming (code rain).
 * - Token kode (const, =>, {}, SELECT, func, dll.) jatuh perlahan
 * - Warna mengikuti palet: teal & purple (gold sesekali sebagai highlight)
 * - Aman untuk performa: DPR-aware, pause saat tab tersembunyi,
 *   dan menghormati prefers-reduced-motion
 */

const TOKENS = [
  "const", "let", "=>", "{ }", "( )", "[ ]", "</>", "async", "await",
  "func", "go", "return", "import", "useState", "npm", "git",
  "SELECT", "JOIN", "API", "GET", "POST", "200", "Widget", "build()",
  "0", "1", "&&", "||", "===", ";", "::", "<T>", "err", "nil",
];

const COLORS = [
  [20, 184, 166],  // --accent-teal
  [139, 92, 246],  // --accent-purple
  [20, 184, 166],
  [139, 92, 246],
  [245, 158, 11],  // --accent-gold (jarang muncul)
];

const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function createStream(width, height, fontSize, startAnywhere = true) {
  const len = Math.floor(rand(6, 16));
  return {
    x: Math.floor(rand(0, width / fontSize)) * fontSize,
    y: startAnywhere ? rand(-height, height) : rand(-height * 0.5, 0),
    speed: rand(0.35, 1.1),
    len,
    color: pick(COLORS),
    tokens: Array.from({ length: len }, () => pick(TOKENS)),
    swapTimer: 0,
  };
}

export default function CodeBackground({
  fontSize = 14,
  density = 0.045, // jumlah stream per piksel lebar
  maxOpacity = 0.35,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let streams = [];
    let rafId = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", ui-monospace, monospace`;
      ctx.textBaseline = "top";

      const count = Math.max(12, Math.floor(width * density));
      streams = Array.from({ length: count }, () =>
        createStream(width, height, fontSize)
      );
    };

    const draw = (delta) => {
      ctx.clearRect(0, 0, width, height);
      const lineHeight = fontSize * 1.6;

      for (const s of streams) {
        const [r, g, b] = s.color;

        for (let i = 0; i < s.len; i++) {
          const y = s.y - i * lineHeight;
          if (y < -lineHeight || y > height) continue;

          // kepala stream paling terang, ekor memudar
          const t = 1 - i / s.len;
          const alpha = t * t * maxOpacity;

          if (i === 0) {
            ctx.fillStyle = `rgba(248, 250, 252, ${maxOpacity + 0.2})`;
          } else {
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }
          ctx.fillText(s.tokens[i], s.x, y);
        }

        if (!reduceMotion) {
          s.y += s.speed * delta * 0.06;

          // sesekali ganti token supaya terasa "hidup"
          s.swapTimer += delta;
          if (s.swapTimer > 400) {
            s.tokens[Math.floor(rand(0, s.len))] = pick(TOKENS);
            s.swapTimer = 0;
          }

          // reset saat seluruh stream sudah keluar layar
          if (s.y - s.len * lineHeight > height) {
            Object.assign(s, createStream(width, height, fontSize, false));
          }
        }
      }
    };

    const loop = (now) => {
      const delta = Math.min(now - last, 50);
      last = now;
      draw(delta);
      rafId = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else if (!reduceMotion) {
        last = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    };

    resize();
    draw(0);
    if (!reduceMotion) {
      last = performance.now();
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [fontSize, density, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      style={{
        // redupkan bagian tengah-kiri supaya teks hero tetap terbaca
        WebkitMaskImage:
          "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 45%, #000 100%)",
        maskImage:
          "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 45%, #000 100%)",
      }}
    />
  );
}