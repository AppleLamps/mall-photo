/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { STYLES } from '../constants/styles';

interface StyleSelectorProps {
  selectedStyleId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyleId, onSelect, disabled }) => {
  return (
    <div className="w-full mb-8 animate-fade-in">
      <div className="flex items-center justify-center mb-4 gap-2">
         <div className="h-px bg-gray-700 flex-grow max-w-[50px]"></div>
         <h3 className="text-gray-400 text-xs font-display tracking-[0.2em]">SELECT ERA / STYLE</h3>
         <div className="h-px bg-gray-700 flex-grow max-w-[50px]"></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {STYLES.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelect(style.id)}
            disabled={disabled}
            className={`
              relative px-4 py-3 rounded-lg border transition-all duration-300 overflow-hidden group
              ${selectedStyleId === style.id 
                ? 'border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105 bg-gray-800' 
                : 'border-gray-800 bg-gray-900/50 text-gray-400 hover:border-gray-600 hover:text-gray-200 hover:bg-gray-800'}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-0 ${selectedStyleId === style.id ? 'opacity-20' : 'group-hover:opacity-10'} transition-opacity duration-300`} />
            <span className="relative z-10 font-medium tracking-wide text-sm font-display">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;