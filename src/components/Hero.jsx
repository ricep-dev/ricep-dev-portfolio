import React from "react";
import data from "../data";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-12">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-12">
        
        {/* Text Content */}
        <div className="w-full lg:w-3/5 text-center lg:text-left space-y-6">
          <p className="text-[var(--accent-gold)] font-medium tracking-wide uppercase">
            Welcome to my portfolio
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Hi, I'm <br />
            <span className="text-gradient">Ricep Ardiansyah</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300 font-semibold">
            Building Mobile & Web Applications
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto lg:mx-0">
            A passionate developer focusing on React, Golang & Flutter. Interested in 
            AI Recommendation Systems & Backend Engineering.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <a 
              href="#projects" 
              className="px-8 py-3 rounded-full bg-[var(--accent-teal)] text-[#020617] font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 shadow-[0_0_15px_rgba(20,184,166,0.3)] w-full sm:w-auto"
            >
              View My Work
            </a>
            <a 
              href="mailto:ricepardiansyah3@gmail.com" 
              className="px-8 py-3 rounded-full border border-white/20 hover:border-white/50 text-white font-semibold transition-all w-full sm:w-auto hover:bg-white/5"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-2/5 flex justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-teal)] to-[var(--accent-purple)] rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 rounded-full p-2 border-2 border-white/10 bg-[var(--bg-darker)] shadow-2xl overflow-hidden flex items-center justify-center">
             {/* Using the image from data.js, fallback to a placeholder if it fails */}
             <img 
               src={data.HeroImage} 
               alt="Ricep Ardiansyah" 
               className="w-full h-full object-cover object-top rounded-full"
               style={{ imageRendering: "high-quality" }}
               onError={(e) => {
                 e.target.src = "https://ui-avatars.com/api/?name=Ricep+Ardiansyah&background=0D8ABC&color=fff&size=512";
               }}
             />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
