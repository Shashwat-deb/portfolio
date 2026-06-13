import React, { useState } from 'react';
import { playErrorSound } from '../utils/audio';

interface CRTContainerProps {
  children: React.ReactNode;
}

export const CRTContainer: React.FC<CRTContainerProps> = ({ children }) => {
  const [, setMonitorClicks] = useState(0);
  const [isScreenOff, setIsScreenOff] = useState(false);
  const [powerCycleKey, setPowerCycleKey] = useState(0);

  const handleMonitorClick = () => {
    setMonitorClicks(prev => {
      const next = prev + 1;
      if (next >= 10) {
        playErrorSound();
        setIsScreenOff(true);
        setTimeout(() => {
          setIsScreenOff(false);
          setPowerCycleKey(k => k + 1);
        }, 300);
        return 0;
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen w-screen bg-[#111113] flex items-center justify-center overflow-hidden select-none">
      {/* Inline SVG filter for noise texture */}
      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix 
            type="matrix" 
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" 
          />
        </filter>
      </svg>

      {/* Outer physical CRT Monitor casing */}
      <div className="crt-monitor" onClick={handleMonitorClick}>
        {/* Inner screen content */}
        <div 
          key={powerCycleKey}
          className={`crt-screen bg-[#1a1a24] overflow-hidden flex flex-col noise-bg transition-opacity duration-100 ${isScreenOff ? 'opacity-0' : ''}`}
        >
          {/* Main system views (Boot -> Login -> Desktop) */}
          <div className="relative w-full h-full z-10">
            {children}
          </div>

          {/* Vignette Shadow Overlay (simulates curved convex tube glass corners) */}
          <div className="absolute inset-0 z-20 screen-vignette pointer-events-none" />
          
          {/* Glass Glare Highlight */}
          <div className="absolute inset-0 z-25 glass-glare pointer-events-none" />
          
          {/* Scanlines Overlay */}
          <div className="absolute inset-0 z-30 scanlines-overlay pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
