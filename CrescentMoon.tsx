import { useEffect, useState } from 'react';

interface CrescentMoonProps {
  className?: string;
}

export const CrescentMoon = ({ className = "" }: CrescentMoonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Generate random crater positions and sizes
  const generateCraters = (count: number, maxSize: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * maxSize + 2,
      x: Math.random() * 80 + 10, // 10-90% of container
      y: Math.random() * 80 + 10, // 10-90% of container
      opacity: Math.random() * 0.3 + 0.1,
      blur: Math.random() * 3 + 1
    }));
  };

  const craters = generateCraters(15, 8);
  const smallCraters = generateCraters(25, 4);

  return (
    <div className={`relative ${className}`}>
      {/* Large underwater light spread */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, hsl(195 100% 85% / 0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'scale(5)',
          opacity: isVisible ? 0.7 : 0,
          transition: 'opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 0,
          animation: 'pulseLight 8s ease-in-out infinite',
          willChange: 'opacity, transform',
        }}
      />
      
      {/* Subtle light rays */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, hsl(195 100% 90% / 0.03) 100%)',
          opacity: isVisible ? 0.8 : 0,
          transition: 'opacity 2s ease-in-out',
          zIndex: 0,
          filter: 'blur(20px)',
          transform: 'scale(3)'
        }}
      />
      
      <div 
        className={`
          w-24 h-24 md:w-32 md:h-32 relative z-10
          transition-all duration-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Moon glow - outer halo */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(195 100% 90% / 0.25) 0%, transparent 70%)',
            transform: 'scale(2.8)',
            filter: 'blur(30px)',
            animation: 'pulse 4s ease-in-out infinite',
            opacity: 0.9,
            willChange: 'opacity, transform',
          }}
        />
        
        {/* Secondary glow */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(195 100% 95% / 0.15) 0%, transparent 60%)',
            transform: 'scale(2.2)',
            filter: 'blur(15px)',
            animation: 'pulse 5s ease-in-out infinite 0.5s',
            opacity: 0.7,
            willChange: 'opacity, transform',
          }}
        />

        {/* Moon surface with realistic texture */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #e6e6e6, #b3b3b3)',
            boxShadow: 'inset 8px 8px 15px rgba(0,0,0,0.3)',
            transform: 'rotate(-15deg)'
          }}
        >
          {/* Moon craters */}
          {[...craters, ...smallCraters].map((crater) => (
            <div
              key={crater.id}
              className="absolute rounded-full bg-gray-700 opacity-30"
              style={{
                width: `${crater.size}%`,
                height: `${crater.size}%`,
                left: `${crater.x}%`,
                top: `${crater.y}%`,
                transform: 'translate(-50%, -50%)',
                opacity: crater.opacity,
                filter: `blur(${crater.blur}px)`,
                boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.5)'
              }}
            />
          ))}
          
          {/* Moon phase (crescent) */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 50%, transparent 40%, #0f172a 42%)',
              boxShadow: '0 0 20px 5px rgba(79, 70, 229, 0.2)'
            }}
          />
          
          {/* Subtle texture overlay */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.05) 50%),
                linear-gradient(-45deg, transparent 50%, rgba(0,0,0,0.05) 50%)
              `,
              backgroundSize: '20px 20px',
              mixBlendMode: 'overlay',
              opacity: 0.5
            }}
          />
        </div>
        {/* Moon glow - middle layer */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(195 100% 90% / 0.4) 0%, transparent 60%)',
            transform: 'scale(1.8)',
            filter: 'blur(15px)'
          }}
        />

        {/* Moon base circle */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 30% 30%, hsl(195 100% 95%), hsl(200 90% 75%))',
            boxShadow: `
              0 0 80px hsl(195 100% 80% / 0.8),
              0 0 160px hsl(195 100% 70% / 0.6),
              inset -5px -5px 5px hsl(220 30% 8% / 0.3)
            `,
            filter: 'blur(0.8px)'
          }}
        >
          {/* Water reflection effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 40% 40%, hsl(195 100% 100% / 0.2), transparent 60%)',
              animation: 'waterReflection 8s ease-in-out infinite'
            }}
          />
        </div>
        
        {/* Moon surface details */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 70% 30%, transparent 10%, hsl(195 100% 95% / 0.25) 10.5%, transparent 11%),
              radial-gradient(circle at 60% 50%, transparent 15%, hsl(195 100% 95% / 0.2) 15.5%, transparent 16%),
              radial-gradient(circle at 40% 60%, transparent 12%, hsl(195 100% 95% / 0.22) 12.5%, transparent 13%)
            `,
            backgroundSize: '100% 100%',
            filter: 'blur(0.8px)'
          }}
        />
        
        {/* Water caustics effect */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(
                45deg,
                transparent 48%,
                hsl(195 100% 95% / 0.15) 49%,
                hsl(195 100% 95% / 0.15) 51%,
                transparent 52%
              ),
              linear-gradient(
                -45deg,
                transparent 48%,
                hsl(195 100% 95% / 0.15) 49%,
                hsl(195 100% 95% / 0.15) 51%,
                transparent 52%
              )
            `,
            backgroundSize: '25px 25px',
            opacity: '0.7',
            animation: 'waterCaustics 12s linear infinite',
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Floating particles in water */}
        <div 
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, transparent 5px, transparent 5px),
              radial-gradient(circle at 80% 30%, transparent 3px, transparent 3px),
              radial-gradient(circle at 40% 70%, transparent 4px, transparent 4px)
            `,
            backgroundSize: '100% 100%',
            opacity: '0.6',
            filter: 'blur(0.5px)',
            animation: 'floatSwim 15s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  );
};