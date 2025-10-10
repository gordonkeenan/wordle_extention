import { useState, useEffect, type ReactNode } from 'react';
import type { DeckSpec, Slide } from '@preso/core';
import { ThemeProvider } from './useTheme.js';
import { ThemeVarsHandler } from '@preso/core';

/**
 * PresoRoot props
 */
export interface PresoRootProps {
  deckSpec: DeckSpec;
  currentSlideIndex?: number;
  onSlideChange?: (index: number) => void;
  renderSlide: (slide: Slide, index: number) => ReactNode;
}

/**
 * Root component for presentations
 */
export function PresoRoot({ 
  deckSpec, 
  currentSlideIndex = 0,
  onSlideChange,
  renderSlide 
}: PresoRootProps) {
  const [slideIndex, setSlideIndex] = useState(currentSlideIndex);

  // Sync with external slide index
  useEffect(() => {
    setSlideIndex(currentSlideIndex);
  }, [currentSlideIndex]);

  // Apply theme variables to document root
  useEffect(() => {
    if (deckSpec.theme && typeof document !== 'undefined') {
      const root = document.documentElement;
      ThemeVarsHandler.applyToElement(root, deckSpec.theme.vars);
    }
  }, [deckSpec.theme]);

  const currentSlide = deckSpec.slides[slideIndex];
  const theme = deckSpec.theme || ThemeVarsHandler.createDefault();

  const handleNext = () => {
    if (slideIndex < deckSpec.slides.length - 1) {
      const newIndex = slideIndex + 1;
      setSlideIndex(newIndex);
      onSlideChange?.(newIndex);
    }
  };

  const handlePrevious = () => {
    if (slideIndex > 0) {
      const newIndex = slideIndex - 1;
      setSlideIndex(newIndex);
      onSlideChange?.(newIndex);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === ' ') {
      event.preventDefault();
      handleNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      handlePrevious();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  if (!currentSlide) {
    return <div className="preso-root">No slide found</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="preso-root">
        <div className="preso-viewport">
          {renderSlide(currentSlide, slideIndex)}
        </div>
        <div className="preso-controls">
          <button 
            onClick={handlePrevious} 
            disabled={slideIndex === 0}
            className="preso-control-button"
          >
            Previous
          </button>
          <span className="preso-slide-counter">
            {slideIndex + 1} / {deckSpec.slides.length}
          </span>
          <button 
            onClick={handleNext} 
            disabled={slideIndex === deckSpec.slides.length - 1}
            className="preso-control-button"
          >
            Next
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
}
