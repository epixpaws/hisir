import { CrescentMoon } from '@/components/CrescentMoon';
import { AtmosphericText } from '@/components/AtmosphericText';
import { BackgroundAudio } from '@/components/BackgroundAudio';
import { DeathScreenEffects } from '@/components/DeathScreenEffects';
import { Bubbles } from '@/components/Bubbles';
import { useEffect, useState } from 'react';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate the death screen loading effect
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
      {/* Underwater light overlay */}
      <div className="underwater-light" />
      
      {/* Background Audio */}
      <BackgroundAudio />
      
      {/* Atmospheric Effects */}
      <DeathScreenEffects />
      
      {/* Underwater Bubbles */}
      <Bubbles count={30} />
      
      {/* Main Content */}
      <div className={`
        relative z-10 min-h-screen flex flex-col items-center justify-center
        transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Crescent Moon at top */}
        <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2">
          <CrescentMoon />
        </div>
        
        {/* Atmospheric Text Messages - Centered */}
        <div className="underwater-text">
          <AtmosphericText />
        </div>
      </div>
      

    </div>
  );
};

export default Index;