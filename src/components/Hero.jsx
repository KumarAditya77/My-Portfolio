import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Reusable Magnetic Wrapper Component
function MagneticButton({ children, className = '', onClick }) {
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate distance from center, scale it down slightly
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Limits movement to a max of 20px
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.button>
  );
}

// Particle Canvas Background
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 180 };

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = Math.random() * 2.5 + 1;
        this.density = (Math.random() * 30) + 15;
        this.color = Math.random() > 0.5 ? '#8b5cf6' : '#22d3ee';
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Distance between mouse and particles
        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;

          // Max distance, particles start moving away
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;

          if (distance < mouse.radius) {
            let directionX = forceDirectionX * force * this.density * 0.7;
            let directionY = forceDirectionY * force * this.density * 0.7;
            this.x -= directionX;
            this.y -= directionY;
          } else {
            if (this.x !== this.baseX) {
              let dxBase = this.x - this.baseX;
              this.x -= dxBase / 10;
            }
            if (this.y !== this.baseY) {
              let dyBase = this.y - this.baseY;
              this.y -= dyBase / 10;
            }
          }
        } else {
          if (this.x !== this.baseX) {
            let dxBase = this.x - this.baseX;
            this.x -= dxBase / 10;
          }
          if (this.y !== this.baseY) {
            let dyBase = this.y - this.baseY;
            this.y -= dyBase / 10;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 120);
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const connect = () => {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            opacityValue = (1 - (distance / 110)) * 0.15;
            ctx.strokeStyle = particles[a].color;
            ctx.globalAlpha = opacityValue;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.parentElement.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-40" />;
}

// Custom Typing Text Sub-Component
function TypingAnimation() {
  const roles = [
    'Frontend Developer',
    'React Developer',
    'Full Stack Developer',
    'Software Engineer'
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer;
    const fullText = roles[roleIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000); // Wait 2s before delete
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  return (
    <span className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400">
      {currentText}
      <span className="absolute -right-1.5 md:-right-3 top-0 animate-ping font-extralight text-violet-400">|</span>
    </span>
  );
}

export default function Hero() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 overflow-hidden aurora-container">
      {/* Aurora rotating blurred shape layer */}
      <div className="aurora-bg animate-aurora" />

      {/* Grid overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Interactive physics nodes background */}
      <ParticleCanvas />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Available for Opportunities Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-xs font-semibold uppercase tracking-wider mb-8 dark:border-violet-500/30 dark:bg-violet-950/20 dark:text-violet-400"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Actively Seeking Opportunities</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 font-display"
        >
          <span className="text-slate-700 dark:text-slate-300">Hi, I am </span>
          <br className="sm:hidden" />
          <span className="text-slate-900 dark:text-white text-glow">Kumar Aditya</span>
        </motion.h1>

        {/* Typing Roles Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 h-10 flex items-center justify-center font-display"
        >
          <TypingAnimation />
        </motion.div>

        {/* Short Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10"
        >
          I am a passionate computer science undergrad at Galgotias University. I specialize in building responsive, feature-rich web applications with React, Node.js, and integrating smart AI integrations to solve real-world problems.
        </motion.p>

        {/* Actions Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <MagneticButton
            onClick={() => handleScroll('projects')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-slate-950 bg-gradient-to-r from-violet-400 to-cyan-400 hover:brightness-110 shadow-lg shadow-violet-500/20 flex items-center justify-center space-x-2 transition-all group font-display"
          >
            <span>Explore Projects</span>
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={() => handleScroll('contact')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center space-x-2 transition-all dark:text-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:border-slate-800 font-display"
          >
            <span>Get In Touch</span>
          </MagneticButton>
        </motion.div>

        {/* Social Icons row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center space-x-6 mt-16"
        >
          <a
            href="https://github.com/KumarAditya77"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-cyan-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/kumar-aditya-a04063272/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-violet-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={20} />
          </a>
          <a
            href="mailto:kumaraditya007376@gmail.com"
            className="text-slate-500 hover:text-cyan-400 transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      {/* Decorative floating shapes */}
      <div className="absolute top-[25%] left-[8%] w-24 h-24 rounded-full bg-violet-600/5 dark:bg-violet-600/10 blur-xl animate-float" />
      <div className="absolute bottom-[20%] right-[10%] w-32 h-32 rounded-full bg-cyan-600/5 dark:bg-cyan-600/10 blur-xl animate-float" style={{ animationDelay: '2s' }} />
    </section>
  );
}
