import React, { useEffect, useRef } from 'react';
import type { CompiledDeck } from '@preso/core';
import { ThemeProvider } from './useTheme.js';
import { SlideHost } from './SlideHost.js';

export interface PresoRootProps {
  deck: CompiledDeck;
  currentSlide?: number;
  onSlideChange?: (index: number) => void;
}

export function PresoRoot({ deck, currentSlide = 0, onSlideChange }: PresoRootProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Apply theme CSS variables to root element
  useEffect(() => {
    if (rootRef.current) {
      Object.entries(deck.theme).forEach(([category, values]) => {
        if (typeof values === 'object') {
          Object.entries(values).forEach(([key, value]) => {
            if (typeof value === 'string') {
              rootRef.current!.style.setProperty(`--preso-${category}-${key}`, value);
            }
          });
        }
      });
    }
  }, [deck.theme]);

  const slide = deck.slides[currentSlide];

  if (!slide) {
    return (
      <div ref={rootRef} className="preso-root">
        <div className="preso-error">Slide not found</div>
      </div>
    );
  }

  return (
    <ThemeProvider theme={deck.theme}>
      <div ref={rootRef} className="preso-root">
        <SlideHost compiledSlide={slide} />
      </div>
    </ThemeProvider>
  );
}
