import React, { useState, useRef, useEffect } from 'react';
import { MenuBar } from './MenuBar';
import { Window } from './Window';
import { Dock } from './Dock';
import { AboutContent, ProjectsContent, ContactContent, FolderContent } from './Content';
import { Terminal } from './Terminal';
import { playOpenSound, playClickSound } from '../utils/audio';
import { MusicPlayer } from './MusicPlayer';
import { StarryNightBackground } from './StarryNightBackground';
import { HackerConsole } from './HackerConsole';

const SecretBioContent: React.FC = () => {
  return (
    <div className="font-retro-mono text-xs text-zinc-800 space-y-4 select-text py-2">
      <div className="border-b-2 border-zinc-800 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-retro-serif text-base font-bold text-red-700">☣ CLASSIFIED BIO</h3>
          <p className="text-[10px] text-zinc-500 mt-0.5">Project: Shashwat-deb Intelligence Dossier</p>
        </div>
        <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded select-none animate-pulse">
          TOP SECRET
        </span>
      </div>
      
      <p className="leading-relaxed bg-zinc-900 text-green-400 p-3 rounded font-mono text-[10px]">
        WARNING: AUTHORIZED ACCESS ONLY.
        <br />
        ------------------------------------
        <br />
        Subject: SHASHWAT SHIKHAR DWIVEDI
        <br />
        Clearance Level: LEVEL 5 (DEVELOPER)
        <br />
        Specialization: Systems Engineering, Financial Algorithms
        <br />
        Alignment: Chaotic Good Software Engineer
      </p>

      <div className="space-y-2">
        <h4 className="font-bold text-zinc-900 border-b border-zinc-400 pb-1">🕵️ INTERCEPTED INTEL</h4>
        <ul className="list-disc pl-4 space-y-1 text-[11px]">
          <li><strong>Coding Superpower:</strong> Writing highly efficient code under pressure.</li>
          <li><strong>Favorite Weapon:</strong> C++ pointers & clean React Hooks.</li>
          <li><strong>Midnight Coffee Consumption:</strong> Over 1000 mg/day (estimated).</li>
          <li><strong>Current Objective:</strong> Building robust full-stack software and quant models.</li>
        </ul>
      </div>

      <div className="text-[9px] text-zinc-400 italic text-center pt-2">
        "The best way to predict the future is to program it."
      </div>
    </div>
  );
};

const ResumeContent: React.FC = () => {
  return (
    <div className="bg-white text-zinc-950 font-sans p-6 rounded shadow-sm border border-zinc-200 overflow-y-auto h-full select-text selection:bg-blue-200">
      {/* Header */}
      <div className="text-center space-y-2 pb-4 border-b border-zinc-300">
        <h1 className="font-retro-serif text-xl font-bold tracking-tight text-zinc-900">
          SHASHWAT SHIKHAR DWIVEDI
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-zinc-600 font-mono">
          <a href="mailto:shashwatshikhard@gmail.com" className="hover:underline hover:text-blue-600">shashwatshikhard@gmail.com</a>
          <span>•</span>
          <span>+91-9792677013</span>
          <span>•</span>
          <a href="https://linkedin.com/in/shashwat-shikhar-d" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600">linkedin.com/in/shashwat-shikhar-d</a>
          <span>•</span>
          <a href="https://github.com/Shashwat-deb" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600">github.com/Shashwat-deb</a>
        </div>
      </div>

      {/* Content body */}
      <div className="mt-5 space-y-5 text-[11px] leading-relaxed">
        
        {/* Education */}
        <section className="space-y-2">
          <h2 className="font-retro-serif text-xs font-bold text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase tracking-wide">
            Education
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline font-semibold text-zinc-900">
              <span>Manipal University Jaipur</span>
              <span className="font-normal text-[10px] text-zinc-500">Jaipur, Rajasthan</span>
            </div>
            <div className="flex justify-between items-baseline text-zinc-700 text-[10px] -mt-1">
              <span>B.Tech. in Computer Science and Engineering | CGPA: <strong className="text-zinc-900">8.56 / 10.0</strong></span>
              <span>2024 – 2028</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-zinc-600 text-[10px]">
              <li><strong>Core CS:</strong> Data Structures & Algorithms, Design & Analysis of Algorithms, OOP (Java), RDBMS, Operating Systems, Automata & Compiler Design, Computer Organization & Architecture, Cryptography.</li>
              <li><strong>Mathematics & Quant:</strong> Probability & Statistics, Calculus & Matrices, Computational Mathematics.</li>
            </ul>
          </div>
        </section>

        {/* Technical Skills */}
        <section className="space-y-2">
          <h2 className="font-retro-serif text-xs font-bold text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase tracking-wide">
            Technical Skills
          </h2>
          <div className="grid grid-cols-[110px_1fr] gap-x-2 gap-y-1.5 text-zinc-700">
            <span className="font-bold text-zinc-800">Languages:</span>
            <span>C, C++, Python (NumPy, Pandas, Scikit-Learn), Java, JavaScript, TypeScript, SQL</span>

            <span className="font-bold text-zinc-800">Quant & Fin.:</span>
            <span>Financial Modelling, Stochastic Modelling, Derivatives Pricing (Greeks, Monte Carlo), Time Series (ARIMA, GARCH), VaR, CVaR, Sharpe Ratio, Portfolio Construction & Optimization, ESG Metrics, Equity Valuation</span>

            <span className="font-bold text-zinc-800">Web Dev:</span>
            <span>React.js, Node.js, Express.js, PostgreSQL, TailwindCSS</span>

            <span className="font-bold text-zinc-800">Data & AI:</span>
            <span>Data Analytics, Data Engineering, Blockchain Technology, Generative AI, Prompt Engineering, Agentic Development</span>

            <span className="font-bold text-zinc-800">Tools:</span>
            <span>Streamlit, Git, GitHub, Postman, Linux</span>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="space-y-2">
          <h2 className="font-retro-serif text-xs font-bold text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline font-semibold text-zinc-900">
              <span>Software Development Centre, MUJ</span>
              <span className="font-normal text-[10px] text-zinc-500">Jaipur, Rajasthan</span>
            </div>
            <div className="flex justify-between items-baseline text-zinc-700 text-[10px] -mt-1">
              <span>Software Developer Intern</span>
              <span>January 2026 – Present</span>
            </div>
            <ul className="list-disc pl-4 space-y-1.5 text-zinc-600 text-[10px]">
              <li>Developing and deploying full-stack solutions for the university ecosystem using modern JavaScript frameworks and backend technologies.</li>
              <li>Architecting RESTful API endpoints, secure database schemas, and authentication systems for scalable community platforms.</li>
              <li>Collaborating in an agile environment to migrate and optimize university services, ensuring high availability and seamless data synchronization.</li>
            </ul>
          </div>
        </section>

        {/* Technical Projects */}
        <section className="space-y-2">
          <h2 className="font-retro-serif text-xs font-bold text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase tracking-wide">
            Technical Projects
          </h2>
          <div className="space-y-3">
            {/* Quant Risk */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-zinc-900">
                <span>Quant Infrastructure for Risk-Adjusted Portfolio Optimisation</span>
                <span className="font-normal text-[10px] text-zinc-500">Feb 2026</span>
              </div>
              <p className="text-[9px] font-bold text-sky-700 uppercase tracking-wider -mt-0.5">ML & Quantitative Finance</p>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-zinc-600 text-[10px]">
                <li>Architected an ML-driven quantitative framework to simulate asset price movements and optimize portfolio allocations using risk-adjusted metrics.</li>
                <li>Integrated ARIMA and GARCH forecasting models to evaluate time-series market data and improve real-time investment strategies.</li>
                <li>Implemented portfolio construction algorithms leveraging Sharpe ratio maximisation, VaR, and CVaR constraints to systematically minimise downside risk.</li>
              </ul>
            </div>

            {/* MF Portfolio Pro */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-zinc-900">
                <span>MF Portfolio Pro</span>
                <span className="font-normal text-[10px] text-zinc-500">January 2026</span>
              </div>
              <p className="text-[9px] font-bold text-sky-700 uppercase tracking-wider -mt-0.5">Mutual Fund Analytics Platform</p>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-zinc-600 text-[10px]">
                <li>Built a comprehensive interactive web application with Streamlit for end-to-end mutual fund portfolio analysis and health tracking.</li>
                <li>Engineered quantitative modules for VaR and CVaR calculations providing actionable risk insights, volatility-adjusted scoring, and alpha generation signals.</li>
                <li>Streamlined data ingestion pipelines to evaluate historical fund performance, asset diversification, and ESG-aligned investment metrics.</li>
              </ul>
            </div>

            {/* Travel Buddy */}
            <div>
              <div className="flex justify-between items-baseline font-semibold text-zinc-900">
                <span>Travel Buddy</span>
                <span className="font-normal text-[10px] text-zinc-500">Nov 2025</span>
              </div>
              <p className="text-[9px] font-bold text-sky-700 uppercase tracking-wider -mt-0.5">Community Vehicle-Pooling Platform</p>
              <ul className="list-disc pl-4 mt-1 space-y-1 text-zinc-600 text-[10px]">
                <li>Designed and deployed a full-stack carpooling platform serving the Manipal University Jaipur (MUJ) student ecosystem.</li>
                <li>Developed a real-time ride-matching algorithm and integrated location-based services to optimize intra-community transit, reducing commuting costs and carbon footprint.</li>
                <li>Implemented role-based access control and secure peer-to-peer coordination features.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="space-y-2">
          <h2 className="font-retro-serif text-xs font-bold text-zinc-900 border-b border-zinc-300 pb-0.5 uppercase tracking-wide">
            Certifications & Achievements
          </h2>
          <ul className="list-disc pl-4 space-y-1.5 text-zinc-600 text-[10px]">
            <li><strong>NPTEL:</strong> Certified in Design and Analysis of Algorithms (DAA) and Data Structures and Algorithms (DSA) – National Programme on Technology Enhanced Learning.</li>
            <li><strong>Enterprise Data Science in Practice – IBM SkillsBuild:</strong> Certified in data analytics, data engineering, and enterprise data science workflows (May 2026).</li>
            <li><strong>Supercharge Your Data Analytics with Generative AI:</strong> IBM SkillsBuild.</li>
          </ul>
        </section>

      </div>
    </div>
  );
};


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
  <img src="/trash_new.png" className={`${className} object-contain`} alt="Trash" />
);

interface DesktopProps {
  onLogout: () => void;
}

const TRACKS = [
  { name: 'Double Decker Eyelashes', url: '/music/Double Decker Eyelashes.mp3', duration: '4:13', seconds: 253 },
  { name: "I'm Yours", url: "/music/I'm Yours.mp3", duration: '4:03', seconds: 243 },
  { name: 'Kenny Rogers - The Gambler', url: '/music/Kenny Rogers - The Gambler.mp3', duration: '3:30', seconds: 210 },
  { name: 'Mamman Sani - Five Hundred Miles', url: '/music/Mamman Sani - Five Hundred Miles.mp3', duration: '5:53', seconds: 353 },
  { name: 'Marty Robbins - Big Iron (Audio)', url: '/music/Marty Robbins - Big Iron (Audio).mp3', duration: '3:57', seconds: 237 }
];

export const Desktop: React.FC<DesktopProps> = ({ onLogout }) => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [maxZ, setMaxZ] = useState(10);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isTrashShaking, setIsTrashShaking] = useState(false);
  const [showTrashMsg, setShowTrashMsg] = useState(false);

  const handleTrashClick = () => {
    playClickSound();
    setIsTrashShaking(true);
    setShowTrashMsg(true);
    setTimeout(() => setIsTrashShaking(false), 400);
    setTimeout(() => setShowTrashMsg(false), 2000);
  };

  useEffect(() => {
    const handleKonami = () => {
      openWindow('secret');
    };
    const handleHacker = () => {
      openWindow('hacker');
    };
    window.addEventListener('trigger-konami', handleKonami);
    window.addEventListener('trigger-hacker', handleHacker);
    return () => {
      window.removeEventListener('trigger-konami', handleKonami);
      window.removeEventListener('trigger-hacker', handleHacker);
    };
  }, []);

  const today = new Date();
  const isMidnight = today.getHours() === 0 || window.location.search.includes('midnight=true');
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(() => {
    const saved = localStorage.getItem('shashwat_portfolio_last_played_track');
    if (saved) {
      const idx = parseInt(saved, 10);
      if (idx >= 0 && idx < TRACKS.length) return idx;
    }
    return 0;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACKS[currentTrackIndex].seconds);
  const [isStopped, setIsStopped] = useState(true);
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('shashwat_portfolio_music_volume');
    return saved ? parseFloat(saved) : 0.8;
  });

  // Keep track of audio status
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    const trackUrl = TRACKS[currentTrackIndex].url;
    const currentSrc = audioRef.current.src;
    const resolvedPath = currentSrc ? new URL(currentSrc, window.location.href).pathname : '';

    if (resolvedPath !== trackUrl) {
      audioRef.current.src = trackUrl;
      audioRef.current.load();
      if (!isStopped) {
        if (isPlaying) {
          audioRef.current.play().catch(err => console.log("Audio play deferred:", err));
        }
      } else {
        audioRef.current.currentTime = 0;
        setCurrentTime(0);
        setDuration(TRACKS[currentTrackIndex].seconds);
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isStopped) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log("Audio autoplay blocked/deferred:", err);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isStopped]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsStopped(false);
    setIsPlaying(true);
    localStorage.setItem('shashwat_portfolio_last_played_track', String(index));
  };

  const togglePlay = () => {
    if (isStopped) {
      setIsStopped(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  const stopTrack = () => {
    setIsPlaying(false);
    setIsStopped(true);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    playTrack(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    playTrack(prevIdx);
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    localStorage.setItem('shashwat_portfolio_music_volume', String(vol));
  };

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
    },
    terminal: {
      id: 'terminal',
      title: 'terminal',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '600px',
      height: '400px',
      defaultPos: { x: 150, y: 150 }
    },
    music: {
      id: 'music',
      title: 'music player',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '360px',
      height: '460px',
      defaultPos: { x: 300, y: 150 }
    },
    secret: {
      id: 'secret',
      title: 'classified bio',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '500px',
      height: '420px',
      defaultPos: { x: 200, y: 150 }
    },
    hacker: {
      id: 'hacker',
      title: 'secret_console.sh',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '580px',
      height: '380px',
      defaultPos: { x: 220, y: 120 }
    },
    resume: {
      id: 'resume',
      title: 'shashwat_resume.pdf',
      isOpen: false,
      isMinimized: false,
      zIndex: 1,
      width: '640px',
      height: '520px',
      defaultPos: { x: 180, y: 80 }
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

  const isMusicActive = !isStopped;
  const isMusicBackgroundActive = isMusicActive && (!windows.music.isOpen || windows.music.isMinimized);

  const dockItems = [
    { id: 'about', label: 'About Me', icon: <img src="/icons/addressbook.png" className="w-11 h-11 object-contain animate-pulse" alt="About" />, onClick: () => handleDockClick('about'), isOpen: windows.about.isOpen },
    { id: 'mywork', label: 'My Work', icon: <img src="/icons/folder.png" className="w-11 h-11 object-contain" alt="Folder" />, onClick: () => handleDockClick('mywork'), isOpen: windows.mywork.isOpen },
    { id: 'projects', label: 'Projects', icon: <img src="/icons/diskutility.png" className="w-11 h-11 object-contain" alt="Projects" />, onClick: () => handleDockClick('projects'), isOpen: windows.projects.isOpen },
    { id: 'contact', label: 'Socials', icon: <img src="/icons/ichat.png" className="w-11 h-11 object-contain" alt="Socials" />, onClick: () => handleDockClick('contact'), isOpen: windows.contact.isOpen },
    { id: 'terminal', label: 'Terminal', icon: <img src="/icons/terminal_osx.png" className="w-11 h-11 object-contain" alt="Terminal" />, onClick: () => handleDockClick('terminal'), isOpen: windows.terminal.isOpen },
    { 
      id: 'music', 
      label: 'Music Player', 
      icon: (
        <div className="relative w-11 h-11 flex items-center justify-center">
          <img src="/assets/icons/music-icon.jpg" className="w-11 h-11 object-contain rounded-md" alt="Music" />
          {isMusicBackgroundActive && (
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 border border-white"></span>
            </span>
          )}
        </div>
      ), 
      onClick: () => handleDockClick('music'), 
      isOpen: windows.music.isOpen 
    },
    { 
      id: 'minecraft', 
      label: 'Minecraft', 
      icon: <img src="/minecraft.png" className="w-11 h-11 object-contain" alt="Minecraft" />, 
      onClick: () => {
        playClickSound();
        window.open("https://classic.minecraft.net/", "_blank", "noopener,noreferrer");
      }, 
      isOpen: false 
    },
    { 
      id: 'roadrash', 
      label: 'RoadRash', 
      icon: <img src="/roadrash.jpg" className="w-11 h-11 object-cover rounded-md" alt="RoadRash" />, 
      onClick: () => {
        playClickSound();
        window.open("https://dos.zone/road-rash/", "_blank", "noopener,noreferrer");
      }, 
      isOpen: false 
    },
    { 
      id: 'trash', 
      label: 'Trash', 
      icon: (
        <div className={`relative ${isTrashShaking ? 'trash-shake-active' : ''}`}>
          <TrashIcon className="w-11 h-11" />
          {showTrashMsg && (
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-[#fbfaf7] text-zinc-800 text-[10px] font-bold font-retro-mono border-2 border-zinc-800 px-1.5 py-0.5 rounded shadow-md z-30 whitespace-nowrap">
              nothing to delete... yet
            </div>
          )}
        </div>
      ), 
      onClick: handleTrashClick, 
      isOpen: windows.trash.isOpen 
    }
  ];


  return (
    <div className="w-full h-full flex flex-col relative select-none">
      {/* Background Wallpaper matching user reference */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: isMidnight ? 'none' : "url('/wallpaper.png')" }}
      >
        {isMidnight && <StarryNightBackground />}
      </div>

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
            onClick={() => openWindow('terminal')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group w-full text-center"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded group-active:opacity-80">
              <img src="/icons/terminal_osx.png" className="w-12 h-12 object-contain" alt="Terminal" />
            </div>
            <span className="text-[10px] font-bold tracking-wide text-zinc-900 bg-white/70 px-1 rounded shadow-sm border border-zinc-300">
              terminal
            </span>
          </button>

          {/* Resume Document Icon */}
          <button 
            onClick={() => openWindow('resume')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group w-full text-center"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded group-active:opacity-80">
              <img src="/resume_icon.png" className="w-12 h-12 object-contain" alt="Resume" />
            </div>
            <span className="text-[10px] font-bold tracking-wide text-zinc-900 bg-white/70 px-1 rounded shadow-sm border border-zinc-300">
              resume
            </span>
          </button>

          {/* Trash Icon */}
          <button 
            onClick={() => handleTrashClick()}
            className={`flex flex-col items-center gap-1.5 cursor-pointer group w-full text-center ${isTrashShaking ? 'trash-shake-active' : ''}`}
          >
            <div className="w-12 h-12 flex items-center justify-center rounded group-active:opacity-80 relative">
              <TrashIcon />
              {showTrashMsg && (
                <div className="absolute bottom-full mb-1 bg-[#fbfaf7] text-zinc-800 text-[10px] font-bold font-retro-mono border-2 border-zinc-800 px-1.5 py-0.5 rounded shadow-md z-30 whitespace-nowrap">
                  nothing to delete... yet
                </div>
              )}
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

        {/* Terminal Window */}
        <Window
          id="terminal"
          title="terminal"
          isOpen={windows.terminal.isOpen}
          isMinimized={windows.terminal.isMinimized}
          onClose={() => closeWindow('terminal')}
          onMinimize={() => minimizeWindow('terminal')}
          onFocus={() => focusWindow('terminal')}
          zIndex={windows.terminal.zIndex}
          width={windows.terminal.width}
          height={windows.terminal.height}
          defaultPosition={windows.terminal.defaultPos}
          desktopRef={desktopRef}
          resizable={true}
        >
          <Terminal onClose={() => closeWindow('terminal')} />
        </Window>

        {/* Music Player Window */}
        <Window
          id="music"
          title="music player"
          isOpen={windows.music.isOpen}
          isMinimized={windows.music.isMinimized}
          onClose={() => closeWindow('music')}
          onMinimize={() => minimizeWindow('music')}
          onFocus={() => focusWindow('music')}
          zIndex={windows.music.zIndex}
          width={windows.music.width}
          height={windows.music.height}
          defaultPosition={windows.music.defaultPos}
          desktopRef={desktopRef}
          resizable={false}
        >
          <MusicPlayer
            tracks={TRACKS}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            isStopped={isStopped}
            volume={volume}
            playTrack={playTrack}
            togglePlay={togglePlay}
            stopTrack={stopTrack}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
            seek={seek}
            setVolume={setVolume}
          />
        </Window>

        {/* Secret Dossier Window */}
        <Window
          id="secret"
          title="classified bio"
          isOpen={windows.secret.isOpen}
          isMinimized={windows.secret.isMinimized}
          onClose={() => closeWindow('secret')}
          onMinimize={() => minimizeWindow('secret')}
          onFocus={() => focusWindow('secret')}
          zIndex={windows.secret.zIndex}
          width={windows.secret.width}
          height={windows.secret.height}
          defaultPosition={windows.secret.defaultPos}
          desktopRef={desktopRef}
        >
          <SecretBioContent />
        </Window>

        {/* Hacker Console Window */}
        <Window
          id="hacker"
          title="secret_console.sh"
          isOpen={windows.hacker.isOpen}
          isMinimized={windows.hacker.isMinimized}
          onClose={() => closeWindow('hacker')}
          onMinimize={() => minimizeWindow('hacker')}
          onFocus={() => focusWindow('hacker')}
          zIndex={windows.hacker.zIndex}
          width={windows.hacker.width}
          height={windows.hacker.height}
          defaultPosition={windows.hacker.defaultPos}
          desktopRef={desktopRef}
        >
          <HackerConsole />
        </Window>

        {/* Resume Window */}
        <Window
          id="resume"
          title="shashwat_resume.pdf"
          isOpen={windows.resume.isOpen}
          isMinimized={windows.resume.isMinimized}
          onClose={() => closeWindow('resume')}
          onMinimize={() => minimizeWindow('resume')}
          onFocus={() => focusWindow('resume')}
          zIndex={windows.resume.zIndex}
          width={windows.resume.width}
          height={windows.resume.height}
          defaultPosition={windows.resume.defaultPos}
          desktopRef={desktopRef}
        >
          <ResumeContent />
        </Window>
      </div>

      {/* Hidden audio element for background playing */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />

      {/* Floating Dock */}
      <Dock items={dockItems} />
    </div>
  );
};
