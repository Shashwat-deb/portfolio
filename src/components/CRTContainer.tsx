import React from 'react';

interface CRTContainerProps {
  children: React.ReactNode;
}

export const CRTContainer: React.FC<CRTContainerProps> = ({ children }) => {
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
      <div className="crt-monitor">
        {/* Inner screen content */}
        <div className="crt-screen bg-[#1a1a24] overflow-hidden flex flex-col noise-bg">
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
