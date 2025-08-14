import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

export const DeathScreenEffects = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate floating particles with underwater characteristics
    const newParticles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 120 - 10, // Some start above the viewport
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      duration: 15 + Math.random() * 20, // Slower movement
      delay: Math.random() * 10,
      drift: (Math.random() - 0.5) * 2 // Horizontal drift
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Underwater depth gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, hsl(210 80% 20% / 0.7) 0%, hsl(210 90% 10% / 0.9) 100%)',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Water caustics pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, transparent 10%, hsl(195 100% 80% / 0.1) 20%, transparent 30%),
            radial-gradient(circle at 80% 70%, transparent 15%, hsl(195 100% 85% / 0.1) 25%, transparent 35%)
          `,
          animation: 'waterCaustics 15s ease-in-out infinite alternate'
        }}
      />

      {/* Floating particles - air bubbles and debris */}
      {particles.map((particle) => {
        const animationName = particle.size > 2 ? 'bubbleRise' : 'floatUp';
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.size > 2 
                ? 'radial-gradient(circle at 30% 30%, white, hsl(195 100% 80% / 0.8))'
                : 'rgba(173, 216, 255, 0.5)',
              opacity: particle.opacity,
              animation: `${animationName} ${particle.duration}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              boxShadow: '0 0 8px hsl(195 100% 85% / 0.6)',
              transform: `translateX(${particle.drift * 100}%)`,
              animationFillMode: 'forwards'
            }}
          />
        );
      })}

      {/* Light rays from surface */}
      <div className="absolute top-0 left-0 w-full h-full">
        {Array.from({ length: 5 }).map((_, i) => {
          const left = 10 + (i * 20);
          return (
            <div
              key={i}
              className="absolute bottom-0 w-px bg-gradient-to-t from-blue-200/10 to-transparent"
              style={{
                left: `${left}%`,
                height: '100%',
                transform: `rotate(${Math.random() * 10 - 5}deg)`,
                animation: 'lightRay 15s ease-in-out infinite',
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.3
              }}
            />
          );
        })}
      </div>

      {/* Surface distortion */}
      <div 
        className="absolute top-0 left-0 w-full h-32"
        style={{
          background: 'linear-gradient(to bottom, hsl(195 100% 85% / 0.1) 0%, transparent 100%)',
          animation: 'surfaceDistortion 8s ease-in-out infinite alternate',
          transform: 'translateY(-50%)',
          filter: 'blur(2px)'
        }}
      />

      {/* Depth vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, hsl(210 90% 5% / 0.8) 80%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};