import React from "react";
import { listTools } from "../data";

const TechStack = () => {
  return (
    <section id="skills" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Tech Stack</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] mx-auto rounded-full mb-8"></div>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
          Here are the tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {listTools.map((tool) => (
          <div 
            key={tool.id} 
            className="group relative flex flex-col items-center p-6 card-glass hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(20,184,166,0.2)]"
          >
            <div className="w-16 h-16 mb-4 relative z-10 flex items-center justify-center">
              {/* Tool image */}
              <img 
                src={tool.gambar} 
                alt={tool.nama} 
                className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-sm font-semibold text-white text-center select-none group-hover:text-[var(--accent-teal)] transition-colors">
              {tool.nama}
            </h3>
            <span className="text-xs text-[var(--text-secondary)] mt-1 select-none text-center">
               {tool.ket}
            </span>
            
            {/* Hover Glow Behind */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-teal)] to-[var(--accent-purple)] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
