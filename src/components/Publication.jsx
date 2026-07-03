// src/components/Publication.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  BookOpenText,
  Users,
  CalendarDays,
  Link2,
  FileDown,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Newspaper,
  Fingerprint,
  Quote,
} from "lucide-react";
import { listPublications } from "../data";

/* -------------------------------------------------------------------------- */
/*  Small presentational pieces                                               */
/* -------------------------------------------------------------------------- */

const PublishedBadge = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 backdrop-blur-sm">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>
    Published
  </span>
);

const KeywordChip = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors duration-300 hover:border-cyan-400/30 hover:text-cyan-300">
    {children}
  </span>
);

const MetaItem = ({ icon: Icon, children, className = "" }) => (
  <div className={`flex items-center gap-1.5 text-slate-400 ${className}`}>
    <Icon className="h-3.5 w-3.5 shrink-0 text-slate-500" />
    <span className="truncate">{children}</span>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Stat cards                                                                */
/* -------------------------------------------------------------------------- */

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_16px_40px_-15px_rgba(56,189,248,0.3)]">
    <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-xl transition-opacity duration-500 group-hover:opacity-80" />
    <div className="relative flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 text-cyan-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xl font-bold leading-tight text-slate-50 sm:text-2xl">{value}</p>
        <p className="truncate text-xs font-medium uppercase tracking-wider text-slate-500">
          {label}
        </p>
      </div>
    </div>
  </div>
);

const StatsRow = ({ publications }) => {
  const publishedCount = publications.length;
  const journalCount = new Set(publications.map((p) => p.publisher).filter(Boolean)).size;
  const doiCount = publications.filter((p) => p.doi).length;
  const citationCount = publications.reduce((acc, p) => acc + (Number(p.citations) || 0), 0);

  const stats = [
    { icon: GraduationCap, label: "Published Papers", value: publishedCount },
    { icon: Newspaper, label: "Journals", value: journalCount },
    { icon: Fingerprint, label: "DOI Indexed", value: doiCount },
    { icon: Quote, label: "Citations", value: citationCount.toLocaleString() },
  ];

  return (
    <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:mt-14 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Grid card                                                                 */
/* -------------------------------------------------------------------------- */

const PublicationCard = ({ publication, index, onOpen }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      style={{ animationDelay: `${index * 90}ms` }}
      className="publication-card group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] text-left backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-cyan-400/30 hover:shadow-[0_20px_60px_-15px_rgba(56,189,248,0.35)] animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
    >
      {/* gradient accent glow on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10" />
      </div>

      {/* Cover image — enlarged for clarity */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-800/60 sm:h-64">
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-700/50 via-slate-800/50 to-slate-700/50" />
        )}
        <img
          src={publication.gambar}
          alt={publication.judul}
          onLoad={() => setImgLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
        <div className="absolute left-4 top-4">
          <PublishedBadge />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold leading-snug text-slate-100 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300">
          {publication.judul}
        </h3>

        <div className="space-y-1.5 text-sm">
          <MetaItem icon={BookOpenText} className="text-slate-300">
            {publication.publisher}
          </MetaItem>
          <MetaItem icon={Users} className="text-xs">
            {publication.authors?.join(", ")}
          </MetaItem>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span>{publication.volume}</span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {publication.tahun}
            </span>
          </div>
        </div>

        <p className="flex items-center gap-1.5 truncate text-xs text-cyan-400/80">
          <Link2 className="h-3 w-3 shrink-0" />
          {publication.doi}
        </p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {publication.keywords.slice(0, 3).map((kw) => (
            <KeywordChip key={kw}>{kw}</KeywordChip>
          ))}
          {publication.keywords.length > 3 && (
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400">
              +{publication.keywords.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* bottom gradient line on hover */}
      <div className="h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </button>
  );
};

/* -------------------------------------------------------------------------- */
/*  Featured layout — used when there is exactly one publication              */
/* -------------------------------------------------------------------------- */

const FeaturedPublicationCard = ({ publication, onOpen }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_25px_70px_-15px_rgba(56,189,248,0.3)] animate-[fadeSlideUp_0.6s_ease_forwards] opacity-0">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10" />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Cover image */}
        <div className="relative h-72 w-full overflow-hidden bg-slate-800/60 sm:h-80 lg:h-auto lg:w-2/5">
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-700/50 via-slate-800/50 to-slate-700/50" />
          )}
          <img
            src={publication.gambar}
            alt={publication.judul}
            onLoad={() => setImgLoaded(true)}
            className={`h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute left-5 top-5">
            <PublishedBadge />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8 lg:p-10">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan-300/80">
              Featured Publication
            </span>
            <h3 className="text-xl font-bold leading-snug text-slate-50 sm:text-2xl">
              {publication.judul}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
            <MetaItem icon={BookOpenText} className="text-slate-300">
              {publication.publisher}
            </MetaItem>
            <MetaItem icon={CalendarDays} className="text-slate-300">
              {publication.volume} &middot; {publication.tahun}
            </MetaItem>
            <MetaItem icon={Users} className="text-slate-300 sm:col-span-2">
              {publication.authors?.join(", ")}
            </MetaItem>
            <a
              href={publication.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-cyan-400 transition-colors hover:text-cyan-300 sm:col-span-2"
            >
              <Link2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate underline-offset-4 hover:underline">{publication.doi}</span>
            </a>
          </div>

          {publication.abstract && (
            <p className="line-clamp-4 text-sm leading-relaxed text-slate-400">
              {publication.abstract}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5">
            {publication.keywords.map((kw) => (
              <KeywordChip key={kw}>{kw}</KeywordChip>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
            <a
              href={publication.doi}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="h-4 w-4" />
              View Journal
            </a>
            <a
              href={publication.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <FileDown className="h-4 w-4" />
              Download PDF
            </a>
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-slate-400 transition-all duration-300 hover:border-cyan-400/30 hover:text-cyan-300"
            >
              Full Details
            </button>
          </div>
        </div>
      </div>

      <div className="h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-purple-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Modal                                                                     */
/* -------------------------------------------------------------------------- */

const PublicationModal = ({ publications, activeIndex, onClose, onNavigate }) => {
  const publication = publications[activeIndex];
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate]);

  if (!publication) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={publication.judul}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-[fadeIn_0.3s_ease_forwards]"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-[modalSlideUp_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-red-400/40 hover:text-red-300"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Prev / Next */}
        {publications.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Previous publication"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:text-cyan-300 sm:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Next publication"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-900/70 text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-purple-400/40 hover:text-purple-300 sm:right-16"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Scrollable content */}
        <div className="overflow-y-auto">
          {/* Cover — enlarged for clarity */}
          <div className="relative h-64 w-full overflow-hidden sm:h-80">
            <img
              src={publication.gambar}
              alt={publication.judul}
              className="h-full w-full object-cover animate-[fadeIn_0.5s_ease_forwards]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute left-5 top-5">
              <PublishedBadge />
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="space-y-3">
              <h2 className="text-xl font-bold leading-tight text-slate-50 sm:text-2xl">
                {publication.judul}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-400">
                <MetaItem icon={BookOpenText} className="text-slate-300">
                  {publication.publisher}
                </MetaItem>
                <MetaItem icon={CalendarDays}>{publication.volume} &middot; {publication.tahun}</MetaItem>
              </div>
              <a
                href={publication.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-cyan-400 underline-offset-4 transition-colors hover:text-cyan-300 hover:underline"
              >
                <Link2 className="h-3.5 w-3.5" />
                {publication.doi}
              </a>
            </div>

            {/* Authors */}
            <div>
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Users className="h-3.5 w-3.5" />
                Authors
              </h4>
              <div className="flex flex-wrap gap-2">
                {publication.authors.map((author) => (
                  <span
                    key={author}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300"
                  >
                    {author}
                  </span>
                ))}
              </div>
            </div>

            {/* Abstract */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Abstract
              </h4>
              <p className="text-sm leading-relaxed text-slate-300">{publication.abstract}</p>
            </div>

            {/* Keywords */}
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {publication.keywords.map((kw) => (
                  <KeywordChip key={kw}>{kw}</KeywordChip>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href={publication.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink className="h-4 w-4" />
                View Journal
              </a>
              <a
                href={publication.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <FileDown className="h-4 w-4" />
                Download PDF
              </a>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-slate-400 transition-all duration-300 hover:border-red-400/30 hover:text-red-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Main section                                                              */
/* -------------------------------------------------------------------------- */

const Publication = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const openModal = useCallback((index) => setActiveIndex(index), []);
  const closeModal = useCallback(() => setActiveIndex(null), []);

  const navigate = useCallback((direction) => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      const total = listPublications.length;
      return (prev + direction + total) % total;
    });
  }, []);

  const isSingle = listPublications.length === 1;

  return (
    <section
      id="publications"
      className="relative overflow-hidden bg-slate-950 py-24 sm:py-32"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center animate-[fadeSlideUp_0.7s_ease_forwards]">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-cyan-300/90 backdrop-blur-sm">
            Research &amp; Writing
          </span>
          <h2 className="mt-5 bg-gradient-to-r from-slate-50 via-slate-100 to-slate-300 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Publications
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            A collection of my scientific publications, research papers, and
            academic contributions in software engineering, mobile
            development, artificial intelligence, and recommendation
            systems.
          </p>
        </div>

        {/* Stats */}
        {listPublications.length > 0 && <StatsRow publications={listPublications} />}

        {/* Content */}
        {listPublications.length > 0 ? (
          isSingle ? (
            <FeaturedPublicationCard
              publication={listPublications[0]}
              onOpen={() => openModal(0)}
            />
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {listPublications.map((publication, index) => (
                <PublicationCard
                  key={publication.id}
                  publication={publication}
                  index={index}
                  onOpen={openModal}
                />
              ))}
            </div>
          )
        ) : (
          <div className="mt-16 rounded-xl border border-white/10 bg-white/[0.03] p-12 text-center text-sm text-slate-500 backdrop-blur-xl">
            No publications yet. Check back soon.
          </div>
        )}
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <PublicationModal
          publications={listPublications}
          activeIndex={activeIndex}
          onClose={closeModal}
          onNavigate={navigate}
        />
      )}

      {/* Keyframes (scoped via Tailwind arbitrary animate-[] utilities above) */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Publication;