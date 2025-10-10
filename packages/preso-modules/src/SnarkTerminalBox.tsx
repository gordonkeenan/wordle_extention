import { useState, useEffect, useRef } from 'react';

/**
 * SnarkTerminalBox props
 */
export interface SnarkTerminalBoxProps {
  lines?: string[];
  typingSpeed?: number;
  large?: boolean;
  autoStart?: boolean;
  cursor?: boolean;
}

/**
 * Terminal-style text display with typing animation
 * Inspired by the snark overlay in the original presentation
 */
export function SnarkTerminalBox({ 
  lines = [],
  typingSpeed = 50,
  large = false,
  autoStart = true,
  cursor = true
}: SnarkTerminalBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!autoStart || lines.length === 0) {
      return;
    }

    setIsTyping(true);
    let charIndex = 0;
    let lineIndex = 0;
    let accumulated = '';

    const type = () => {
      if (lineIndex >= lines.length) {
        setIsTyping(false);
        return;
      }

      const currentLine = lines[lineIndex];
      
      if (charIndex < currentLine.length) {
        accumulated += currentLine[charIndex];
        setDisplayedText(accumulated);
        charIndex++;
        timeoutRef.current = setTimeout(type, typingSpeed);
      } else {
        // Move to next line
        accumulated += '\n';
        setDisplayedText(accumulated);
        lineIndex++;
        setCurrentLineIndex(lineIndex);
        charIndex = 0;
        
        if (lineIndex < lines.length) {
          timeoutRef.current = setTimeout(type, typingSpeed * 5);
        } else {
          setIsTyping(false);
        }
      }
    };

    type();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [lines, typingSpeed, autoStart]);

  const className = `snark-terminal-box ${large ? 'large' : ''}`;

  return (
    <div className={className}>
      <div className="snark-terminal-content">
        {displayedText.split('\n').map((line, index) => (
          <div key={index} className="snark-terminal-line">
            {line}
          </div>
        ))}
        {cursor && isTyping && (
          <span className="snark-terminal-cursor">▋</span>
        )}
      </div>
    </div>
  );
}

/**
 * Component metadata for plugin registry
 */
export const SnarkTerminalBoxMeta = {
  name: 'SnarkTerminalBox',
  version: '1.0.0',
  description: 'Terminal-style text display with typing animation',
  schema: {
    type: 'object',
    properties: {
      lines: {
        type: 'array',
        items: { type: 'string' },
        description: 'Lines of text to display',
      },
      typingSpeed: {
        type: 'number',
        description: 'Typing speed in milliseconds per character',
        default: 50,
      },
      large: {
        type: 'boolean',
        description: 'Use larger text size',
        default: false,
      },
      autoStart: {
        type: 'boolean',
        description: 'Start typing animation automatically',
        default: true,
      },
      cursor: {
        type: 'boolean',
        description: 'Show typing cursor',
        default: true,
      },
    },
  },
};
