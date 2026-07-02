import React, { useState, useEffect, useCallback } from "react";
import { listCertifications } from "../data";

const Certifications = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Close modal with ESC
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setSelectedCertificate(null);
    }
  }, []);

  useEffect(() => {
    if (selectedCertificate) {
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
  }, [selectedCertificate, handleKeyDown]);

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  const navigate = (direction) => {
    const currentIndex = listCertifications.findIndex(
      (item) => item.id === selectedCertificate.id
    );

    const nextIndex =
      (currentIndex + direction + listCertifications.length) %
      listCertifications.length;

    setSelectedCertificate(listCertifications[nextIndex]);
    setImageLoaded(false);
  };

  return (
    <>
      <section id="certifications" className="py-20">

        {/* Section Header */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">
              My Certifications
            </span>
          </h2>

          <div className="w-24 h-1 rounded-full bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] mx-auto mb-8"></div>

          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Berikut adalah beberapa sertifikasi yang saya peroleh
            sebagai bukti kompetensi dalam bidang pengembangan web,
            mobile, dan software engineering.
          </p>

        </div>

        {/* Card Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {listCertifications.map((certificate) => (

            <div
              key={certificate.id}
              onClick={() => openModal(certificate)}
              className="
                group
                card-glass
                overflow-hidden
                flex
                flex-col
                cursor-pointer
                hover:-translate-y-2
                hover:shadow-[0_10px_30px_rgba(20,184,166,0.25)]
                transition-all
                duration-300
              "
            >

              {/* Image */}

              <div className="relative h-52 overflow-hidden bg-[var(--bg-darker)]">

                {/* Badge */}

                <div className="absolute top-4 right-4 z-20">

                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-emerald-500/20
                      border
                      border-emerald-400/30
                      text-emerald-300
                      text-xs
                      font-semibold
                      backdrop-blur-md
                    "
                  >
                    ✓ Verified
                  </span>

                </div>

                <img
                  src={certificate.gambar}
                  alt={certificate.nama}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-darker)] to-transparent opacity-70"></div>

                {/* Hover */}

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                  "
                >

                  <div
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-black/60
                      backdrop-blur-md
                      border
                      border-white/10
                    "
                  >

                    <span className="text-white text-sm font-semibold">
                      View Certificate
                    </span>

                  </div>

                </div>

              </div>

              {/* Content */}

              <div className="p-6 flex flex-col flex-1">

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-teal)] transition-colors">

                  {certificate.nama}

                </h3>

                <p className="text-sm text-[var(--accent-teal)] font-medium mb-3">

                  {certificate.issuer}

                </p>

                <p className="text-[var(--text-secondary)] text-sm flex-1 line-clamp-3 mb-6">

                  {certificate.desk}

                </p>

                {/* Skill */}

                <div className="flex flex-wrap gap-2 mt-auto">

                  {certificate.skills.map((skill, index) => (

                    <span
                      key={index}
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-white/10
                        border
                        border-white/5
                        text-xs
                        font-semibold
                        text-[var(--accent-teal)]
                      "
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ========================= MODAL ========================= */}
      {selectedCertificate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ animation: "fadeIn .25s ease" }}
        >
          {/* Backdrop */}
          <div
            onClick={closeModal}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl flex flex-col"
            style={{
              background: "var(--bg-darker, #0f1117)",
              border: "1px solid rgba(255,255,255,.08)",
              boxShadow: "0 25px 60px rgba(0,0,0,.7)",
              animation: "slideUp .35s cubic-bezier(.34,1.56,.64,1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">

              <div className="flex items-center gap-3">

                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>

                <div>
                  <h3 className="text-white font-bold text-lg">
                    {selectedCertificate.nama}
                  </h3>

                  <p className="text-sm text-[var(--accent-teal)]">
                    {selectedCertificate.issuer}
                  </p>
                </div>

              </div>

              <button
                onClick={closeModal}
                className="
                  w-9
                  h-9
                  rounded-full
                  hover:bg-white/10
                  transition
                  flex
                  items-center
                  justify-center
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

            </div>

            {/* Image Area */}

            <div className="relative flex-1 flex items-center justify-center bg-black/40 overflow-hidden">

              {/* Prev */}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(-1);
                }}
                className="
                  absolute
                  left-4
                  z-20
                  w-11
                  h-11
                  rounded-full
                  bg-black/60
                  border
                  border-white/10
                  hover:bg-[var(--accent-teal)]
                  transition
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Loading */}

              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">

                  <div
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                    style={{
                      borderTopColor: "#14b8a6",
                      animation: "spin .8s linear infinite",
                    }}
                  />

                </div>
              )}

              {/* Image */}

              <img
                key={selectedCertificate.id}
                src={selectedCertificate.gambar}
                alt={selectedCertificate.nama}
                onLoad={() => setImageLoaded(true)}
                className="
                  max-w-full
                  max-h-[55vh]
                  object-contain
                  transition-opacity
                  duration-300
                "
                style={{
                  opacity: imageLoaded ? 1 : 0,
                }}
              />

              {/* Next */}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(1);
                }}
                className="
                  absolute
                  right-4
                  z-20
                  w-11
                  h-11
                  rounded-full
                  bg-black/60
                  border
                  border-white/10
                  hover:bg-[var(--accent-teal)]
                  transition
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

            </div>

            {/* Footer */}

            <div className="border-t border-white/10 p-5">

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  mb-3
                  px-3
                  py-1
                  rounded-full
                  bg-emerald-500/20
                  border
                  border-emerald-500/30
                  text-emerald-300
                  text-xs
                  font-semibold
                "
              >
                ✓ Verified Certificate
              </span>

              <p className="text-[var(--text-secondary)] text-sm mb-4">
                {selectedCertificate.desk}
              </p>

              {/* Skills */}

              <div className="flex flex-wrap gap-2 mb-5">

                {selectedCertificate.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-white/10
                      border
                      border-white/5
                      text-xs
                      font-semibold
                      text-[var(--accent-teal)]
                    "
                  >
                    {skill}
                  </span>

                ))}

              </div>

              {/* Bottom */}

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

                <p className="text-xs opacity-60 text-[var(--text-secondary)]">
                  {listCertifications.findIndex(
                    (item) => item.id === selectedCertificate.id
                  ) + 1}
                  {" / "}
                  {listCertifications.length}
                </p>

                <a
                  href={selectedCertificate.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-6
                    py-2.5
                    rounded-full
                    bg-gradient-to-r
                    from-[var(--accent-teal)]
                    to-[var(--accent-purple)]
                    text-white
                    font-semibold
                    hover:scale-105
                    transition-all
                  "
                >
                  View Credential
                </a>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================= Animations ================= */}

      <style>{`
        @keyframes fadeIn{
          from{opacity:0;}
          to{opacity:1;}
        }

        @keyframes slideUp{
          from{
            opacity:0;
            transform:translateY(25px) scale(.97);
          }
          to{
            opacity:1;
            transform:translateY(0) scale(1);
          }
        }

        @keyframes spin{
          to{
            transform:rotate(360deg);
          }
        }
      `}</style>

    </>
  );
};

export default Certifications;