/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useEffect } from 'react';
import { AppState } from './types';
import { startImageChatSession, continueImageChatSession, generateVideoFromImage } from './services/geminiService';
import ImageInput from './components/ImageInput';
import LoadingView from './components/LoadingView';
import ResultView from './components/ResultView';
import VideoPromptModal from './components/VideoPromptModal';
import Spinner from './components/Spinner';
import StyleSelector from './components/StyleSelector';
import { STYLES } from './constants/styles';
import { Content } from '@google/genai';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [sourceImage, setSourceImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Content[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedStyleId, setSelectedStyleId] = useState<string>(STYLES[0].id);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  // Cleanup video blob URL when component unmounts or videoUrl changes
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const handleImageReady = useCallback(async ({ data, mimeType }: { data: string; mimeType: string }, styleId: string) => {
    setAppState(AppState.PROCESSING);
    setSourceImage({ data, mimeType });
    setErrorMessage(null);
    setOutputImageUrl(null);
    setConversationHistory([]);
    setSelectedStyleId(styleId);
    
    try {
      const { imageUrl, history } = await startImageChatSession(data, mimeType, styleId);
      setOutputImageUrl(imageUrl);
      setConversationHistory(history);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setErrorMessage(`GENERATION FAILED: ${message}`);
      setAppState(AppState.ERROR);
    }
  }, []);

  const handleSwitchStyle = useCallback(async (newStyleId: string) => {
    if (!sourceImage) return;

    // Update selection immediately
    setSelectedStyleId(newStyleId);
    
    setAppState(AppState.PROCESSING);
    setErrorMessage(null);
    setOutputImageUrl(null);
    setConversationHistory([]);

    try {
        const { imageUrl, history } = await startImageChatSession(sourceImage.data, sourceImage.mimeType, newStyleId);
        setOutputImageUrl(imageUrl);
        setConversationHistory(history);
        setAppState(AppState.RESULT);
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'An unknown error occurred.';
        setErrorMessage(`GENERATION FAILED: ${message}`);
        setAppState(AppState.ERROR);
    }
  }, [sourceImage]);

  const handleEditImage = useCallback(async (prompt: string) => {
    if (!conversationHistory.length) return;
    setIsRegenerating(true);
    setEditErrorMessage(null);
    try {
      const { imageUrl, newHistory } = await continueImageChatSession(conversationHistory, prompt);
      setOutputImageUrl(imageUrl);
      setConversationHistory(newHistory);
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      setEditErrorMessage(`REMIX FAILED: ${message}`);
    } finally {
      setIsRegenerating(false);
    }
  }, [conversationHistory]);

  const handleGenerateVideo = useCallback(async (prompt: string, keyForGeneration: string) => {
    if (!outputImageUrl) return;
    setShowVideoModal(false);
    setIsGeneratingVideo(true);
    setVideoError(null);
    try {
        const generatedVideoUrl = await generateVideoFromImage(outputImageUrl, prompt, keyForGeneration);
        // Cleanup previous video blob URL before setting new one
        if (videoUrl) {
          URL.revokeObjectURL(videoUrl);
        }
        setVideoUrl(generatedVideoUrl);
    } catch (error) {
        console.error(error);
        const message = error instanceof Error ? error.message : 'An unknown error occurred.';
        setVideoError(`VIDEO FAILED: ${message}`);
    } finally {
        setIsGeneratingVideo(false);
    }
  }, [outputImageUrl, videoUrl]);


  const handleReset = useCallback(() => {
    // Cleanup video blob URL to prevent memory leak
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setAppState(AppState.IDLE);
    setSourceImage(null);
    setOutputImageUrl(null);
    setErrorMessage(null);
    setEditErrorMessage(null);
    setConversationHistory([]);
    setShowVideoModal(false);
    setIsGeneratingVideo(false);
    setVideoUrl(null);
    setVideoError(null);
    // Note: We deliberately don't reset selectedStyleId so user can keep their preference
  }, [videoUrl]);

  const renderContent = () => {
    switch (appState) {
      case AppState.PROCESSING:
        return <LoadingView styleId={selectedStyleId} />;
      case AppState.RESULT:
        return outputImageUrl ? (
          <ResultView
            imageUrl={outputImageUrl}
            videoUrl={videoUrl}
            onReset={handleReset}
            onEdit={handleEditImage}
            onSwitchStyle={handleSwitchStyle}
            onBringToLife={() => setShowVideoModal(true)}
            isRegenerating={isRegenerating}
            editError={editErrorMessage}
            videoError={videoError}
            styleId={selectedStyleId}
          />
        ) : null;
      case AppState.ERROR:
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
            <h2 className="text-2xl font-display text-red-500 mb-4 tracking-widest">SYSTEM ERROR</h2>
            <p className="text-gray-400 mb-8 max-w-md">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="btn-primary px-8 py-3 rounded-lg font-bold tracking-wider text-white shadow-lg shadow-pink-500/20"
            >
              REBOOT SYSTEM
            </button>
          </div>
        );
      case AppState.IDLE:
      default:
        return <ImageInput onImageReady={handleImageReady} selectedStyleId={selectedStyleId} />;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] py-6 px-4">
      <div className="bg-grid-pattern"></div>
      <div className="ambient-glow"></div>

      {isGeneratingVideo && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in">
          <Spinner />
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 text-3xl font-display font-bold mt-8 tracking-widest">ANIMATING</h2>
          <p className="text-gray-400 mt-2 font-light">Creating your video sequence...</p>
        </div>
      )}
      
      {showVideoModal && (
        <VideoPromptModal 
          onClose={() => setShowVideoModal(false)}
          onSubmit={handleGenerateVideo}
          apiKey={apiKey}
          onSetApiKey={setApiKey}
        />
      )}

      <div className="w-full max-w-7xl relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-8 text-center animate-fade-in">
             <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] select-none">
                 MALL PHOTO
             </h1>
             <p className="text-amber-700/70 font-display tracking-[0.5em] text-xs md:text-sm mt-2 select-none">AI-POWERED TIME MACHINE</p>
        </div>
        
        {/* BOOTH INTERFACE */}
        <div className="booth-frame w-full flex flex-col md:flex-row h-[850px] md:h-[700px] bg-white max-w-6xl">

            {/* SCREEN AREA (Left/Top) */}
            <div className="flex-1 p-3 md:p-6 flex flex-col relative overflow-hidden bg-[#fafafa]">
                <div className="booth-screen-container w-full h-full relative z-10 flex flex-col bg-white">
                    <div className="flex-grow relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                         {renderContent()}
                    </div>
                </div>
            </div>

            {/* CONTROL PANEL (Right/Bottom) */}
            <div className="w-full md:w-80 lg:w-96 booth-controls-panel flex flex-col relative z-20 shadow-[-10px_0_20px_rgba(0,0,0,0.08)] h-[300px] md:h-auto border-t-2 md:border-t-0 md:border-l-2 border-gray-200">
                 <StyleSelector 
                    selectedStyleId={selectedStyleId} 
                    onSelect={(id) => {
                        setSelectedStyleId(id);
                        if (appState === AppState.RESULT && sourceImage) {
                             handleSwitchStyle(id);
                        }
                    }} 
                    disabled={appState === AppState.PROCESSING || isRegenerating || isGeneratingVideo}
                 />
                 
                 <div className="p-4 border-t border-gray-200 bg-gray-100 text-center">
                    <button
                        onClick={handleReset}
                        className="text-xs text-gray-500 hover:text-gray-800 transition-colors uppercase tracking-widest font-display py-2 w-full hover:bg-gray-200 rounded"
                    >
                        Reset System
                    </button>
                 </div>
            </div>
        </div>

        <footer className="w-full text-center py-6 text-gray-500 text-sm relative z-10">
            <p className="opacity-70 hover:opacity-100 transition-opacity">
              Made by{' '}
              <a
                href="https://x.com/YaakovLyubetsky"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 hover:text-orange-500 transition-colors"
              >
                yaakov@
              </a>
            </p>
        </footer>

      </div>
    </div>
  );
};

export default App;