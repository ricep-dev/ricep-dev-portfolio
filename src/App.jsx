import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Certifications from "./components/Certifications";

function App() {
  return (
    <div className="bg-[var(--bg-dark)] min-h-screen font-sans">
      <Navbar />
      <main className="container mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}

export default App;
