
import React from 'react';
import { MessageCard } from './MessageCard';

interface EnvelopeProps {
  isOpen: boolean;
  isLetterFocused: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ isOpen, isLetterFocused, onToggle, onClose }) => {
  return (
    <div 
      className={`relative w-72 h-48 md:w-96 md:h-64 perspective-1000 transition-all duration-1000 flex items-center justify-center ${isOpen ? 'cursor-default' : 'cursor-pointer hover:scale-105 active:scale-95'}`}
      onClick={!isOpen ? onToggle : undefined}
    >
      {/* Dynamic Shadow - Fades away when focused on the letter */}
      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/10 blur-2xl rounded-full transition-all duration-1000 ${
        isLetterFocused ? 'opacity-0' : (isOpen ? 'opacity-20 scale-125' : 'opacity-40 scale-100')
      }`}></div>

      {/* Main Envelope Body Group - Fades away and shrinks slightly when letter is focused */}
      <div className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isLetterFocused ? 'opacity-0 scale-90 pointer-events-none blur-sm' : 'opacity-100 scale-100'}`}>
        
        {/* Envelope Background (Deepest) */}
        <div className="absolute inset-0 bg-rose-700 rounded-sm z-0 shadow-2xl"></div>

        {/* Envelope Flap */}
        <div 
          className={`absolute top-0 left-0 w-full h-1/2 bg-rose-400 origin-top transition-all duration-700 ease-in-out z-40 ${
            isOpen ? 'rotate-x-180 -translate-y-2 opacity-0 pointer-events-none' : 'rotate-x-0 opacity-100 shadow-sm'
          }`}
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
          }}
        ></div>

        {/* Front Folds */}
        <div className="absolute inset-0 z-30 pointer-events-none">
            <div 
                className="absolute left-0 bottom-0 w-1/2 h-full bg-rose-500" 
                style={{ clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)' }}
            ></div>
            <div 
                className="absolute right-0 bottom-0 w-1/2 h-full bg-rose-500" 
                style={{ clipPath: 'polygon(100% 0%, 100% 100%, 0% 100%)' }}
            ></div>
            <div 
                className="absolute bottom-0 w-full h-2/3 bg-rose-500 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.2)]"
                style={{ clipPath: 'polygon(0% 100%, 50% 40%, 100% 100%)' }}
            ></div>
        </div>

        {/* Heart Seal */}
        {!isOpen && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-pulse hover:animate-none">
                <div className="relative group">
                    <div className="absolute inset-0 bg-rose-400 rounded-full blur-lg opacity-40 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative p-4 bg-white rounded-full shadow-lg text-rose-500 hover:scale-125 transition-transform border-2 border-rose-50">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* The Letter (MessageCard) */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 px-4 transition-all duration-1000 ease-in-out z-[50] ${
          isLetterFocused 
            ? 'w-[92vw] md:w-[85vw] lg:w-[75vw] max-w-5xl translate-y-0 opacity-100 scale-100' 
            : (isOpen 
                ? 'w-full -translate-y-[120%] md:-translate-y-[140%] scale-100 opacity-100' 
                : 'w-full translate-y-0 scale-90 opacity-0 pointer-events-none')
        }`}
        style={{ 
          transitionDelay: isLetterFocused ? '0ms' : (isOpen ? '450ms' : '0ms')
        }}
      >
        <MessageCard isVisible={isOpen} onClose={onClose} />
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1200px;
        }
        .rotate-x-180 {
          transform: rotateX(170deg);
        }
      `}</style>
    </div>
  );
};
