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
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--accent-teal)] flex items-center justify-center transition-all duration-300 group">
                <i className="fa-brands fa-facebook text-white group-hover:text-black transition-colors text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--accent-teal)] flex items-center justify-center transition-all duration-300 group">
                <i className="fa-brands fa-instagram text-white group-hover:text-black transition-colors text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--accent-teal)] flex items-center justify-center transition-all duration-300 group">
                <i className="fa-brands fa-linkedin hover:bg-[#0A66C2] text-white flex items-center justify-center rounded-full  w-full h-full p-0 leading-none"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--accent-teal)] flex items-center justify-center transition-all duration-300 group">
                <i className="fa-brands fa-tiktok text-white group-hover:text-black transition-colors text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--accent-teal)] flex items-center justify-center transition-all duration-300 group">
                <i className="fa-brands fa-youtube text-white group-hover:text-black transition-colors text-lg"></i>
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
