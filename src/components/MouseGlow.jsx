import { useState, useRef } from 'react';

export default function MouseGlow({ children, className = '' }) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden group mouse-glow-card ${className}`}
    >
      {/* Spotlight blur layer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(139, 92, 246, 0.09), rgba(59, 130, 246, 0.04) 40%, transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
