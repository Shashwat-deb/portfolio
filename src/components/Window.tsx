import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { playClickSound } from '../utils/audio';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  width?: string;
  height?: string;
  desktopRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  defaultPosition = { x: 100, y: 100 },
  width = '500px',
  height = '400px',
  desktopRef,
  children
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  if (!isOpen) return null;

  const handlePointerDown = () => {
    onFocus();
  };

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    onClose();
  };

  const handleMinimizeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    onMinimize();
  };

  return (
    <motion.div
      id={id}
      ref={windowRef}
      drag
      dragListener={false}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={desktopRef}
      onPointerDown={handlePointerDown}
      initial={{ 
        x: defaultPosition.x, 
        y: defaultPosition.y, 
        scale: 0.9, 
        opacity: 0 
      }}
      animate={{ 
        scale: isMinimized ? 0 : 1, 
        opacity: isMinimized ? 0 : 1, 
        y: isMinimized ? 600 : defaultPosition.y, 
        transition: { type: 'spring', stiffness: 350, damping: 28 }
      }}
      style={{ 
        zIndex, 
        position: 'absolute',
        width, 
        height 
      }}
      className="bg-[#fbfaf7] border-2 border-zinc-800 retro-border-shadow flex flex-col overflow-hidden"
    >
      {/* Title Bar (Pinstripe Background & Drag Handle) */}
      <div 
        onPointerDown={(e) => {
          onFocus();
          dragControls.start(e);
        }}
        className="h-8 border-b-2 border-zinc-800 titlebar-stripes-bg flex items-center px-3 select-none justify-between cursor-move"
      >
        {/* Left: Classic Traffic Lights */}
        <div className="flex items-center gap-1.5 w-1/4">
          <button 
            onClick={handleCloseClick}
            className="w-3.5 h-3.5 rounded-full border border-zinc-800 bg-[#ff5f56] flex items-center justify-center cursor-pointer hover:brightness-95 active:brightness-75"
            title="Close"
          />
          <button 
            onClick={handleMinimizeClick}
            className="w-3.5 h-3.5 rounded-full border border-zinc-800 bg-[#ffbd2e] flex items-center justify-center cursor-pointer hover:brightness-95 active:brightness-75"
            title="Minimize"
          />
          <button 
            onClick={onFocus}
            className="w-3.5 h-3.5 rounded-full border border-zinc-800 bg-[#27c93f] flex items-center justify-center cursor-pointer hover:brightness-95 active:brightness-75"
            title="Focus"
          />
        </div>

        {/* Center: Title */}
        <div className="text-center font-retro-serif font-bold text-xs text-zinc-800 tracking-wider truncate w-2/4">
          {title.toLowerCase()}
        </div>

        {/* Right side spacer to keep centering */}
        <div className="w-1/4" />
      </div>

      {/* Window Body (Stripe pattern overlay) */}
      <div className="flex-grow overflow-auto p-4 relative window-pinstripe-bg select-text">
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
