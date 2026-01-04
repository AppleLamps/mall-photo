/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { getStyleById } from '../constants/styles';

interface PolaroidProps {
  imageUrl: string;
  videoUrl?: string | null;
  isRegenerating?: boolean;
  onClick: () => void;
  styleId?: string;
}

const captions = [
  "Memories",
  "Good Times",
  "Feeling Myself",
  "The Look",
  "Vibes",
  "Captured",
  "Forever",
  "Classic",
  "Iconic",
  "Mood",
  "Portrait",
  "Moments"
];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const Polaroid: React.FC<PolaroidProps> = ({ imageUrl, videoUrl, isRegenerating, onClick, styleId }) => {
  const caption = useMemo(() => {
    const style = styleId ? getStyleById(styleId) : null;
    const captionText = getRandomItem(captions);
    
    // Add random variance to year (+- 2 years)
    let yearDisplay = "";
    if (style) {
        const baseYear = parseInt(style.year);
        const randomVariance = Math.floor(Math.random() * 5) - 2;
        yearDisplay = `'${String(baseYear + randomVariance).slice(2)}`;
        
        // Specific override for eras where 'YY doesn't make sense or needs full year
        if (baseYear < 1900) {
            yearDisplay = String(baseYear + randomVariance);
        }
    } else {
        // Fallback default
        yearDisplay = "'85";
    }

    return `${captionText} ${yearDisplay}`;
  }, [styleId]);

  return (
    <button 
      onClick={onClick}
      className="relative bg-gray-100 p-4 pb-16 shadow-lg transform -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 ease-in-out text-left group"
      aria-label="View larger image"
    >
      <div className="bg-black w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center overflow-hidden">
        {videoUrl ? (
          <video src={videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
        ) : (
          <img src={imageUrl} alt="Generated stylized shot" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <p className="text-gray-800 text-2xl tracking-wider opacity-80 group-hover:opacity-100 transition-opacity" style={{fontFamily: `'Comic Sans MS', cursive, sans-serif`}}>
          {caption}
        </p>
      </div>
      {isRegenerating && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10 p-4">
            <p className="text-cyan-300 text-2xl animate-pulse font-display tracking-widest">REMIXING...</p>
        </div>
      )}
    </button>
  );
};

export default Polaroid;