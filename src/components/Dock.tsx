import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { playClickSound } from '../utils/audio';

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  isOpen: boolean;
}

interface DockProps {
  items: DockItem[];
}

interface DockItemComponentProps {
  item: DockItem;
  idx: number;
  scale: number;
  showDividerBefore: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}

const DockItemComponent: React.FC<DockItemComponentProps> = ({
  item,
  idx,
  scale,
  showDividerBefore,
  hoveredIndex,
  setHoveredIndex
}) => {
  const controls = useAnimation();

  const handleClick = () => {
    playClickSound();
    // Trigger bounce animation
    controls.start({
      y: [0, -24, 0, -10, 0],
      transition: { duration: 0.6, ease: 'easeOut' }
    });
    item.onClick();
  };

  return (
    <React.Fragment>
      {showDividerBefore && (
        <div 
          className="w-[1.5px] h-11 bg-black/35 shadow-[1px_0_0_rgba(255,255,255,0.45)] mx-2 self-end mb-3.5" 
        />
      )}
      
      <div 
        className="flex flex-col items-center justify-end relative pb-1.5"
        onMouseEnter={() => setHoveredIndex(idx)}
      >
        {/* Tooltip Label (Pill capsule style) */}
        {hoveredIndex === idx && (
          <div 
            className="absolute -top-11 left-1/2 transform -translate-x-1/2 bg-[#f3f3f3]/95 border border-black/15 text-zinc-800 text-[10px] font-sans font-bold px-3 py-0.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none z-50"
          >
            {item.label}
          </div>
        )}

        {/* Icon button */}
        <motion.div
          style={{ originY: 1.0 }}
          animate={{ scale }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-12 h-12 flex items-center justify-center"
        >
          <motion.button
            animate={controls}
            onClick={handleClick}
            className="w-full h-full flex items-center justify-center cursor-pointer focus:outline-none"
          >
            {/* Borderless float style with high-quality drop shadow */}
            <div className="w-12 h-12 flex items-center justify-center filter drop-shadow-[0_4px_5px_rgba(0,0,0,0.35)] hover:drop-shadow-[0_6px_8px_rgba(0,0,0,0.45)] transition-all">
              {item.icon}
            </div>
          </motion.button>
        </motion.div>

        {/* Status Indicator Triangle (Matching macOS open app indicator) */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center h-3">
          {item.isOpen && (
            <motion.span 
              layoutId={`dock-triangle-${item.id}`}
              className="text-[7px] text-zinc-900 select-none pointer-events-none drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]"
            >
              ▲
            </motion.span>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export const Dock: React.FC<DockProps> = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dynamic scaling based on hover proximity
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1.0;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.35; // Hovered
    if (distance === 1) return 1.15; // Immediate neighbor
    return 1.0;
  };

  return (
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-40 select-none">
      {/* Dock Container (3D Translucent Glass Shelf style) */}
      <div 
        className="flex items-end gap-4 px-6 pb-2.5 pt-3.5 backdrop-blur-lg rounded-2xl"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.45) 0%, rgba(220, 230, 242, 0.3) 15%, rgba(120, 145, 180, 0.35) 50%, rgba(70, 95, 130, 0.55) 100%)', 
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.55), inset 0 1px 0px rgba(255, 255, 255, 0.75), inset 0 -1px 2px rgba(0, 0, 0, 0.3)'
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {items.map((item, idx) => (
          <DockItemComponent
            key={item.id}
            item={item}
            idx={idx}
            scale={getScale(idx)}
            showDividerBefore={item.id === 'trash'}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
};
