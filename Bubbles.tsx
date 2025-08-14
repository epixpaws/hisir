import { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  opacity: number;
}

export const Bubbles = ({ count = 20 }: { count?: number }) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate initial bubbles - smaller size range and fewer bubbles
    const initialBubbles = Array.from({ length: Math.floor(count * 0.7) }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 2, // 2px to 7px
      left: Math.random() * 100, // 0% to 100%
      delay: Math.random() * 5, // 0s to 5s
      duration: Math.random() * 15 + 15, // 15s to 30s (slower movement)
      opacity: Math.random() * 0.2 + 0.05, // 0.05 to 0.25 (more subtle)
    }));
    setBubbles(initialBubbles);

    // Add some dynamic bubbles over time
    const interval = setInterval(() => {
      setBubbles(prev => {
        // Remove some bubbles randomly (less frequent removal)
        const filtered = prev.filter(() => Math.random() > 0.05);
        // Add new bubbles if needed (fewer total bubbles)
        if (filtered.length < count * 0.8) {
          return [
            ...filtered,
            {
              id: Date.now() + Math.random(),
              size: Math.random() * 5 + 2, // 2px to 7px
              left: Math.random() * 100,
              delay: 0,
              duration: Math.random() * 15 + 15, // 15s to 30s
              opacity: Math.random() * 0.2 + 0.05, // 0.05 to 0.25
            },
          ];
        }
        return filtered;
      });
    }, 2000); // Check less frequently

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: '0',
            opacity: bubble.opacity,
            animation: `bubbleRise ${bubble.duration}s ease-in infinite`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: '0 0 5px 1px rgba(173, 216, 255, 0.8)',
            transform: 'translateY(100%)',
          }}
        >
          {/* Inner glow */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 30% 30%, white 0%, transparent 60%)',
              opacity: 0.5
            }}
          />
        </div>
      ))}
    </div>
  );
};
