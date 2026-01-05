/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { getStyleById } from '../constants/styles';

interface LoadingViewProps {
  styleId?: string;
}

const defaultMessages = [
  "ANALYZING FEATURES...",
  "TRAVERSING TIMELINES...",
  "ADJUSTING QUANTUM FILTERS...",
  "RENDERING REALITY...",
  "GENERATING PIXELS...",
  "APPLYING ARTISTIC STYLE...",
  "FINALIZING MASTERPIECE...",
];

const LoadingView: React.FC<LoadingViewProps> = ({ styleId }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = styleId 
    ? (getStyleById(styleId).loadingMessages || defaultMessages)
    : defaultMessages;

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-white">
      <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-yellow-400/30 border-t-yellow-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-yellow-400/20 rounded-full animate-pulse"></div>
          </div>
      </div>
      <div className="text-xl md:text-2xl text-amber-600 font-display tracking-widest font-bold">
        {loadingMessages[messageIndex % loadingMessages.length]}
        <span className="animate-pulse ml-1">_</span>
      </div>
    </div>
  );
};

export default LoadingView;