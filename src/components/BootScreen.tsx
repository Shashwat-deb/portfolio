import React, { useState, useEffect } from 'react';
import { playStartupChime, playClickSound } from '../utils/audio';

// Halftone Sphere Logo
const MonogramLogo = () => (
  <img 
    src="/new_logo.png" 
    className="w-16 h-16 mx-auto object-contain" 
    alt="System Logo" 
  />
);

interface BootScreenProps {
  onLoginCompleted: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onLoginCompleted }) => {
  const [bootState, setBootState] = useState<'booting' | 'login'>('booting');
  const [progress, setProgress] = useState(0);
  const [welcomeText, setWelcomeText] = useState('Welcome to Shashwat.');

  // Simulated Boot Progress Bar
  useEffect(() => {
    if (bootState !== 'booting') return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setBootState('login');
          }, 600);
          return 100;
        }
        
        // Random incremental speed to make it look realistic
        const increment = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(prev + increment, 100);
        
        if (next > 40 && next < 60) {
          setWelcomeText('Loading system modules...');
        } else if (next > 80) {
          setWelcomeText('Starting GUI...');
        }
        
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [bootState]);

  const handleUserLogin = () => {
    playStartupChime();
    onLoginCompleted();
  };

  const handleActionClick = () => {
    playClickSound();
    // Soft reset progress
    setBootState('booting');
    setProgress(0);
    setWelcomeText('Welcome to Shashwat.');
  };

  return (
    <div className="w-full h-full bg-[#28509c] flex items-center justify-center relative select-none">
      {/* Tiny scanline texture backdrop specifically matching the blue CRT screen */}
      <div className="absolute inset-0 bg-repeat opacity-15" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3) 50%, transparent 50%)', backgroundSize: '100% 4px' }} 
      />
      
      {/* Main card box */}
      <div 
        className={`relative z-10 w-[380px] p-8 flex flex-col items-center justify-between text-center select-none ${bootState === 'booting' ? 'boot-loading-flicker' : ''}`}
        style={{ 
          minHeight: '380px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
          background: 'repeating-linear-gradient(to bottom, #eeeeee, #eeeeee 1px, #dddddd 1px, #dddddd 2px)',
          border: '1px solid gray',
          borderRadius: '8px'
        }}
      >
        
        {bootState === 'booting' ? (
          /* BOOT SCREEN VIEW */
          <div className="w-full h-full flex flex-col justify-between items-center py-6 flex-grow">
            <div className="space-y-4">
              <MonogramLogo />
              <h1 
                style={{ fontFamily: "'Times New Roman', Georgia, serif", textShadow: '1px 1px 1px rgba(255,255,255,0.8)' }}
                className="text-3xl font-bold tracking-tight text-zinc-900 mt-2"
              >
                Shashwat OS X
              </h1>
            </div>
            
            <div className="w-full space-y-4 px-4 my-8">
              {/* Progress track */}
              <div className="w-full h-4 border border-zinc-400 bg-white/50 p-[2px] relative overflow-hidden rounded-sm"
                   style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
                {/* Aqua status bar */}
                <div 
                  className="h-full bg-sky-500 rounded-sm transition-all duration-150 ease-out aqua-progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p 
                style={{ fontFamily: "'Lucida Grande', Arial, sans-serif" }}
                className="text-[10px] font-semibold text-zinc-500"
              >
                {welcomeText}
              </p>
            </div>
          </div>
        ) : (
          /* LOGIN SCREEN VIEW */
          <div className="w-full h-full flex flex-col justify-between items-center flex-grow">
            <div className="space-y-1">
              <MonogramLogo />
              <h2 
                style={{ fontFamily: "'Times New Roman', Georgia, serif", textShadow: '1px 1px 1px rgba(255,255,255,0.8)' }}
                className="text-2xl font-bold text-zinc-900 mt-2"
              >
                Shashwat OS X
              </h2>
              <p 
                style={{ fontFamily: "'Lucida Grande', Arial, sans-serif" }}
                className="text-[9px] font-semibold text-zinc-500 tracking-wide mt-1"
              >
                Shashwat Shikhar Dwivedi's Computer
              </p>
            </div>

            {/* Login Account list container (Inset container style) */}
            <div 
              className="w-full my-6 p-2.5 text-left space-y-1.5"
              style={{
                border: '1px solid #b3b3b3',
                boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '4px'
              }}
            >
              {/* Work Login */}
              <button 
                onClick={handleUserLogin}
                className="w-full flex items-center gap-3 p-1.5 hover:bg-[#28509c] hover:text-white rounded group cursor-pointer text-zinc-800 transition-colors"
              >
                <div className="w-7 h-7 bg-zinc-800 text-white rounded-full flex items-center justify-center p-[4px] group-hover:bg-white group-hover:text-zinc-800 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-4.5 h-4.5 fill-current">
                    <circle cx="50" cy="50" r="10" />
                    <path d="M50,50 Q44,28 50,18 Q56,28 50,50 Z" />
                    <path d="M50,50 Q66,59 76,66 Q61,70 50,50 Z" />
                    <path d="M50,50 Q34,59 24,66 Q39,70 50,50 Z" />
                    <circle cx="50" cy="18" r="9" />
                    <circle cx="76" cy="66" r="9" />
                    <circle cx="24" cy="66" r="9" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <span 
                    style={{ fontFamily: "'Lucida Grande', Arial, sans-serif" }}
                    className="text-[11px] font-bold leading-none text-zinc-900 group-hover:text-white"
                  >
                    Work
                  </span>
                  <span className="text-[9px] font-retro-mono opacity-80 mt-0.5 leading-none text-zinc-500 group-hover:text-zinc-200">
                    Shashwat Shikhar
                  </span>
                </div>
              </button>

              {/* Guest Login */}
              <button 
                onClick={() => {
                  playClickSound();
                  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank", "noopener,noreferrer");
                }}
                className="w-full flex items-center gap-3 p-1.5 hover:bg-[#28509c] hover:text-white rounded group cursor-pointer text-zinc-800 transition-colors"
              >
                <div className="w-7 h-7 bg-zinc-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-white group-hover:text-zinc-800 flex-shrink-0">
                  G
                </div>
                <div className="flex flex-col justify-center">
                  <span 
                    style={{ fontFamily: "'Lucida Grande', Arial, sans-serif" }}
                    className="text-[11px] font-bold leading-none text-zinc-900 group-hover:text-white"
                  >
                    Guest
                  </span>
                  <span className="text-[9px] font-retro-mono opacity-80 mt-0.5 leading-none text-zinc-500 group-hover:text-zinc-200">
                    Temporary account
                  </span>
                </div>
              </button>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-center gap-8 text-[9px] font-semibold text-zinc-700 tracking-wide mt-2">
              <button 
                onClick={handleActionClick} 
                className="flex flex-col items-center gap-1 hover:text-[#28509c] cursor-pointer transition-colors group"
              >
                <div className="w-7 h-7 rounded-full border border-zinc-500 flex items-center justify-center hover:bg-zinc-200 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-zinc-800 group-hover:text-zinc-900">
                    <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 0-.67-3.4 6.75 6.75 0 0 1-11.63-6.1A9.75 9.75 0 0 0 12 3Z" />
                  </svg>
                </div>
                <span className="mt-0.5">Sleep</span>
              </button>
              <button 
                onClick={handleActionClick} 
                className="flex flex-col items-center gap-1 hover:text-[#28509c] cursor-pointer transition-colors group"
              >
                <div className="w-7 h-7 rounded-full border border-zinc-500 flex items-center justify-center hover:bg-zinc-200 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-zinc-800 group-hover:text-zinc-900">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-1.19" />
                  </svg>
                </div>
                <span className="mt-0.5">Restart</span>
              </button>
              <button 
                onClick={handleActionClick} 
                className="flex flex-col items-center gap-1 hover:text-[#28509c] cursor-pointer transition-colors group"
              >
                <div className="w-7 h-7 rounded-full border border-zinc-500 flex items-center justify-center hover:bg-zinc-200 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-zinc-800 group-hover:text-zinc-900">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10" />
                  </svg>
                </div>
                <span className="mt-0.5">Shut Down</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
