/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import Polaroid from './Polaroid';
import ChatInput from './ChatInput';
import StyleSwitchModal from './StyleSwitchModal';

interface ResultViewProps {
  imageUrl: string;
  videoUrl: string | null;
  onReset: () => void;
  onEdit: (prompt: string) => void;
  onSwitchStyle: (styleId: string) => void;
  onBringToLife: () => void;
  isRegenerating: boolean;
  editError: string | null;
  videoError: string | null;
  styleId?: string;
}

const ResultView: React.FC<ResultViewProps> = ({ imageUrl, videoUrl, onReset, onEdit, onSwitchStyle, onBringToLife, isRegenerating, editError, videoError, styleId }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isStyleModalOpen, setIsStyleModalOpen] = useState(false);
  
  const handleDownload = () => {
    const link = document.createElement('a');
    if (videoUrl) {
      link.href = videoUrl;
      link.download = `mall-photo-${styleId || 'retro'}.mp4`;
    } else {
      link.href = imageUrl;
      link.download = `mall-photo-${styleId || 'retro'}.png`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasVideo = !!videoUrl;

  return (
    <div className="w-full flex flex-col items-center animate-fade-in max-w-4xl mx-auto">
      <div className="mb-10">
        <Polaroid 
          imageUrl={imageUrl} 
          videoUrl={videoUrl} 
          isRegenerating={isRegenerating}
          onClick={() => setIsPreviewOpen(true)}
          styleId={styleId}
        />
      </div>

      {!hasVideo && (
        <div className="w-full max-w-xl mb-8">
          <ChatInput onPromptSubmit={onEdit} disabled={isRegenerating} />
          {editError && (
            <p className="text-red-400 text-sm text-center mt-3 bg-red-900/20 py-2 rounded-lg">{editError}</p>
          )}
        </div>
      )}

      {videoError && (
          <div className="w-full max-w-xl bg-red-900/20 border border-red-500/50 p-4 rounded-lg mb-8 text-center">
              <p className="text-red-300">{videoError}</p>
          </div>
      )}

      <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
        <button
          onClick={onReset}
          disabled={isRegenerating}
          className="py-3 px-4 rounded-lg font-bold border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm whitespace-nowrap"
        >
          Start Over
        </button>

         <button
          onClick={() => setIsStyleModalOpen(true)}
          disabled={isRegenerating || hasVideo}
          className="py-3 px-4 rounded-lg font-bold border border-cyan-500/50 text-cyan-400 hover:text-white hover:bg-cyan-900/30 hover:border-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm whitespace-nowrap"
        >
          Change Era
        </button>
        
        <button
          onClick={handleDownload}
          disabled={isRegenerating}
          className="col-span-1 btn-cyan text-white py-3 px-4 rounded-lg font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm whitespace-nowrap"
        >
          {hasVideo ? 'Save Video' : 'Save Photo'}
        </button>

        {!hasVideo ? (
            <button
                onClick={onBringToLife}
                disabled={isRegenerating}
                className="col-span-1 btn-primary text-white py-3 px-4 rounded-lg font-bold shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm whitespace-nowrap"
            >
                Animate
            </button>
        ) : (
            <div className="hidden"></div> /* Spacer if video exists */
        )}
      </div>

      {isPreviewOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in p-4"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full h-12 w-12 flex items-center justify-center transition-all"
              onClick={() => setIsPreviewOpen(false)}
              aria-label="Close preview"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {hasVideo ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="max-w-full max-h-full rounded-lg shadow-2xl" 
              />
            ) : (
              <img 
                src={imageUrl} 
                alt="Full size stylized shot" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>
        </div>
      )}

      {isStyleModalOpen && (
        <StyleSwitchModal 
            currentStyleId={styleId || '80s'} 
            onSelect={onSwitchStyle} 
            onClose={() => setIsStyleModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default ResultView;