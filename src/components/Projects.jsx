import React, { useState, useEffect, useCallback } from "react";
import { listProyek } from "../data";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Close modal on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setImageLoaded(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject, handleKeyDown]);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Navigate between projects inside modal
  const navigate = (direction) => {
    const currentIndex = listProyek.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + direction + listProyek.length) % listProyek.length;
    setSelectedProject(listProyek[nextIndex]);
    setImageLoaded(false);
  };

  return (
    <>
      <section id="projects" className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">My Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] mx-auto rounded-full mb-8"></div>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Berikut adalah beberapa contoh karya terbaru saya di bidang pengembangan web dan aplikasi mobile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listProyek.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group card-glass overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all duration-300 cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative w-full h-48 overflow-hidden bg-[var(--bg-darker)]">
                <img
                  src={project.gambar}
                  alt={project.nama}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-darker)] to-transparent opacity-80"></div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-[var(--accent-teal)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm0 0v.01"
                      />
                    </svg>
                    <span className="text-white text-xs font-semibold">Lihat Gambar</span>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[var(--accent-teal)] transition-colors">
                  {project.nama}
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 flex-1 text-sm line-clamp-3">
                  {project.desk}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-[var(--accent-teal)] border border-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== IMAGE MODAL ===== */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: "var(--bg-darker, #0f1117)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
              animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-teal)] flex-shrink-0" />
                <h3 className="text-white font-bold text-base md:text-lg truncate">
                  {selectedProject.nama}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="flex-shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-[var(--text-secondary)] hover:text-white"
                aria-label="Tutup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Area */}
            <div className="relative flex-1 min-h-0 bg-black/40 flex items-center justify-center overflow-hidden">
              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-[var(--accent-teal)]/80 border border-white/10 text-white transition-all duration-200 hover:scale-110"
                aria-label="Sebelumnya"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Image */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/20"
                    style={{
                      borderTopColor: "var(--accent-teal)",
                      animation: "spin 0.8s linear infinite",
                    }}
                  />
                </div>
              )}
              <img
                key={selectedProject.id}
                src={selectedProject.gambar}
                alt={selectedProject.nama}
                onLoad={() => setImageLoaded(true)}
                className="max-w-full max-h-[55vh] w-auto h-auto object-contain transition-opacity duration-300"
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                className="absolute right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 hover:bg-[var(--accent-teal)]/80 border border-white/10 text-white transition-all duration-200 hover:scale-110"
                aria-label="Berikutnya"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Modal Footer - Project Info */}
            <div className="px-5 py-4 border-t border-white/10 flex-shrink-0">
              <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">
                {selectedProject.desk}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-white/10 text-[var(--accent-teal)] border border-white/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Project counter */}
              <p className="text-[var(--text-secondary)] text-xs mt-3 text-right opacity-50">
                {listProyek.findIndex((p) => p.id === selectedProject.id) + 1} / {listProyek.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Projects;