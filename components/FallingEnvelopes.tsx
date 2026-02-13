
import React, { useEffect, useState, useCallback, useRef } from 'react';

interface MiniEnvelope {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

interface PoppedMessage {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface FallingEnvelopesProps {
  isActive: boolean;
}

const SHORT_MESSAGES = 
[
  "You’re my favorite hello 😊",
  "Stuck on you 💞",
  "My heart chose you ❤️",
  "You make my world brighter ✨",
  "Only you 🥰",
  "Can’t help but adore you 💕",
  "You’re my soft spot 🤍",
  "Falling for you every day 🍃",
  "My kind of perfect 🌷",
  "Just thinking of you 😘",
  "You’re my sweetest thought 💭",
  "All I need is you 💌",
  "You’re my heart’s home 🏡",
  "Forever feels right with you 💍",
  "My favorite feeling is you 💓",
  "Crazy about you 😍",
  "You make love easy 🌸",
  "Chosen you, always ♾️",
  "My best decision 💖",
  "My fave chat 💬❤️",
  "Horror buddy forever 👻💞",
  "Just us + laughs 🥰",
  "Can’t get over your cheeks 😘"
];

export const FallingEnvelopes: React.FC<FallingEnvelopesProps> = ({ isActive }) => {
  const [envelopes, setEnvelopes] = useState<MiniEnvelope[]>([]);
  const [messages, setMessages] = useState<PoppedMessage[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerPop = useCallback((id: number) => {
    setEnvelopes((prev) => {
      const envelope = prev.find((env) => env.id === id);
      if (!envelope) return prev;

      // Try to find the actual DOM element to get its current position in flight
      const el = document.getElementById(`mini-env-${id}`);
      let x = (envelope.left / 100) * (window.innerWidth || 800);
      let y = 300; // fallback

      if (el) {
        const rect = el.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
      }

      const messageId = Date.now() + Math.random();
      const newMessage: PoppedMessage = {
        id: messageId,
        x,
        y,
        text: SHORT_MESSAGES[Math.floor(Math.random() * SHORT_MESSAGES.length)],
      };

      setMessages((m) => [...m, newMessage]);
      
      // Remove message after it fades
      setTimeout(() => {
        setMessages((m) => m.filter((msg) => msg.id !== messageId));
      }, 2000);

      return prev.filter((env) => env.id !== id);
    });
  }, []);

  const spawnEnvelope = useCallback(() => {
    const id = Date.now() + Math.random();
    const duration = 10 + Math.random() * 12;
    const newEnvelope: MiniEnvelope = {
      id,
      left: Math.random() * 90 + 5,
      delay: 0,
      duration,
      rotation: Math.random() * 360,
      size: 20 + Math.random() * 15,
    };

    setEnvelopes((prev) => [...prev, newEnvelope]);

    // Automatically poof mid-way through the fall (between 30% and 70% of duration)
    const popDelay = (duration * (0.3 + Math.random() * 0.4)) * 1000;
    setTimeout(() => {
      triggerPop(id);
    }, popDelay);

    // Final cleanup in case it wasn't popped (unlikely but safe)
    setTimeout(() => {
      setEnvelopes((prev) => prev.filter((e) => e.id !== id));
    }, duration * 1000);
  }, [triggerPop]);

  useEffect(() => {
    if (!isActive) {
      setEnvelopes([]);
      return;
    }

    const interval = setInterval(spawnEnvelope, 6000); // Spawn one every 5 seconds
    return () => clearInterval(interval);
  }, [spawnEnvelope, isActive]);

  const handleManualPop = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    triggerPop(id);
  };

  if (!isActive && envelopes.length === 0 && messages.length === 0) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Envelopes */}
      {envelopes.map((env) => (
        <div
          key={env.id}
          id={`mini-env-${env.id}`}
          className="absolute top-[-50px] cursor-pointer pointer-events-auto group animate-fall-and-sway"
          style={{
            left: `${env.left}%`,
            animationDuration: `${env.duration}s`,
            width: `${env.size}px`,
            height: `${env.size * 0.7}px`,
          }}
          onClick={(e) => handleManualPop(e, env.id)}
        >
          <div 
            className="relative w-full h-full bg-rose-400 rounded-sm shadow-md transition-transform group-hover:scale-125"
            style={{ transform: `rotate(${env.rotation}deg)` }}
          >
            <div className="absolute top-0 left-0 w-full h-1/2 bg-rose-300" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] text-white">❤️</div>
          </div>
        </div>
      ))}

      {/* Pop Messages */}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="absolute animate-pop-up text-rose-600 font-bold text-sm md:text-base px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-rose-100 whitespace-nowrap z-50 pointer-events-none"
          style={{
            left: msg.x,
            top: msg.y,
          }}
        >
          {msg.text}
        </div>
      ))}

      <style>{`
        @keyframes fall-and-sway {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(10deg);
            opacity: 0.8;
          }
        }
        @keyframes pop-up {
          0% {
            transform: scale(0.5) translateY(0);
            opacity: 0;
          }
          20% {
            transform: scale(1.1) translateY(-20px);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(-60px);
            opacity: 0;
          }
        }
        .animate-fall-and-sway {
          animation: fall-and-sway linear forwards;
        }
        .animate-pop-up {
          animation: pop-up 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
