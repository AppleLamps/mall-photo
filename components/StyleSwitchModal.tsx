/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import StyleSelector from './StyleSelector';

interface StyleSwitchModalProps {
  currentStyleId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const StyleSwitchModal: React.FC<StyleSwitchModalProps> = ({ currentStyleId, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4" onClick={onClose}>
      <div 
        className="bg-gray-900 border border-gray-700 p-6 sm:p-8 rounded-2xl w-full max-w-5xl relative shadow-2xl box-glow-cyan overflow-y-auto max-h-[90vh]" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h3 className="text-2xl font-display text-center mb-2 text-white tracking-widest">TIMELINE JUMP</h3>
        <p className="text-center text-gray-400 mb-8">Select a different era to reimagine this photo.</p>
        
        <StyleSelector 
          selectedStyleId={currentStyleId} 
          onSelect={(id) => { 
            onSelect(id); 
            onClose(); 
          }} 
        />
      </div>
    </div>
  );
};

export default StyleSwitchModal;