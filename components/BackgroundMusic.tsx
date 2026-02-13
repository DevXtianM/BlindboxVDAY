
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';



// You can replace this URL with your desired music file later
const AUDIO_URL = "/audio/MYMP.mp3"; 

export interface BackgroundMusicHandle {
  play: () => void;
}

export const BackgroundMusic = forwardRef<BackgroundMusicHandle>((_, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(AUDIO_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(err => console.log("Autoplay blocked:", err));
        setIsPlaying(true);
      }
    }
  }));

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Playback failed:", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed top-6 right-6 z-[100]">
      <button
        onClick={togglePlay}
        className="group relative p-3 bg-white/30 backdrop-blur-md border border-white/40 rounded-full shadow-lg hover:bg-white/50 transition-all duration-300 group"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        <div className={`absolute inset-0 rounded-full bg-rose-200/30 animate-ping pointer-events-none ${isPlaying ? 'block' : 'hidden'}`}></div>
        {isPlaying ? (
          <Volume2 size={20} className="text-rose-600 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX size={20} className="text-rose-400 group-hover:scale-110 transition-transform" />
        )}
      </button>
      
      {/* Visual Indicator of sound */}
      {isPlaying && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-0.5 items-end h-3">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className="w-0.5 bg-rose-400/60 rounded-full animate-music-bar"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
});

BackgroundMusic.displayName = 'BackgroundMusic';
