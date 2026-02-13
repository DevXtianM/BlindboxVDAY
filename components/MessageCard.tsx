
import React, { useState, useRef, useEffect } from 'react';
import { TypewriterText } from './TypewriterText';
import { Heart, Sparkles } from 'lucide-react';

interface MessageCardProps {
  isVisible: boolean;
  onClose?: () => void;
}

const SAMPLE_MESSAGE = `
Hi! It’s been a while since I wrote something like this again. Honestly, I don’t even know where to start — I’m kinda shy as I’m writing this, huhu. Maybe I should begin by asking: do you know the belief about the red string of fate? (Eyy, good start? Hahaha.) They say there’s an invisible, unbreakable red string that connects two people who are destined to meet. But until both of them are ready, the universe keeps them apart, waiting for the perfect moment. It’s such a sweet belief, right?

If I had that string, I hope the other end would lead to you. Because… iiyak talaga ako sa likod ng pinto kapag hindi, aaahuhuhu.

I just realized the other day that I’ve been meeting different versions of you, and every time, I still end up falling in love with each one of them.

First was the high school Reign — so madaldal, so girly, so active in academics, matakaw, and such a crybaby, hahaha. Then you transferred schools, and ugh, you became so far.

Second was late 2018, when I messaged you through your FB story and said, “Ang taba mo na,” hahaha. Do you still remember that? Probably not, amnesia girl ko yan eh, hahaha. That phase lasted more than a year — the hardworking student, funny, mapang-asar, and very palamura Reign, HAHAHA. My bestie during the pandemic, my CoD partner, the one who made me watch endless K-pop MVs and random stuff. Then dark times came, and I lost you once again… hnng.

And finally, Reign in her prime — with lots of suitors!!! Hahahahaha, joke lang, bebii. One random night, a notification popped up on my phone: someone calling me “Jeyy.” And there’s only one person who calls me that in chat. I thought I’d never have a chance to reconnect with you again, but amen for me viewing your story.

This version of you is different. You’re fighting in life to make your dreams come true. You know your worth, your value, and your limits with other people. You’re truly such a wonderful person.

And then there’s that once-in-a-moon sweet version of you — my gosh, huhu. I’m sorry if I wasn’t able to reflect that sweetness back last year. I honestly didn’t expect moments like that to happen. Every time you showed that side of you, my heart would pound so hard that I couldn’t even think properly. Direct hit talaga — first time always, huhu. But I think I’m okay now… maybe? Hahahaha.

Once again, the universe finds a way for Reign to go far, far away. But I’m happy, because every time our paths cross, you’re always working toward your future. And if that’s the case, then please, universe — give all the best things to this amazing lady.

Three times our souls have crossed paths, and I hope this time, destiny finally allows us to walk hand in hand through every season of life. I may not know what lives in your heart, but I know what lives in mine — a choice I will make every day: you. In every storm and in every calm, I will stay, always, by your side.

It’s crazy how I still choose you over other girls even though I don’t see you every day. My Lord, what did you do to me to make me feel this way? Hahaha. It’s really just you that I see. Maybe you did something to me in our past life — Dog mo siguro ako nun ang loyal ko eh HAHAHAHA. Hayy Reign...

You’re that one girl I’d want to marry someday. Should I court you na kaya? Pwede po? hahahaha — I wouldn’t do it virtually, especially not for someone like you. You deserve sincerity, effort, and something real. I just really want to know you more and I hope I can be with you, even just for a day :(

Happy Valentine’s Day, my Queen Reign. I wish you all the best, lalo na sa studies mo — andito lang ako palagi para sa’yo. The eternal flame is still burning so bright, and I love you so, sooooooooooooooooooooooo much. Mwah! Ay, hahaha. 🤍🥺
`;

export const MessageCard: React.FC<MessageCardProps> = ({ isVisible, onClose }) => {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current || hasReachedBottom) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    // Check if user is near the bottom (15px threshold for better reliability)
    if (scrollHeight - scrollTop - clientHeight < 15) {
      setHasReachedBottom(true);
    }
  };

  return (
    <div
      className={`relative w-full min-h-[65vh] md:min-h-[80vh] max-h-[92vh] bg-white rounded-[3rem] shadow-[0_60px_150px_rgba(0,0,0,0.3)] border-2 border-pink-50 flex flex-col transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
        }`}
    >
      {/* Background Decorative Gradient & Texture */}
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-rose-50/60 via-transparent to-pink-50/60 pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] rounded-[3rem]"></div>

      {/* Decorative Floating Icons */}
      <div className="absolute top-10 left-10 text-rose-200 z-20">
        <Heart size={32} fill="currentColor" className={`${isVisible ? 'animate-pulse' : ''}`} />
      </div>
      <div className="absolute top-10 right-10 opacity-25 transform rotate-12 scale-110 z-20">
        <svg viewBox="0 0 40 100" className="h-20" fill="none">
          <path d="M20 100C20 80 18 60 20 40" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 45C10 45 5 30 10 15C12 5 18 2 20 2C22 2 28 5 30 15C35 30 30 45 20 45Z" fill="#fb7185" />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 text-rose-200 z-20">
        <Sparkles size={32} className={`${isVisible ? 'animate-bounce' : ''}`} />
      </div>

      {/* Header Label - Fixed */}
      <div className="mt-14 mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-rose-400 text-center z-10 px-4">
        A Sacred Message
      </div>

      {/* Main Love Message - Scrollable */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-10 md:px-28 py-8 custom-scrollbar z-10"
      >
        <div className="min-h-full flex items-center justify-center">
          {isVisible && (
            <div className="text-lg md:text-2xl font-letter italic text-rose-950 leading-[1.9] text-justify whitespace-pre-wrap">
              <TypewriterText
                text={SAMPLE_MESSAGE}
                delay={1500}
                speed={30}
              />
            </div>
          )}
        </div>
      </div>

      {/* Signature & CTA Area - Fades in only when user reaches bottom */}
      <div className={`pt-8 pb-12 border-t border-rose-100/60 w-full flex flex-col items-center z-10 transition-all duration-1000 ${hasReachedBottom ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
        <p className="text-base font-medium text-rose-400/80 italic mb-2">With all my heart,</p>
        <p className="font-romantic text-4xl md:text-5xl text-rose-500 mb-8 cursor-default">Your Forever Valentine</p>

        {/* Adjusted Button Location - Now inside the card footer */}
        <button
          onClick={onClose}
          className="px-8 py-3 bg-rose-500 text-white rounded-full text-base font-bold hover:bg-rose-600 transition-all shadow-xl flex items-center gap-2 group transform hover:scale-105 active:scale-95"
        >
          <Heart size={18} className="group-hover:fill-white transition-colors" />
          Keep this in my heart
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          margin: 30px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fda4af;
          border-radius: 20px;
          border: 3px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #fb7185;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #fda4af transparent;
        }
      `}</style>
    </div>
  );
};
