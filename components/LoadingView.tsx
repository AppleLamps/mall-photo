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
    <div className="w-full text-center p-8 border-2 border-yellow-300 bg-black bg-opacity-50 animate-fade-in">
      <div className="text-2xl text-yellow-300 font-display tracking-wider">
        {loadingMessages[messageIndex % loadingMessages.length]}
        <span className="animate-ping">_</span>
      </div>
    </div>
  );
};

export default LoadingView;