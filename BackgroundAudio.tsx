import { useEffect, useRef } from 'react';

export const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteracted = useRef(false);

  const handleFirstInteraction = async () => {
    if (hasInteracted.current || !audioRef.current) return;
    
    try {
      audioRef.current.volume = 0.4;
      await audioRef.current.play();
      hasInteracted.current = true;
      document.body.removeEventListener('click', handleFirstInteraction);
    } catch (err) {
      console.log('Error playing audio:', err);
    }
  };

  // Set up the initial interaction listener
  useEffect(() => {
    document.body.addEventListener('click', handleFirstInteraction, { once: true });
    
    return () => {
      document.body.removeEventListener('click', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      className="hidden"
    >
      <source 
        src="https://files.catbox.moe/dfiapr.mp3" 
        type="audio/mp3" 
      />
      Your browser does not support the audio element.
    </audio>
  );
};