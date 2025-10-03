import React, { useEffect, useRef, useState } from 'react';

/**
 * SnarkOverlay - Terminal-style snark overlay with typing animation
 */
const SnarkOverlay = ({ snark, isActive, onComplete }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isActive || !snark) {
      setDisplayedLines([]);
      setCurrentLine('');
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    const lines = Array.isArray(snark) ? snark : [snark];
    
    intervalRef.current = setInterval(() => {
      if (currentLineIndex >= lines.length) {
        clearInterval(intervalRef.current);
        if (onComplete) onComplete();
        return;
      }

      const line = lines[currentLineIndex];
      
      if (currentCharIndex >= line.length) {
        setDisplayedLines(prev => [...prev, currentLine]);
        setCurrentLine('');
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        return;
      }

      setCurrentLine(prev => prev + line[currentCharIndex]);
      setCurrentCharIndex(prev => prev + 1);
    }, 30);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, snark, currentLineIndex, currentCharIndex, currentLine, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/90 z-[9998] flex items-start justify-start p-4 font-mono text-green-400 transition-opacity duration-300">
      <div className="w-full">
        <div className="mb-1 text-green-500 font-bold">&gt;</div>
        <div className="ml-5">
          {displayedLines.map((line, index) => (
            <div key={index} className="mb-1 text-white">{line}</div>
          ))}
          {currentLine && (
            <div className="text-white">
              {currentLine}
              <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SnarkOverlay;
