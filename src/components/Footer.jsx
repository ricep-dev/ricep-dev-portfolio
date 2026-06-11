import React from "react";
import data from "../data";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[var(--bg-darker)]/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Logo / Name */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter">
              <span className="text-gradient">Ricep</span>.dev
            </h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Building Mobile & Web Applications
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h3 className="text-white font-semibold">Connect with me:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {/* GitHub */}
              <a 
                href="https://github.com/ricep-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#24292F] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(36,41,47,0.4)] group relative"
              >
                <i className="fa-brands fa-github text-white text-lg transition-transform duration-300 group-hover:scale-110"></i>
                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-10">
                  GitHub
                </span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/ricepardiansyah" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#0A66C2] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(10,102,194,0.4)] group relative"
              >
                <i className="fa-brands fa-linkedin-in text-white text-lg transition-transform duration-300 group-hover:scale-110"></i>
                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-10">
                  LinkedIn
                </span>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/r.ardiansyhh_/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(238,42,123,0.4)] group relative"
              >
                <i className="fa-brands fa-instagram text-white text-lg transition-transform duration-300 group-hover:scale-110"></i>
                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-10">
                  Instagram
                </span>
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@r.ardiansyhh_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-black flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(255,255,255,0.15)] group relative"
              >
                <i className="fa-brands fa-tiktok text-white text-lg transition-transform duration-300 group-hover:scale-110"></i>
                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-10">
                  TikTok
                </span>
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/@ricepardiansyah161" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#FF0000] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(255,0,0,0.4)] group relative"
              >
                <i className="fa-brands fa-youtube text-white text-lg transition-transform duration-300 group-hover:scale-110"></i>
                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-10">
                  YouTube
                </span>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/ricep29/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(24,119,242,0.4)] group relative"
              >
                <i className="fa-brands fa-facebook-f text-white text-lg transition-transform duration-300 group-hover:scale-110"></i>
                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-10">
                  Facebook
                </span>
              </a>

              {/* Email */}
              <a 
                href="mailto:ricepardiansyah3@gmail.com" 
                className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#EA4335] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(234,67,53,0.4)] group relative"
              >
                <i className="fa-solid fa-envelope text-white text-lg transition-transform duration-300 group-hover:scale-110"></i>
                <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-950 text-white text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10 shadow-xl pointer-events-none whitespace-nowrap z-10">
                  Email
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/5 text-[var(--text-secondary)]">
          <p>&copy; {new Date().getFullYear()} Ricep Ardiansyah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
