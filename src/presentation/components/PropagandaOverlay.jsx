import React from 'react';

/**
 * PropagandaOverlay - Red overlay with "PROPAGANDA" text
 */
const PropagandaOverlay = ({ isActive }) => {
  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full bg-red-600/85 z-[9999] flex items-center justify-center transition-opacity duration-300 pointer-events-none ${
        isActive ? 'opacity-100 pointer-events-all' : 'opacity-0'
      }`}
    >
      <div className="text-6xl md:text-8xl font-black text-white tracking-[0.2em] propaganda-pulse">
        PROPAGANDA
      </div>
    </div>
  );
};

export default PropagandaOverlay;
