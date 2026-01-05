/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-8 text-center relative z-10">
      <div className="inline-block relative">
        <h1 className="text-4xl sm:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tighter filter drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          MALL PHOTO
        </h1>
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent mt-2 opacity-70"></div>
        <p className="text-pink-400 font-medium tracking-[0.2em] text-sm sm:text-base mt-3 uppercase">
          AI-Powered Time Machine
        </p>
      </div>
    </header>
  );
};

export default Header;