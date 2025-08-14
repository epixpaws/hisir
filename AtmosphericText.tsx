import { useEffect, useState } from 'react';

// First two messages are fixed, the rest will be randomized
const fixedMessages = [
  "The developers work tirelessly in the shadows...",
  "This website is still under development..."
];

const randomMessages = [
  "The light guides you through the darkness...",
  "Your journey continues beyond this realm...",
  "Patience... the path will reveal itself...",
  "Soon, this digital sanctuary will be complete...",
  "In the depths of code, mysteries unfold...",
  "The moon's glow illuminates the way forward...",
  "Echoes of creation ripple through the void...",
  "Time flows differently in this digital expanse...",
  "The interface between dreams and reality blurs...",
  "Whispers of the cosmos carry ancient secrets...",
  "Each pixel tells a story waiting to be discovered...",
  "The cosmic dance of ones and zeros continues..."
];

// Shuffle the random messages
const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const atmosphericMessages = [...fixedMessages, ...shuffleArray(randomMessages)];

export const AtmosphericText = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before showing first message
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Set up the interval for changing messages
      const timer = setInterval(() => {
        // Fade out
        setIsVisible(false);
        
        // After fade out completes, change message and fade in
        setTimeout(() => {
          setCurrentMessageIndex(prev => (prev + 1) % atmosphericMessages.length);
          
          // Small delay before starting fade in
          setTimeout(() => {
            setIsVisible(true);
          }, 50);
          
        }, 1000); // Wait for fade out to complete
        
      }, 7000); // Total cycle time (6s visible + 1s transition)
      
      return () => clearInterval(timer);
    }, 1000);
    
    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div 
        className="text-center"
        style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '2rem',
          lineHeight: '2.5rem',
          fontWeight: 450,
          color: 'hsl(210, 100%, 95%)',
          textShadow: [
            '0 0 10px rgba(173, 216, 255, 0.8)',
            '0 0 20px rgba(140, 200, 255, 0.6)',
            '0 0 30px rgba(100, 180, 255, 0.4)'
          ].join(','),
          letterSpacing: '0.03em',
          transition: 'opacity 1s ease-in-out',
          opacity: isVisible ? 1 : 0,
          willChange: 'opacity',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '0 1rem',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          width: 'auto',
          maxWidth: '95vw'
        }}
      >
        {atmosphericMessages[currentMessageIndex]}
      </div>
    </div>
  );
};