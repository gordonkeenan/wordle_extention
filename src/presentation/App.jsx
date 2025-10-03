import React from 'react';
import { getSlides, getPropagandaSlideIndex } from '@/presentation/utils/slidesData.js';
import useSlides from '@/presentation/hooks/useSlides.js';
import usePresentation from '@/presentation/hooks/usePresentation.js';
import Slide from '@/presentation/components/Slide.jsx';
import Navigation from '@/presentation/components/Navigation.jsx';
import PropagandaOverlay from '@/presentation/components/PropagandaOverlay.jsx';
import SnarkOverlay from '@/presentation/components/SnarkOverlay.jsx';

// Import the couch image
import couchImage from './assets/IMG_5384.jpg';

/**
 * App - Main presentation component
 */
const App = ({ config = 'full' }) => {
  const slides = getSlides(config);
  const propagandaSlideIndex = getPropagandaSlideIndex(config);

  const {
    currentSlideIndex,
    currentSlide,
    isPresentationStarted,
    canGoPrevious,
    canGoNext,
    goToPreviousSlide,
    goToNextSlide,
    startPresentation,
  } = useSlides(slides);

  const {
    showPropaganda,
    showSnark,
    currentSlideSnark,
    handleSnarkComplete,
  } = usePresentation(
    currentSlideIndex,
    slides,
    goToNextSlide,
    goToPreviousSlide,
    propagandaSlideIndex
  );

  const isStartScreen = currentSlideIndex === 0 && !isPresentationStarted;

  return (
    <div className="bg-wordle-dark text-wordle-light min-h-screen p-4 md:p-8">
      {/* Propaganda Overlay */}
      <PropagandaOverlay isActive={showPropaganda} />

      {/* Snark Overlay */}
      <SnarkOverlay 
        snark={currentSlideSnark} 
        isActive={showSnark} 
        onComplete={handleSnarkComplete}
      />

      {/* Main presentation card */}
      <div className="w-11/12 max-w-7xl mx-auto bg-gray-900 shadow-2xl rounded-xl p-6 md:p-16 relative z-10">
        {/* Header */}
        <header 
          className={`mb-6 pb-4 transition-opacity ${
            isStartScreen ? 'opacity-0 border-b-0' : 'opacity-100 border-b border-gray-700'
          }`}
        >
          <h1 className="text-3xl font-extrabold text-green-400">Couch Developer</h1>
          <p className="text-sm text-gray-400">
            Gordon Keenan — 2025 | Slide <span>{currentSlideIndex + 1}</span> of {slides.length}
          </p>
        </header>

        {/* Slide Content */}
        <div className="min-h-[70vh] flex flex-col justify-between">
          <Slide
            slide={currentSlide}
            slideIndex={currentSlideIndex}
            isPresentationStarted={isPresentationStarted}
            isStartScreen={isStartScreen}
            onStartPresentation={startPresentation}
            couchImageSrc={couchImage}
          />
        </div>

        {/* Footer with Navigation */}
        <footer 
          className={`mt-8 pt-4 border-t border-gray-700 transition-opacity ${
            isStartScreen ? 'hidden' : 'block'
          }`}
        >
          {/* Speaker notes (hidden) */}
          <ul className="hidden">
            {currentSlide?.notes?.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>

          {/* Navigation */}
          <Navigation
            onPrevious={goToPreviousSlide}
            onNext={goToNextSlide}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
        </footer>
      </div>
    </div>
  );
};

export default App;
