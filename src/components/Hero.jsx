import React from "react";
import { ArrowRight, FileText, Mail } from "lucide-react";
import data from "../data";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-12"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full gap-12">
        {/* ================= Text Content ================= */}
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
            A passionate developer specializing in React, Golang, and Flutter.
            Passionate about building scalable web & mobile applications with a
            strong interest in AI Recommendation Systems and Backend Engineering.
          </p>

          {/* ================= Buttons ================= */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            {/* View My Work */}
            <a
              href="#projects"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-8
                py-3.5
                rounded-full
                bg-gradient-to-r
                from-[var(--accent-teal)]
                to-[var(--accent-purple)]
                text-white
                font-semibold
                shadow-lg
                hover:shadow-cyan-500/30
                hover:scale-105
                transition-all
                duration-300
                w-full
                sm:w-auto
              "
            >
              View My Work
              <ArrowRight size={18} />
            </a>

            {/* View CV */}
            <a
              href="https://drive.google.com/file/d/172uojvOvSwyHaouvJObOBdeA26ycQvcU/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-8
                py-3.5
                rounded-full
                border
                border-cyan-400/30
                bg-white/5
                backdrop-blur-md
                text-white
                font-semibold
                hover:bg-cyan-500/10
                hover:border-cyan-400
                hover:scale-105
                transition-all
                duration-300
                w-full
                sm:w-auto
              "
            >
              <FileText size={18} />
              View CV
            </a>

            {/* Contact Me */}
            <a
              href="mailto:ricepardiansyah3@gmail.com"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-8
                py-3.5
                rounded-full
                border
                border-white/20
                bg-white/5
                backdrop-blur-md
                text-white
                font-semibold
                hover:bg-white/10
                hover:border-white/40
                hover:scale-105
                transition-all
                duration-300
                w-full
                sm:w-auto
              "
            >
              <Mail size={18} />
              Contact Me
            </a>
          </div>
        </div>

        {/* ================= Image ================= */}
        <div className="w-full lg:w-2/5 flex justify-center relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent-teal)] to-[var(--accent-purple)] rounded-full blur-3xl opacity-20 animate-pulse"></div>

          {/* Profile Image */}
          <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 rounded-full p-2 border-2 border-white/10 bg-[var(--bg-darker)] shadow-2xl overflow-hidden flex items-center justify-center">
            <img
              src={data.HeroImage}
              alt="Ricep Ardiansyah"
              className="w-full h-full object-cover object-top rounded-full"
              style={{ imageRendering: "high-quality" }}
              onError={(e) => {
                e.target.src =
                  "https://ui-avatars.com/api/?name=Ricep+Ardiansyah&background=0D8ABC&color=fff&size=512";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;