import { useState, useEffect, useCallback } from 'react';

/**
 * usePresentation - Hook for managing presentation state (overlays, keyboard shortcuts)
 */
const usePresentation = (currentSlideIndex, slides, goToNextSlide, goToPreviousSlide, propagandaSlideIndex) => {
  const [showPropaganda, setShowPropaganda] = useState(false);
  const [showSnark, setShowSnark] = useState(false);
  const [snarkTimeout, setSnarkTimeout] = useState(null);

  const currentSlide = slides[currentSlideIndex];

  // Show snark overlay if slide has snark
  useEffect(() => {
    if (currentSlide?.snark) {
      const timeout = setTimeout(() => {
        setShowSnark(true);
      }, 3000);
      setSnarkTimeout(timeout);

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    } else {
      setShowSnark(false);
      if (snarkTimeout) {
        clearTimeout(snarkTimeout);
        setSnarkTimeout(null);
      }
    }
  }, [currentSlideIndex, currentSlide]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        event.preventDefault();
        
        // Special behavior for propaganda overlay slide
        if (currentSlideIndex === propagandaSlideIndex) {
          setShowPropaganda(true);
          setTimeout(() => {
            setShowPropaganda(false);
          }, 3000);
        } else {
          goToNextSlide();
        }
      } else if (event.code === 'ArrowRight') {
        event.preventDefault();
        goToNextSlide();
      } else if (event.code === 'ArrowLeft') {
        event.preventDefault();
        goToPreviousSlide();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideIndex, propagandaSlideIndex, goToNextSlide, goToPreviousSlide]);

  const handleSnarkComplete = useCallback(() => {
    // Snark overlay completed typing
  }, []);

  return {
    showPropaganda,
    showSnark,
    currentSlideSnark: currentSlide?.snark,
    handleSnarkComplete,
  };
};

export default usePresentation;
