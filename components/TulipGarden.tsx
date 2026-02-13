
import React from 'react';

export const TulipGarden: React.FC = () => {
  // Generate an array of tulips with randomized properties
  const tulips = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${(i * 9) + 2}%`,
    delay: `${Math.random() * 2}s`,
    height: `${60 + Math.random() * 40}px`,
    color: i % 3 === 0 ? '#fb7185' : i % 2 === 0 ? '#f43f5e' : '#fda4af',
    rotation: Math.random() * 10 - 5,
  }));

  return (
    <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-1 overflow-hidden select-none opacity-80">
      <div className="relative w-full h-full">
        {tulips.map((tulip) => (
          <div
            key={tulip.id}
            className="absolute bottom-0 transition-transform animate-sway origin-bottom"
            style={{
              left: tulip.left,
              height: tulip.height,
              animationDelay: tulip.delay,
            }}
          >
            <svg
              viewBox="0 0 40 100"
              className="h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stem */}
              <path
                d="M20 100C20 80 18 60 20 40"
                stroke="#4ade80"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Leaf Left */}
              <path
                d="M20 80C10 75 5 65 8 55"
                stroke="#4ade80"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Leaf Right */}
              <path
                d="M20 70C30 65 35 55 32 45"
                stroke="#4ade80"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Petals */}
              <path
                d="M20 45C10 45 5 30 10 15C12 5 18 2 20 2C22 2 28 5 30 15C35 30 30 45 20 45Z"
                fill={tulip.color}
              />
              <path
                d="M20 45C15 45 12 35 15 25C17 15 20 12 20 12C20 12 23 15 25 25C28 35 25 45 20 45Z"
                fill="rgba(0,0,0,0.1)"
              />
            </svg>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
