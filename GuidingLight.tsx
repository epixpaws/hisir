import { useEffect, useState } from 'react';

interface GuidingLightProps {
  className?: string;
}

export const GuidingLight = ({ className = "" }: GuidingLightProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Main Guiding Light Orb */}
      <div 
        className={`
          w-32 h-32 rounded-full guiding-light-glow 
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          background: 'var(--gradient-guiding-light)',
          boxShadow: 'var(--shadow-intense-glow)',
        }}
      />
      
      {/* Secondary glow rings */}
      <div 
        className={`
          w-48 h-48 rounded-full border border-guiding-light-glow opacity-30
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          animate-guiding-light-pulse
          transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-30' : 'opacity-0'}
        `}
      />
      
      <div 
        className={`
          w-64 h-64 rounded-full border border-guiding-light-glow opacity-20
          absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          animate-guiding-light-pulse
          transition-opacity duration-1000 delay-500 ${isVisible ? 'opacity-20' : 'opacity-0'}
        `}
        style={{ animationDelay: '1s' }}
      />
      
      {/* Particle effects */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        />
      ))}
    </div>
  );
};