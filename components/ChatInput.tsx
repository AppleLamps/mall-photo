/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface ChatInputProps {
    onPromptSubmit: (prompt: string) => void;
    disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onPromptSubmit, disabled }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !disabled) {
            onPromptSubmit(prompt.trim());
            setPrompt('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what to change..."
                disabled={disabled}
                className="flex-grow bg-white border-2 border-yellow-400 text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50 placeholder-gray-400"
            />
            <button type="submit" disabled={disabled} className="bg-orange-500 text-white py-3 px-6 rounded-lg border-2 border-orange-400 hover:bg-orange-600 active:bg-orange-700 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                REMIX
            </button>
        </form>
    );
}

export default ChatInput;
