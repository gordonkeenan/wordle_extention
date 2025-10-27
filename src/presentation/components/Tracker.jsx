import React from 'react';
import TrackerTile from './TrackerTile.jsx';

/**
 * getTileColor - Determines color based on position in the word
 */
const getTileColor = (letter, index, word) => {
  if (index === 0 || index === 4) return 'bg-wordle-green text-white';
  if (index === 1 || index === 3) return 'bg-wordle-yellow text-white';
  return 'bg-wordle-gray text-white';
};

/**
 * Tracker - Renders the tracker display (Wordle tiles)
 */
const Tracker = ({ word, slideIndex, isPresentationStarted }) => {
  const isFinalSlide = slideIndex === 20; // Slide 21 is index 20
  const isPurpleSlide = slideIndex === 5; // Slide 6 is index 5 (PAST tracker)
  const isBlueSlide = slideIndex === 4; // Slide 5 is index 4 (VALID tracker)
  const isInvalidSlide = word === "INVALID";

  // Handle array of trackers (for slide with multiple trackers)
  if (Array.isArray(word)) {
    return (
      <div className="grid grid-rows-2 gap-8 justify-items-center">
        {word.map((trackerWord, trackerIndex) => (
          <div key={trackerIndex} className="flex justify-center">
            {Array.from(trackerWord).map((letter, letterIndex) => {
              const colorClass = isFinalSlide 
                ? 'bg-wordle-green text-white' 
                : getTileColor(letter, letterIndex, trackerWord);
              
              let outline = '';
              if (isPurpleSlide) {
                outline = 'border-2 border-purple-500';
              } else if (isBlueSlide && trackerWord === "VALID") {
                outline = 'border-2 border-blue-500';
              } else if (trackerWord === "INVALID") {
                outline = 'border-2 border-red-500';
              }
              
              const delay = (trackerIndex * trackerWord.length + letterIndex) * 0.1;
              const animationClass = slideIndex === 0 
                ? (isPresentationStarted ? 'animated-tile' : '') 
                : 'animated-tile';

              return (
                <TrackerTile
                  key={letterIndex}
                  letter={letter}
                  index={letterIndex}
                  colorClass={colorClass}
                  outline={outline}
                  animationClass={animationClass}
                  delay={delay}
                  infinite={false}
                />
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  // Single word tracker
  return (
    <div className="flex justify-center">
      {Array.from(word).map((letter, index) => {
        const colorClass = isFinalSlide 
          ? 'bg-wordle-green text-white' 
          : getTileColor(letter, index, word);
        
        let outline = '';
        if (isPurpleSlide) {
          outline = 'border-2 border-purple-500';
        } else if (isBlueSlide) {
          outline = 'border-2 border-blue-500';
        } else if (isInvalidSlide) {
          outline = 'border-2 border-red-500';
        }
        
        const delay = index * 0.1;
        let animationClass = '';

        if (slideIndex === 0) {
          animationClass = isPresentationStarted ? 'animated-tile' : '';
        } else if (isFinalSlide) {
          animationClass = 'animated-tile bounce-animation';
          return (
            <TrackerTile
              key={index}
              letter={letter}
              index={index}
              colorClass={colorClass}
              outline={outline}
              animationClass={animationClass}
              delay={delay}
              infinite={true}
            />
          );
        } else {
          animationClass = 'animated-tile';
        }

        return (
          <TrackerTile
            key={index}
            letter={letter}
            index={index}
            colorClass={colorClass}
            outline={outline}
            animationClass={animationClass}
            delay={delay}
            infinite={false}
          />
        );
      })}
    </div>
  );
};

export default Tracker;
