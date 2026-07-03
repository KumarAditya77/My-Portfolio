import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor Scroll Progress
  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScrollProgress);
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  // Sync Dark/Light theme class triggers
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.style.backgroundColor = '#030712'; // darkbg
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc'; // lightbg
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300`}>
      {/* Premium top scroll indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 z-50 transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Custom Pointer cursor */}
      <CustomCursor />

      {/* Main glass header */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main application layouts */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <CodingProfiles />
        <Contact />
      </main>

      {/* Footer copyright */}
      <Footer />
    </div>
  );
}
