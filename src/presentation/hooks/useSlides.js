import { useState, useCallback } from 'react';

/**
 * useSlides - Hook for managing slide navigation
 */
const useSlides = (slides) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPresentationStarted, setIsPresentationStarted] = useState(false);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
    }
  }, [slides.length]);

  const goToPreviousSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex, slides.length]);

  const startPresentation = useCallback(() => {
    setIsPresentationStarted(true);
  }, []);

  const canGoPrevious = currentSlideIndex > 0;
  const canGoNext = currentSlideIndex < slides.length - 1;
  const currentSlide = slides[currentSlideIndex];

  return {
    currentSlideIndex,
    currentSlide,
    isPresentationStarted,
    canGoPrevious,
    canGoNext,
    goToSlide,
    goToPreviousSlide,
    goToNextSlide,
    startPresentation,
  };
};

export default useSlides;
