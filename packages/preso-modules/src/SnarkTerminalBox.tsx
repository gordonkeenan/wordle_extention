import React, { useState, useEffect } from 'react';

export interface SnarkTerminalBoxProps {
  messages: string[];
  typingSpeed?: number;
  className?: string;
  autoStart?: boolean;
  large?: boolean;
}

export function SnarkTerminalBox({
  messages,
  typingSpeed = 50,
  className = '',
  autoStart = true,
  large = false,
}: SnarkTerminalBoxProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(autoStart);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isTyping || currentMessageIndex >= messages.length) {
      return;
    }

    const currentMessage = messages[currentMessageIndex];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < currentMessage.length) {
        setDisplayedText((prev) => prev + currentMessage[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        if (currentMessageIndex < messages.length - 1) {
          setTimeout(() => {
            setDisplayedText((prev) => prev + '\n');
            setCurrentMessageIndex((prev) => prev + 1);
          }, 500);
        } else {
          setIsTyping(false);
        }
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isTyping, currentMessageIndex, messages, typingSpeed]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  const sizeClass = large ? 'preso-snark-large' : '';

  return (
    <div className={`preso-snark-terminal ${sizeClass} ${className}`}>
      <div className="preso-snark-content">
        <pre className="preso-snark-text">
          {displayedText}
          {showCursor && <span className="preso-snark-cursor">_</span>}
        </pre>
      </div>
    </div>
  );
}
