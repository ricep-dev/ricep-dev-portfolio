import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">About Me</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent-teal)] to-[var(--accent-purple)] mx-auto rounded-full"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <div className="card-glass p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white flex items-center gap-3">
              <span className="text-3xl">👨‍💻</span> A little about myself
            </h3>
            <ul className="space-y-4 text-lg text-[var(--text-secondary)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent-gold)]">🚀</span>
                <span>I'm currently building Mobile & Web Applications.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent-teal)]">🌱</span>
                <span>I'm currently learning System Design & Scalable Architecture.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent-purple)]">🎯</span>
                <span>Focus on React, Golang & Flutter.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent-gold)]">💡</span>
                <span>Interested in AI Recommendation System & Backend Engineering.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--accent-teal)]">⚡</span>
                <span>Fun fact: I love building real-world business apps.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <div className="card-glass p-8 h-full flex flex-col justify-center">
             <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="text-4xl font-bold text-[var(--accent-teal)] mb-2">45+</h4>
                  <p className="text-[var(--text-secondary)] text-sm uppercase tracking-wider">GitHub Contributions</p>
                </div>
                <div className="text-center p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <h4 className="text-4xl font-bold text-[var(--accent-purple)] mb-2">3+</h4>
                  <p className="text-[var(--text-secondary)] text-sm uppercase tracking-wider">Years Experience</p>
                </div>
                <div className="text-center p-6 border border-white/5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors col-span-2">
                  <h4 className="text-4xl font-bold text-[var(--accent-gold)] mb-2">8+</h4>
                  <p className="text-[var(--text-secondary)] text-sm uppercase tracking-wider">Real-world Projects</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
