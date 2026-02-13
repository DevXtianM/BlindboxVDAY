
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = "" 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setDisplayedText(''); // Reset on mount
    setStarted(false);
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay, text]);

  useEffect(() => {
    if (!started) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, text, speed, started]);

  return (
    <span className={`${className} whitespace-pre-wrap`}>
      {displayedText}
      {started && displayedText.length < text.length && (
        <span className="inline-block w-[2px] h-[1.2em] bg-rose-400 ml-1 animate-pulse align-middle"></span>
      )}
    </span>
  );
};
