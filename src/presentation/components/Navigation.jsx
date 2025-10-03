import React from 'react';

/**
 * Navigation - Previous/Next buttons for slide navigation
 */
const Navigation = ({ onPrevious, onNext, canGoPrevious, canGoNext }) => {
  return (
    <div className="flex justify-between space-x-4">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Navigation;
