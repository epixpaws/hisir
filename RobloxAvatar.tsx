import { useEffect, useState } from 'react';

export const RobloxAvatar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Avatar appears after 2 seconds as requested
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`
      absolute bottom-20 right-20 transition-all duration-1000
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}>
      <div className="float-swim">
        {/* Avatar placeholder - will be replaced with actual ROBLOX avatar image */}
        <div className="relative">
          <img
            src="https://tr.rbxcdn.com/30DAY-Avatar-40A2D5108B567369811F144431BA2691-Png/352/352/Avatar/Webp/noFilter"
            alt="ROBLOX Avatar Swimming"
            className="w-24 h-24 rounded-lg shadow-glow"
            style={{
              filter: 'drop-shadow(0 0 10px hsl(195 100% 70% / 0.6))'
            }}
          />
          
          {/* Swimming effect particles */}
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-guiding-light-glow rounded-full animate-ping" />
          <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-guiding-light-glow rounded-full animate-ping delay-500" />
          <div className="absolute top-1/2 -left-3 w-1.5 h-1.5 bg-guiding-light-glow rounded-full animate-ping delay-1000" />
        </div>
      </div>
    </div>
  );
};