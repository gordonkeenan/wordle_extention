import React from 'react';

/**
 * TrackerTile - Represents a single Wordle tile
 */
const TrackerTile = ({ 
  letter, 
  index, 
  colorClass, 
  outline = '', 
  animationClass = '', 
  delay = 0,
  infinite = false 
}) => {
  const style = {
    animationDelay: `${delay}s`,
    animationIterationCount: infinite ? 'infinite' : '1'
  };

  return (
    <div 
      className={`tracker-tile ${colorClass} ${animationClass} ${outline}`}
      style={style}
    >
      {letter}
    </div>
  );
};

export default TrackerTile;
