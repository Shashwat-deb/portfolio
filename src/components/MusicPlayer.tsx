import React, { useEffect, useRef } from 'react';
import { Play, Pause, Square, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';

interface Track {
  name: string;
  url: string;
  duration: string;
  seconds: number;
}

interface VinylDiscProps {
  isPlaying: boolean;
  isStopped: boolean;
  iconUrl: string;
}

export const VinylDisc: React.FC<VinylDiscProps> = ({ isPlaying, isStopped, iconUrl }) => {
  const discRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0); // current angular velocity in degrees per second
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1); // cap dt to avoid huge jumps
      lastTime = time;

      // Target velocity in degrees per second:
      // ~33 RPM = 33 * 360 / 60 = 198 deg/sec. Let's use 200 deg/sec.
      const targetVelocity = isPlaying && !isStopped ? 200 : 0;

      if (velocityRef.current < targetVelocity) {
        // Speeds back up smoothly (ease-in, ~0.5s)
        // acceleration = 200 / 0.5 = 400 deg/sec^2
        velocityRef.current = Math.min(
          velocityRef.current + 400 * dt,
          targetVelocity
        );
      } else if (velocityRef.current > targetVelocity) {
        // Smoothly slows to a stop (ease-out, ~0.8s)
        // deceleration = 200 / 0.8 = 250 deg/sec^2
        velocityRef.current = Math.max(
          velocityRef.current - 250 * dt,
          targetVelocity
        );
      }

      // Update rotation angle
      rotationRef.current = (rotationRef.current + velocityRef.current * dt) % 360;

      if (discRef.current) {
        discRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [isPlaying, isStopped]);

  return (
    <div className="flex items-center justify-center py-4">
      {/* Outer Vinyl Circle with Grooves */}
      <div 
        ref={discRef}
        className="w-36 h-36 rounded-full border-4 border-zinc-800 bg-[#151518] relative shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center justify-center select-none"
        style={{
          background: `
            radial-gradient(circle, #242427 1px, transparent 1px),
            radial-gradient(circle, transparent 35%, rgba(0, 0, 0, 0.45) 36%, rgba(0, 0, 0, 0.45) 38%, transparent 39%),
            radial-gradient(circle, transparent 45%, rgba(0, 0, 0, 0.45) 46%, rgba(0, 0, 0, 0.45) 48%, transparent 49%),
            radial-gradient(circle, transparent 55%, rgba(0, 0, 0, 0.45) 56%, rgba(0, 0, 0, 0.45) 58%, transparent 59%),
            radial-gradient(circle, transparent 65%, rgba(0, 0, 0, 0.45) 66%, rgba(0, 0, 0, 0.45) 68%, transparent 69%),
            radial-gradient(circle, transparent 75%, rgba(0, 0, 0, 0.45) 76%, rgba(0, 0, 0, 0.45) 78%, transparent 79%),
            #151518
          `
        }}
      >
        {/* Vinyl Shiny reflection overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-bl from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* CD Disc / Label in Center */}
        <div className="w-14 h-14 rounded-full border-2 border-zinc-800 bg-white relative flex items-center justify-center overflow-hidden shadow-inner">
          <img 
            src={iconUrl} 
            className="w-full h-full object-cover rounded-full" 
            alt="Track Label"
          />
          {/* Center Spindle Hole */}
          <div className="absolute w-3.5 h-3.5 rounded-full bg-[#fbfaf7] border-2 border-zinc-800" />
        </div>
      </div>
    </div>
  );
};

interface MusicPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isStopped: boolean;
  volume: number;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  stopTrack: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  isStopped,
  volume,
  playTrack,
  togglePlay,
  stopTrack,
  nextTrack,
  prevTrack,
  seek,
  setVolume
}) => {
  const currentTrack = tracks[currentTrackIndex];

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const marqueeText = isStopped
    ? "Player Stopped - Select a song to begin"
    : `Now Playing: ${currentTrack.name} (${currentTrack.duration})  •  `;

  return (
    <div className="font-retro-mono text-zinc-800 text-xs flex flex-col h-full gap-3 select-none">
      {/* 1. Digital Marquee Ticker */}
      <div className="border-2 border-zinc-800 bg-zinc-950 text-emerald-400 p-2 font-mono text-xs rounded shadow-inner overflow-hidden relative flex items-center h-8">
        <div className="marquee-container">
          <div className="marquee-content">
            {marqueeText} {marqueeText}
          </div>
        </div>
      </div>

      {/* 2. Vinyl Record Area */}
      <VinylDisc
        isPlaying={isPlaying}
        isStopped={isStopped}
        iconUrl="/assets/icons/music-icon.jpg"
      />

      {/* 3. Timeline Progress Slider */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-2 bg-zinc-300 rounded-lg appearance-none cursor-pointer border border-zinc-800 accent-zinc-800"
          style={{
            backgroundImage: `linear-gradient(to right, #27272a 0%, #27272a ${(currentTime / (duration || 1)) * 100}%, #d4d4d8 ${(currentTime / (duration || 1)) * 100}%, #d4d4d8 100%)`
          }}
        />
      </div>

      {/* 4. Controls Panel */}
      <div className="flex items-center justify-between border-t border-b border-zinc-300 py-2.5 px-2">
        {/* Playback buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevTrack}
            className="w-8 h-8 rounded border-2 border-zinc-800 bg-[#fbfaf7] retro-border-shadow flex items-center justify-center cursor-pointer hover:bg-zinc-100 active:translate-y-0.5"
            title="Previous"
          >
            <SkipBack size={14} className="fill-zinc-800" />
          </button>
          
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded border-2 border-zinc-800 bg-[#fbfaf7] retro-border-shadow flex items-center justify-center cursor-pointer hover:bg-zinc-100 active:translate-y-0.5"
            title={isPlaying && !isStopped ? "Pause" : "Play"}
          >
            {isPlaying && !isStopped ? (
              <Pause size={16} className="fill-zinc-800" />
            ) : (
              <Play size={16} className="fill-zinc-800 ml-0.5" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="w-8 h-8 rounded border-2 border-zinc-800 bg-[#fbfaf7] retro-border-shadow flex items-center justify-center cursor-pointer hover:bg-zinc-100 active:translate-y-0.5"
            title="Next"
          >
            <SkipForward size={14} className="fill-zinc-800" />
          </button>

          <button
            onClick={stopTrack}
            className="w-8 h-8 rounded border-2 border-zinc-800 bg-[#ffefef] text-red-700 retro-border-shadow flex items-center justify-center cursor-pointer hover:bg-[#ffe5e5] active:translate-y-0.5 font-bold"
            title="Stop"
          >
            <Square size={12} className="fill-red-700" />
          </button>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setVolume(volume > 0 ? 0 : 0.8)} 
            className="text-zinc-600 hover:text-zinc-900 cursor-pointer"
            title="Mute/Unmute"
          >
            {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1.5 bg-zinc-300 rounded-lg appearance-none cursor-pointer border border-zinc-700 accent-zinc-800"
            style={{
              backgroundImage: `linear-gradient(to right, #27272a 0%, #27272a ${volume * 100}%, #d4d4d8 ${volume * 100}%, #d4d4d8 100%)`
            }}
          />
        </div>
      </div>

      {/* 5. Playlist Container */}
      <div className="flex-grow flex flex-col min-h-0 border-2 border-zinc-800 bg-[#f4efeb] retro-border-shadow rounded overflow-hidden">
        <div className="bg-zinc-800 text-white font-bold px-2 py-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider select-none border-b-2 border-zinc-800">
          <Music size={12} />
          <span>Tracklist Playlist</span>
        </div>
        <div className="flex-grow overflow-y-auto no-scrollbar">
          {tracks.map((track, idx) => {
            const isCurrent = idx === currentTrackIndex;
            const isPlayingThis = isCurrent && isPlaying && !isStopped;
            return (
              <div
                key={idx}
                onClick={() => playTrack(idx)}
                className={`flex justify-between items-center px-3 py-2 border-b border-zinc-300 cursor-pointer transition-colors duration-100 text-[11px] font-semibold ${
                  isCurrent 
                    ? 'bg-zinc-800 text-white border-b-zinc-800' 
                    : 'hover:bg-zinc-200 text-zinc-800'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={`w-3.5 text-center text-[9px] ${isCurrent ? 'text-emerald-400' : 'text-zinc-400'}`}>
                    {isPlayingThis ? '▶' : idx + 1}
                  </span>
                  <span className="truncate">{track.name}</span>
                </div>
                <span className={`text-[10px] ${isCurrent ? 'text-zinc-300' : 'text-zinc-500'} flex-shrink-0 font-bold ml-2`}>
                  {track.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
