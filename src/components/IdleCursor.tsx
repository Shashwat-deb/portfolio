import React, { useState, useEffect } from 'react';

export const IdleCursor: React.FC = () => {
  const [isIdle, setIsIdle] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;
    
    const resetTimer = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsIdle(true);
      }, 30000); // 30 seconds
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      resetTimer();
    };
    
    const handleEvents = () => {
      resetTimer();
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleEvents);
    window.addEventListener('keydown', handleEvents);
    window.addEventListener('scroll', handleEvents);
    
    resetTimer();
    
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleEvents);
      window.removeEventListener('keydown', handleEvents);
      window.removeEventListener('scroll', handleEvents);
    };
  }, []);
  
  useEffect(() => {
    if (isIdle) {
      document.body.style.cursor = 'none';
      const style = document.createElement('style');
      style.id = 'idle-cursor-style';
      style.innerHTML = '* { cursor: none !important; }';
      document.head.appendChild(style);
      return () => {
        document.body.style.cursor = '';
        document.getElementById('idle-cursor-style')?.remove();
      };
    }
  }, [isIdle]);
  
  if (!isIdle) return null;
  
  return (
    <div 
      className="fixed pointer-events-none z-[10000] flex items-center gap-2 select-none"
      style={{
        left: mousePos.x,
        top: mousePos.y,
        transform: 'translate(-5px, -5px)'
      }}
    >
      <div className="w-5 h-5 border-2 border-zinc-800 bg-[#fbfaf7] rounded-full flex items-center justify-center animate-spin relative shadow-md">
        <div className="w-[1px] h-2 bg-zinc-800 absolute top-1/2 left-1/2 origin-top -translate-x-1/2 -translate-y-full" />
        <div className="w-2 h-[1px] bg-zinc-800 absolute top-1/2 left-1/2 origin-left -translate-y-1/2" />
      </div>
      <span className="text-[10px] font-bold font-retro-mono text-zinc-900 bg-white/90 border border-zinc-400 px-1 py-0.5 rounded shadow-sm">
        still here?
      </span>
    </div>
  );
};
