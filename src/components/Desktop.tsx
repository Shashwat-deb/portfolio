import React, { useState, useRef } from 'react';
import { MenuBar } from './MenuBar';
import { Window } from './Window';
import { Dock } from './Dock';
import { AboutContent, ProjectsContent, ContactContent, FolderContent } from './Content';
import { playClickSound, playOpenSound } from '../utils/audio';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  width: string;
  height: string;
  defaultPos: { x: number; y: number };
}

// SVGs for desktop/dock icons
const TrashIcon = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`${className} text-zinc-800 fill-current`} stroke="black" strokeWidth="2.5">
    <rect x="25" y="25" width="50" height="60" rx="4" fill="none" />
    {/* Grid pattern for wire mesh */}
    <line x1="33" y1="25" x2="33" y2="85" stroke="black" strokeWidth="1.5" />
    <line x1="42" y1="25" x2="42" y2="85" stroke="black" strokeWidth="1.5" />
    <line x1="50" y1="25" x2="50" y2="85" stroke="black" strokeWidth="1.5" />
    <line x1="58" y1="25" x2="58" y2="85" stroke="black" strokeWidth="1.5" />
    <line x1="67" y1="25" x2="67" y2="85" stroke="black" strokeWidth="1.5" />
    <line x1="25" y1="40" x2="75" y2="40" stroke="black" strokeWidth="1" />
    <line x1="25" y1="55" x2="75" y2="55" stroke="black" strokeWidth="1" />
    <line x1="25" y1="70" x2="75" y2="70" stroke="black" strokeWidth="1" />
    {/* Top rim */}
    <ellipse cx="50" cy="25" rx="28" ry="8" fill="#e4e4e7" stroke="black" strokeWidth="2" />
  </svg>
);

interface DesktopProps {
  onLogout: () => void;
}

export const Desktop: React.FC<DesktopProps> = ({ onLogout }) => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [maxZ, setMaxZ] = useState(10);

  // Initialize our windows list
  const [windows, setWindows] = useState<Record<string, WindowState>>({
    mywork: {
      id: 'mywork',
      title: 'my work',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '520px',
      height: '320px',
      defaultPos: { x: 120, y: 100 }
    },
    about: {
      id: 'about',
      title: 'about me',
      isOpen: true,
      isMinimized: false,
      zIndex: 2,
      width: '560px',
      height: '460px',
      defaultPos: { x: 280, y: 60 }
    },
    projects: {
      id: 'projects',
      title: 'projects',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '620px',
      height: '480px',
      defaultPos: { x: 180, y: 110 }
    },
    contact: {
      id: 'contact',
      title: 'contact',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '560px',
      height: '450px',
      defaultPos: { x: 220, y: 130 }
    },
    trash: {
      id: 'trash',
      title: 'trash can',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '400px',
      height: '250px',
      defaultPos: { x: 400, y: 200 }
    }
  });

  // Focus a window by pulling its zIndex to maxZ + 1
  const focusWindow = (id: string) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        zIndex: nextZ,
        isMinimized: false
      }
    }));
  };

  const openWindow = (id: string) => {
    playOpenSound();
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false
      }
    }));
    // Defer focus window to ensure state propagates
    setTimeout(() => focusWindow(id), 50);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false
      }
    }));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true
      }
    }));
  };

  // Dock item action triggers
  const handleDockClick = (id: string) => {
    const win = windows[id];
    if (!win.isOpen) {
      openWindow(id);
    } else if (win.isMinimized) {
      // Restore
      setWindows(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          isMinimized: false
        }
      }));
      focusWindow(id);
    } else {
      // Toggle minimize if already open and focused, otherwise focus
      const sortedActiveWindows = Object.values(windows)
        .filter(w => w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);
      
      const isTop = sortedActiveWindows[0]?.id === id;
      if (isTop) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    }
  };

  const dockItems = [
    { id: 'about', label: 'About Me', icon: <img src="/icons/addressbook.png" className="w-11 h-11 object-contain animate-pulse" alt="About" />, onClick: () => handleDockClick('about'), isOpen: windows.about.isOpen },
    { id: 'mywork', label: 'My Work', icon: <img src="/icons/folder.png" className="w-11 h-11 object-contain" alt="Folder" />, onClick: () => handleDockClick('mywork'), isOpen: windows.mywork.isOpen },
    { id: 'projects', label: 'Projects', icon: <img src="/icons/diskutility.png" className="w-11 h-11 object-contain" alt="Projects" />, onClick: () => handleDockClick('projects'), isOpen: windows.projects.isOpen },
    { id: 'contact', label: 'Socials', icon: <img src="/icons/ichat.png" className="w-11 h-11 object-contain" alt="Socials" />, onClick: () => handleDockClick('contact'), isOpen: windows.contact.isOpen },
    { id: 'trash', label: 'Trash', icon: <TrashIcon className="w-11 h-11" />, onClick: () => handleDockClick('trash'), isOpen: windows.trash.isOpen }
  ];

  return (
    <div className="w-full h-full flex flex-col relative select-none">
      {/* Background Wallpaper matching user reference */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/wallpaper.png')" }}
      />

      {/* Top Menu Bar */}
      <MenuBar 
        onOpenAbout={() => openWindow('about')} 
        onLogout={onLogout} 
      />

      {/* Interactive Desktop Area */}
      <div 
        ref={desktopRef}
        className="flex-grow w-full relative z-10 p-6 overflow-hidden"
        style={{ height: 'calc(100% - 28px)' }}
      >
        {/* Vertically Aligned Desktop Icons on the Left */}
        <div className="absolute top-8 left-6 flex flex-col gap-6 items-center w-20 z-10 text-white font-retro-mono">
          {/* Globe/Socials Icon (replacing Store) */}
          <button 
            onClick={() => openWindow('contact')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group w-full text-center animate-pulse"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded group-active:opacity-80">
              <img src="/icons/ichat.png" className="w-12 h-12 object-contain" alt="Socials" />
            </div>
            <span className="text-[10px] font-bold tracking-wide text-zinc-900 bg-white/70 px-1 rounded shadow-sm border border-zinc-300">
              socials
            </span>
          </button>

          {/* My Work Folder */}
          <button 
            onClick={() => openWindow('mywork')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group w-full text-center"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded group-active:opacity-80">
              <img src="/icons/folder.png" className="w-12 h-12 object-contain" alt="My Work" />
            </div>
            <span className="text-[10px] font-bold tracking-wide text-zinc-900 bg-white/70 px-1 rounded shadow-sm border border-zinc-300">
              my work
            </span>
          </button>

          {/* Terminal Icon */}
          <button 
            onClick={() => { playClickSound(); alert("Developer Console v1.0\nReady to work!"); }}
            className="flex flex-col items-center gap-1.5 cursor-pointer group w-full text-center"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded group-active:opacity-80">
              <img src="/icons/terminal_osx.png" className="w-12 h-12 object-contain" alt="Terminal" />
            </div>
            <span className="text-[10px] font-bold tracking-wide text-zinc-900 bg-white/70 px-1 rounded shadow-sm border border-zinc-300">
              terminal
            </span>
          </button>

          {/* Trash Icon */}
          <button 
            onClick={() => openWindow('trash')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group w-full text-center"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded group-active:opacity-80">
              <TrashIcon />
            </div>
            <span className="text-[10px] font-bold tracking-wide text-zinc-900 bg-white/70 px-1 rounded shadow-sm border border-zinc-300">
              trash
            </span>
          </button>
        </div>

        {/* DRAGGABLE WINDOW INSTANCES */}
        
        {/* About Me Window */}
        <Window
          id="about"
          title="about me"
          isOpen={windows.about.isOpen}
          isMinimized={windows.about.isMinimized}
          onClose={() => closeWindow('about')}
          onMinimize={() => minimizeWindow('about')}
          onFocus={() => focusWindow('about')}
          zIndex={windows.about.zIndex}
          width={windows.about.width}
          height={windows.about.height}
          defaultPosition={windows.about.defaultPos}
          desktopRef={desktopRef}
        >
          <AboutContent />
        </Window>

        {/* My Work Folder Window */}
        <Window
          id="mywork"
          title="my work"
          isOpen={windows.mywork.isOpen}
          isMinimized={windows.mywork.isMinimized}
          onClose={() => closeWindow('mywork')}
          onMinimize={() => minimizeWindow('mywork')}
          onFocus={() => focusWindow('mywork')}
          zIndex={windows.mywork.zIndex}
          width={windows.mywork.width}
          height={windows.mywork.height}
          defaultPosition={windows.mywork.defaultPos}
          desktopRef={desktopRef}
        >
          <FolderContent 
            onOpenWork={() => openWindow('projects')}
            onOpenContact={() => openWindow('contact')}
          />
        </Window>

        {/* Projects Window */}
        <Window
          id="projects"
          title="projects"
          isOpen={windows.projects.isOpen}
          isMinimized={windows.projects.isMinimized}
          onClose={() => closeWindow('projects')}
          onMinimize={() => minimizeWindow('projects')}
          onFocus={() => focusWindow('projects')}
          zIndex={windows.projects.zIndex}
          width={windows.projects.width}
          height={windows.projects.height}
          defaultPosition={windows.projects.defaultPos}
          desktopRef={desktopRef}
        >
          <ProjectsContent />
        </Window>

        {/* Contact Window */}
        <Window
          id="contact"
          title="contact"
          isOpen={windows.contact.isOpen}
          isMinimized={windows.contact.isMinimized}
          onClose={() => closeWindow('contact')}
          onMinimize={() => minimizeWindow('contact')}
          onFocus={() => focusWindow('contact')}
          zIndex={windows.contact.zIndex}
          width={windows.contact.width}
          height={windows.contact.height}
          defaultPosition={windows.contact.defaultPos}
          desktopRef={desktopRef}
        >
          <ContactContent />
        </Window>

        {/* Trash Window */}
        <Window
          id="trash"
          title="trash can"
          isOpen={windows.trash.isOpen}
          isMinimized={windows.trash.isMinimized}
          onClose={() => closeWindow('trash')}
          onMinimize={() => minimizeWindow('trash')}
          onFocus={() => focusWindow('trash')}
          zIndex={windows.trash.zIndex}
          width={windows.trash.width}
          height={windows.trash.height}
          defaultPosition={windows.trash.defaultPos}
          desktopRef={desktopRef}
        >
          <div className="font-retro-mono text-zinc-600 text-xs text-center flex flex-col items-center justify-center h-full gap-2">
            <TrashIcon />
            <p>Your trash is empty.</p>
            <p className="text-[10px] text-zinc-400">Everything is clean.</p>
          </div>
        </Window>
      </div>

      {/* Floating Dock */}
      <Dock items={dockItems} />
    </div>
  );
};
