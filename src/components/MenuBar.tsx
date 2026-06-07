import React, { useState, useEffect } from 'react';
import { playClickSound } from '../utils/audio';

interface MenuBarProps {
  onOpenAbout: () => void;
  onLogout: () => void;
}

// System menu logo icon SVG
const SmallMonogram = () => (
  <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current" fill="currentColor">
    <circle cx="50" cy="50" r="10" />
    <path d="M50,50 Q44,28 50,18 Q56,28 50,50 Z" />
    <path d="M50,50 Q66,59 76,66 Q61,70 50,50 Z" />
    <path d="M50,50 Q34,59 24,66 Q39,70 50,50 Z" />
    <circle cx="50" cy="18" r="9" />
    <circle cx="76" cy="66" r="9" />
    <circle cx="24" cy="66" r="9" />
  </svg>
);

export const MenuBar: React.FC<MenuBarProps> = ({ onOpenAbout, onLogout }) => {
  const [timeStr, setTimeStr] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Live clock update
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      };
      // Format: "Sun Jun 7, 12:05 PM"
      const formatted = date.toLocaleString('en-US', options).replace(',', '');
      setTimeStr(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = (menu: string) => {
    playClickSound();
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeDropdown = () => {
    setActiveMenu(null);
  };

  useEffect(() => {
    if (!activeMenu) return;
    const handleOutsideClick = () => closeDropdown();
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [activeMenu]);

  return (
    <div className="w-full h-7 bg-[#fbfaf7]/90 backdrop-blur-md border-b-2 border-zinc-800 flex items-center justify-between px-4 z-40 select-none text-xs text-zinc-800 font-retro-mono">
      {/* Left side items */}
      <div className="flex items-center gap-4 relative">
        {/* Monogram System Dropdown */}
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); handleMenuClick('system'); }}
            className={`flex items-center px-2 py-0.5 rounded cursor-pointer transition-colors ${activeMenu === 'system' ? 'bg-[#28509c] text-white' : 'hover:bg-zinc-200'}`}
          >
            <SmallMonogram />
          </button>
          {activeMenu === 'system' && (
            <div className="absolute left-0 mt-1.5 w-48 bg-[#fbfaf7] border-2 border-zinc-800 retro-border-shadow py-1 z-50 text-zinc-800">
              <button 
                onClick={onOpenAbout}
                className="w-full text-left px-4 py-1 hover:bg-[#28509c] hover:text-white cursor-pointer font-retro-serif text-xs"
              >
                About This Portfolio
              </button>
              <div className="h-[2px] bg-zinc-800 my-1" />
              <button 
                onClick={() => { playClickSound(); alert("Shashwat OS X v10.0\nBuilt with React & Framer Motion\nDesigned by Antigravity"); }}
                className="w-full text-left px-4 py-1 hover:bg-[#28509c] hover:text-white cursor-pointer font-retro-mono text-[10px]"
              >
                System Information
              </button>
              <div className="h-[2px] bg-zinc-800 my-1" />
              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-1 hover:bg-[#28509c] hover:text-white cursor-pointer text-xs"
              >
                Log Out Guest...
              </button>
              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-1 hover:bg-[#28509c] hover:text-white cursor-pointer text-xs"
              >
                Restart / Shut Down
              </button>
            </div>
          )}
        </div>

        {/* Name / Home menu */}
        <span className="font-bold font-retro-serif">Shashwat</span>

        {/* File menu */}
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); handleMenuClick('file'); }}
            className={`px-2 py-0.5 rounded cursor-pointer ${activeMenu === 'file' ? 'bg-[#28509c] text-white' : 'hover:bg-zinc-200'}`}
          >
            File
          </button>
          {activeMenu === 'file' && (
            <div className="absolute left-0 mt-1.5 w-36 bg-[#fbfaf7] border-2 border-zinc-800 retro-border-shadow py-1 z-50">
              <div className="px-4 py-1 text-zinc-400 cursor-not-allowed">New Folder</div>
              <div className="px-4 py-1 text-zinc-400 cursor-not-allowed">Open</div>
              <div className="h-[2px] bg-zinc-800 my-1" />
              <button 
                onClick={() => window.print()}
                className="w-full text-left px-4 py-1 hover:bg-[#28509c] hover:text-white cursor-pointer"
              >
                Print...
              </button>
            </div>
          )}
        </div>

        {/* Special Menu (Retro Mac feature!) */}
        <div className="relative">
          <button 
            onClick={(e) => { e.stopPropagation(); handleMenuClick('special'); }}
            className={`px-2 py-0.5 rounded cursor-pointer ${activeMenu === 'special' ? 'bg-[#28509c] text-white' : 'hover:bg-zinc-200'}`}
          >
            Special
          </button>
          {activeMenu === 'special' && (
            <div className="absolute left-0 mt-1.5 w-44 bg-[#fbfaf7] border-2 border-zinc-800 retro-border-shadow py-1 z-50">
              <button 
                onClick={() => { playClickSound(); alert("Trash emptied!"); }}
                className="w-full text-left px-4 py-1 hover:bg-[#28509c] hover:text-white cursor-pointer"
              >
                Empty Trash
              </button>
              <div className="h-[2px] bg-zinc-800 my-1" />
              <button 
                onClick={onLogout}
                className="w-full text-left px-4 py-1 hover:bg-[#28509c] hover:text-white cursor-pointer"
              >
                Eject Desktop
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right side items (Live Clock and Mock Status Icons) */}
      <div className="flex items-center gap-4">
        {/* Wifi representation */}
        <span className="opacity-80">📶</span>
        {/* Battery representation */}
        <span className="opacity-80">🔋 100%</span>
        
        {/* Time Display */}
        <span className="font-semibold">{timeStr}</span>
      </div>
    </div>
  );
};
