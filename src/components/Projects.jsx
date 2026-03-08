import React from "react";
import { listProyek } from "../data";

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">My Projects</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] mx-auto rounded-full mb-8"></div>
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
          A showcase of my recent work in web and mobile development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listProyek.map((project) => (
          <div 
            key={project.id} 
            className="group card-glass overflow-hidden flex flex-col hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(139,92,246,0.2)] transition-all duration-300"
          >
            {/* Project Image */}
            <div className="relative w-full h-48 overflow-hidden bg-[var(--bg-darker)]">
              <img 
                src={project.gambar} 
                alt={project.nama} 
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-darker)] to-transparent opacity-80 decoration-0"></div>
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
  );
};

export default Projects;
