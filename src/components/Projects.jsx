import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { listProyek } from "../data";

const Projects = () => {
  const [activeTool, setActiveTool] = useState("Semua");
  const [selectedId, setSelectedId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const closeButtonRef = useRef(null);
  const lastFocused = useRef(null);

  /* ---------------------------------------------------------------
   * Filter berdasarkan teknologi yang dipakai di lebih dari satu proyek
   * ------------------------------------------------------------- */
  const toolFilters = useMemo(() => {
    const count = new Map();
    listProyek.forEach((project) => {
      (project.tools || []).forEach((tool) => {
        count.set(tool, (count.get(tool) || 0) + 1);
      });
    });

    const shared = [...count.entries()]
      .filter(([, total]) => total > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 6)
      .map(([tool]) => tool);

    return ["Semua", ...shared];
  }, []);

  const visibleProjects = useMemo(() => {
    if (activeTool === "Semua") return listProyek;
    return listProyek.filter((project) =>
      (project.tools || []).includes(activeTool)
    );
  }, [activeTool]);

  const selectedIndex = visibleProjects.findIndex((p) => p.id === selectedId);
  const selectedProject = selectedIndex >= 0 ? visibleProjects[selectedIndex] : null;

  /* ---------------------------------------------------------------
   * Lightbox
   * ------------------------------------------------------------- */
  const openModal = (project) => {
    lastFocused.current = document.activeElement;
    setImageLoaded(false);
    setSelectedId(project.id);
  };

  const closeModal = useCallback(() => {
    setSelectedId(null);
  }, []);

  const goTo = useCallback(
    (step) => {
      if (selectedIndex < 0 || visibleProjects.length < 2) return;
      const next =
        (selectedIndex + step + visibleProjects.length) % visibleProjects.length;
      setImageLoaded(false);
      setSelectedId(visibleProjects[next].id);
    },
    [selectedIndex, visibleProjects]
  );

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
      if (event.key === "ArrowRight") goTo(1);
      if (event.key === "ArrowLeft") goTo(-1);
    };

    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject, closeModal, goTo]);

  // Kembalikan fokus ke kartu yang tadi diklik setelah lightbox ditutup
  useEffect(() => {
    if (!selectedId && lastFocused.current) {
      lastFocused.current.focus?.();
      lastFocused.current = null;
    }
  }, [selectedId]);

  // Muat gambar tetangga lebih dulu supaya perpindahan terasa instan
  useEffect(() => {
    if (selectedIndex < 0) return;
    [-1, 1].forEach((step) => {
      const neighbour =
        visibleProjects[
          (selectedIndex + step + visibleProjects.length) % visibleProjects.length
        ];
      if (neighbour?.gambar) {
        const img = new Image();
        img.src = neighbour.gambar;
      }
    });
  }, [selectedIndex, visibleProjects]);

  return (
    <>
      <section id="projects" className="py-20">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="text-gradient">My Projects</span>
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)]" />
          <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
            Berikut adalah beberapa contoh karya terbaru saya di bidang
            pengembangan web dan aplikasi mobile.
          </p>
        </div>

        {/* Filter teknologi */}
        {toolFilters.length > 1 && (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {toolFilters.map((tool) => {
              const isActive = tool === activeTool;
              return (
                <button
                  key={tool}
                  type="button"
                  onClick={() => setActiveTool(tool)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60 ${
                    isActive
                      ? "border-[var(--accent-teal)]/40 bg-[var(--accent-teal)]/10 text-white"
                      : "border-white/10 bg-white/[0.03] text-[var(--text-secondary)] hover:border-white/20 hover:text-white"
                  }`}
                >
                  {tool}
                </button>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project) => {
            const tools = project.tools || [];
            const shownTools = tools.slice(0, 3);
            const hiddenCount = tools.length - shownTools.length;

            return (
              <article
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => openModal(project)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openModal(project);
                  }
                }}
                aria-label={`Lihat detail proyek ${project.nama}`}
                className="project-card group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1.5 hover:border-[var(--accent-teal)]/30 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60"
              >
                {/* Gambar */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-darker)]">
                  <img
                    src={project.gambar}
                    alt={project.nama}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--bg-darker)] via-[var(--bg-darker)]/50 to-transparent" />

                  {/* Petunjuk buka lightbox */}
                  <div className="absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 9V5a1 1 0 011-1h4M20 9V5a1 1 0 00-1-1h-4M4 15v4a1 1 0 001 1h4M20 15v4a1 1 0 01-1 1h-4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3 className="mb-2 text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[var(--accent-teal)]">
                    {project.nama}
                  </h3>
                  <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {project.desk}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-4">
                    {shownTools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-[var(--accent-teal)]"
                      >
                        {tool}
                      </span>
                    ))}
                    {hiddenCount > 0 && (
                      <span className="text-xs text-[var(--text-secondary)]">
                        +{hiddenCount} lainnya
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {visibleProjects.length === 0 && (
          <p className="py-16 text-center text-[var(--text-secondary)]">
            Belum ada proyek dengan teknologi ini. Pilih filter lain untuk
            melihat karya yang tersedia.
          </p>
        )}
      </section>

      {/* ===== LIGHTBOX ===== */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.nama}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 modal-fade"
        >
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="modal-panel relative z-10 flex max-h-[90dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--bg-darker,#0f1117)] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="min-w-0">
                <h3 className="truncate text-base font-bold text-white md:text-lg">
                  {selectedProject.nama}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                  Proyek {selectedIndex + 1} dari {visibleProjects.length}
                  {activeTool !== "Semua" && ` · ${activeTool}`}
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Tutup"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-[var(--text-secondary)] transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
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

            {/* Area gambar */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/50 p-4">
              {!imageLoaded && (
                <div
                  className="absolute h-8 w-8 rounded-full border-2 border-white/15"
                  style={{
                    borderTopColor: "var(--accent-teal)",
                    animation: "modalSpin 0.8s linear infinite",
                  }}
                />
              )}

              <img
                key={selectedProject.id}
                src={selectedProject.gambar}
                alt={selectedProject.nama}
                onLoad={() => setImageLoaded(true)}
                className="max-h-[52dvh] w-auto max-w-full rounded-lg object-contain transition-opacity duration-300"
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />

              {visibleProjects.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label="Proyek sebelumnya"
                    className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors duration-200 hover:border-[var(--accent-teal)]/50 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label="Proyek berikutnya"
                    className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-sm transition-colors duration-200 hover:border-[var(--accent-teal)]/50 hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Footer: deskripsi, tools, dan strip thumbnail */}
            <div className="shrink-0 overflow-y-auto border-t border-white/10 px-5 py-4">
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {selectedProject.desk}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {(selectedProject.tools || []).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-[var(--accent-teal)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {visibleProjects.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {visibleProjects.map((project) => {
                    const isCurrent = project.id === selectedProject.id;
                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => {
                          if (isCurrent) return;
                          setImageLoaded(false);
                          setSelectedId(project.id);
                        }}
                        aria-label={project.nama}
                        aria-current={isCurrent ? "true" : undefined}
                        className={`h-12 w-20 shrink-0 overflow-hidden rounded-md border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]/60 ${
                          isCurrent
                            ? "border-[var(--accent-teal)] opacity-100"
                            : "border-white/10 opacity-45 hover:opacity-90"
                        }`}
                      >
                        <img
                          src={project.gambar}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover object-top"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-fade {
          animation: modalFade 200ms ease both;
        }
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-panel {
          animation: modalPanel 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes modalPanel {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes modalSpin {
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .modal-fade,
          .modal-panel { animation: none; }
          .project-card { transition: none; }
        }
      `}</style>
    </>
  );
};

export default Projects;