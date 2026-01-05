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
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-3 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
         <h3 className="text-amber-600 text-xs font-display tracking-[0.2em] text-center font-bold">SELECT ERA</h3>
      </div>

      <div className="flex-1 overflow-hidden p-2">
        <div className="grid grid-cols-6 md:grid-cols-5 gap-1 md:gap-1.5 h-full auto-rows-fr">
          {STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              disabled={disabled}
              title={style.label}
              className={`
                relative rounded-md border transition-all duration-150 overflow-hidden group
                flex items-center justify-center p-1
                ${selectedStyleId === style.id
                  ? 'border-yellow-400 bg-yellow-50 shadow-[0_0_12px_rgba(251,191,36,0.5)] ring-1 ring-yellow-400/50'
                  : 'border-gray-300 bg-white hover:border-yellow-400 hover:bg-yellow-50/50'}
                disabled:opacity-40 disabled:cursor-not-allowed
              `}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${style.color} transition-opacity ${selectedStyleId === style.id ? 'opacity-20' : 'opacity-0 group-hover:opacity-10'}`} />
              <span className={`relative text-[9px] md:text-[10px] leading-tight font-medium font-display text-center line-clamp-2 ${selectedStyleId === style.id ? 'text-amber-700' : 'text-gray-600 group-hover:text-gray-800'}`}>
                {style.label.length > 12 ? style.label.split(' ')[0] : style.label}
              </span>
              {selectedStyleId === style.id && (
                <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(251,191,36,1)]" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleSelector;