
import React, { useState, useRef } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { TulipGarden } from './components/TulipGarden';
import { Envelope } from './components/Envelope';
import { FallingEnvelopes } from './components/FallingEnvelopes';
import { BackgroundMusic, BackgroundMusicHandle } from './components/BackgroundMusic';

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isLetterFocused, setIsLetterFocused] = useState(false);
  const musicRef = useRef<BackgroundMusicHandle>(null);

  const handleToggle = () => {
    setIsOpened(true);
    
    // Attempt to start background music on interaction
    musicRef.current?.play();

    // Move to focused letter stage after envelope animation peaks
    setTimeout(() => {
      setIsLetterFocused(true);
    }, 1200);
  };

  const handleClose = () => {
    setIsOpened(false);
    setIsLetterFocused(false);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-pink-50 via-rose-100 to-pink-200 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Background Dimmer when focused */}
      <div className={`fixed inset-0 bg-rose-950/15 backdrop-blur-[2px] transition-opacity duration-1500 pointer-events-none z-[5] ${isLetterFocused ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Audio Manager */}
      <BackgroundMusic ref={musicRef} />
      
      {/* Background Effects */}
      <FloatingHearts />
      <TulipGarden />
      <FallingEnvelopes isActive={isOpened} />

      {/* Main Container */}
      <div className={`relative z-10 w-full transition-all duration-1200 ease-in-out flex flex-col items-center justify-center min-h-[600px] ${
        isLetterFocused ? 'max-w-5xl' : 'max-w-xl'
      }`}>
        
        {/* Helper text before opening */}
        {!isOpened && (
          <div className="text-center animate-bounce mb-16">
            <p className="text-rose-500 font-bold tracking-[0.3em] text-sm uppercase opacity-70">Tap the heart to reveal my soul</p>
          </div>
        )}

        {/* Envelope & Card Wrapper */}
        <div className={`transition-all duration-1200 ease-in-out transform flex items-center justify-center w-full ${
          isLetterFocused ? 'scale-100 translate-y-0' : 'scale-100'
        }`}>
          <Envelope 
            isOpen={isOpened} 
            isLetterFocused={isLetterFocused} 
            onToggle={handleToggle} 
            onClose={handleClose}
          />
        </div>
      </div>

      {/* Decorative Text */}
      <div className={`absolute bottom-10 transition-opacity duration-1000 ${isOpened ? 'opacity-0' : 'opacity-50'} text-rose-400 font-romantic text-3xl select-none z-[2]`}>
        Eternal love awaits...
      </div>
    </div>
  );
};

export default App;
