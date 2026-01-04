/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, useEffect } from 'react';
import { AppState } from './types';
import { startImageChatSession, continueImageChatSession, generateVideoFromImage } from './services/geminiService';
import Header from './components/Header';
import ImageInput from './components/ImageInput';
import LoadingView from './components/LoadingView';
import ResultView from './components/ResultView';
import VideoPromptModal from './components/VideoPromptModal';
import Spinner from './components/Spinner';
import { Content } from '@google/genai';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [sourceImage, setSourceImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [outputImageUrl, setOutputImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Content[]>([]);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [selectedStyleId, setSelectedStyleId] = useState<string | undefined>(undefined);

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

    setAppState(AppState.PROCESSING);
    setErrorMessage(null);
    setOutputImageUrl(null);
    setConversationHistory([]);
    setSelectedStyleId(newStyleId);

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
          <div className="glass-panel rounded-xl p-8 max-w-md w-full border-l-4 border-red-500 animate-fade-in text-center">
            <h2 className="text-2xl font-display text-red-500 mb-4">SYSTEM ERROR</h2>
            <p className="text-gray-300 mb-8">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="btn-primary px-8 py-3 rounded-lg font-bold tracking-wider text-white shadow-lg shadow-pink-500/20"
            >
              TRY AGAIN
            </button>
          </div>
        );
      case AppState.IDLE:
      default:
        return <ImageInput onImageReady={handleImageReady} initialStyleId={selectedStyleId} />;
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center overflow-x-hidden">
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

      <Header />
      
      <main className="w-full max-w-7xl flex-grow flex flex-col items-center justify-center px-4 py-8 relative z-10">
        {renderContent()}
      </main>

      <footer className="w-full text-center py-6 text-gray-500 text-sm relative z-10">
        <p className="opacity-70 hover:opacity-100 transition-opacity">
          Made by{' '}
          <a
            href="https://x.com/YaakovLyubetsky"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            yaakov@
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;