import React from 'react';
import Tracker from './Tracker.jsx';

/**
 * Slide - Individual slide component
 */
const Slide = ({ 
  slide, 
  slideIndex, 
  isPresentationStarted, 
  isStartScreen,
  onStartPresentation,
  couchImageSrc 
}) => {
  if (isStartScreen) {
    // Start screen with couch image
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div
            onClick={onStartPresentation}
            className="w-[35.8rem] h-[35.8rem] bg-transparent border-green-500 border-4 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer hover:scale-105 hover:shadow-green-500/50"
          >
            <img
              src={couchImageSrc}
              alt="Couch Coder (AI Development)"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-6 text-gray-400 text-4xl text-center">
            The trials and tribulations of being a couch developer
          </p>
        </div>
      </div>
    );
  }

  // Regular slide
  return (
    <div className="flex flex-col items-center mb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-6 leading-tight">
        {slide.title}
      </h2>
      {slide.tracker && (
        <div className="flex justify-center mb-6">
          <Tracker 
            word={slide.tracker} 
            slideIndex={slideIndex} 
            isPresentationStarted={isPresentationStarted}
          />
        </div>
      )}
      <div 
        className="flex-grow text-center"
        dangerouslySetInnerHTML={{ __html: slide.content }}
      />
    </div>
  );
};

export default Slide;
