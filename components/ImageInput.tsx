/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect, useCallback } from 'react';
import StyleSelector from './StyleSelector';
import { STYLES } from '../constants/styles';
import { compressImage, compressBase64Image } from '../services/imageUtils';

interface ImageInputProps {
  onImageReady: (imageData: { data: string; mimeType: string }, styleId: string) => void;
  initialStyleId?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageReady, initialStyleId }) => {
  const [mode, setMode] = useState<'select' | 'camera'>('select');
  const [selectedStyleId, setSelectedStyleId] = useState(initialStyleId || STYLES[0].id);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraInitializing, setIsCameraInitializing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize camera only when entering camera mode
  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    let isMounted = true;
    
    const startCamera = async () => {
        setIsCameraInitializing(true);
        setCameraError(null);
        try {
          if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error("Camera not supported by this browser.");
          }
          mediaStream = await navigator.mediaDevices.getUserMedia({ 
              video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
          });
          
          if (isMounted) {
            setStream(mediaStream);
          } else {
             // Clean up if component unmounted while waiting
             mediaStream.getTracks().forEach(track => track.stop());
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          if (isMounted) {
            setCameraError("Camera access denied. Please check permissions.");
          }
        } finally {
          if (isMounted) {
            setIsCameraInitializing(false);
          }
        }
    };

    if (mode === 'camera') {
        startCamera();
    }

    return () => {
        isMounted = false;
    };
  }, [mode]);

  // Clean up stream when it changes or component unmounts
  useEffect(() => {
      return () => {
          if (stream) {
              stream.getTracks().forEach(track => track.stop());
          }
      };
  }, [stream]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (videoEl && stream && mode === 'camera') {
      videoEl.srcObject = stream;
      videoEl.onloadedmetadata = () => {
        videoEl.play().catch(e => {
            console.error("Video play failed", e);
            setCameraError("Could not start video stream.");
        });
      };
    }
  }, [stream, mode]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const processFile = async (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      try {
        // Compress image before sending to API (max 1920px, JPEG quality 0.85)
        const compressed = await compressImage(file);
        onImageReady({ data: compressed.data, mimeType: compressed.mimeType }, selectedStyleId);
      } catch (error) {
        console.error('Image compression failed:', error);
        // Fallback to original uncompressed image
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const base64 = result.split(',')[1];
            onImageReady({ data: base64, mimeType: file.type }, selectedStyleId);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCapture = async () => {
    if (videoRef.current && stream) {
      if (videoRef.current.videoWidth === 0 || videoRef.current.videoHeight === 0) {
        setCameraError("Video stream not ready.");
        return;
      }
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        // Flip the canvas horizontally to match the mirrored preview
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        const base64 = dataUrl.split(',')[1];

        try {
          // Compress camera capture (max 1920px, JPEG quality 0.85)
          const compressed = await compressBase64Image(base64, 'image/jpeg');
          onImageReady({ data: compressed.data, mimeType: compressed.mimeType }, selectedStyleId);
        } catch (error) {
          console.error('Image compression failed:', error);
          // Fallback to original uncompressed capture
          onImageReady({ data: base64, mimeType: 'image/jpeg' }, selectedStyleId);
        }
      }
    }
  };

  const handleBack = () => {
      setStream(null);
      setMode('select');
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  }, [selectedStyleId, onImageReady]);

  if (mode === 'select') {
      return (
          <div className="w-full max-w-5xl px-4 animate-fade-in flex flex-col items-center">
             
             <StyleSelector selectedStyleId={selectedStyleId} onSelect={setSelectedStyleId} />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
                
                {/* Camera Card */}
                <button
                   onClick={() => setMode('camera')}
                   className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-pink-500/50 transition-all duration-300 card-hover flex flex-col items-center justify-center text-center p-8"
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <div className="relative z-10 w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/10 transition-all duration-300 border border-gray-700 group-hover:border-pink-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 group-hover:text-pink-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                   </div>
                   <h3 className="relative z-10 text-2xl font-display font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Use Camera</h3>
                   <p className="relative z-10 text-gray-400 text-sm max-w-[200px]">Capture a photo directly from your device.</p>
                </button>
                 
                {/* Upload Card */}
                <div
                   onClick={() => fileInputRef.current?.click()}
                   onDragOver={handleDragOver}
                   onDragLeave={handleDragLeave}
                   onDrop={handleDrop}
                   className={`cursor-pointer group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-gray-900 border transition-all duration-300 card-hover flex flex-col items-center justify-center text-center p-8 ${isDragOver ? 'border-cyan-400 bg-gray-800/50 scale-[1.02]' : 'border-gray-800 hover:border-cyan-500/50'}`}
                >
                   <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <div className="relative z-10 w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300 border border-gray-700 group-hover:border-cyan-500/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                   </div>
                   <h3 className="relative z-10 text-2xl font-display font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Upload Photo</h3>
                   <p className="relative z-10 text-gray-400 text-sm max-w-[200px]">Drag & drop an image here or click to browse.</p>
                </div>
             </div>
             <input
               type="file"
               ref={fileInputRef}
               onChange={handleFileChange}
               accept="image/*"
               className="hidden"
               aria-label="Upload photo"
               title="Upload photo"
             />
          </div>
      )
  }

  // Camera Mode
  return (
    <div className="w-full flex flex-col items-center animate-fade-in px-4">
      <div className="relative w-full max-w-2xl aspect-[3/4] sm:aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        <video 
            ref={videoRef}
            playsInline 
            muted 
            className="w-full h-full object-cover transform scale-x-[-1]"
        ></video>
        
        {/* Viewfinder Overlay */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/50 rounded-tl-lg"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/50 rounded-tr-lg"></div>
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/50 rounded-bl-lg"></div>
            <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/50 rounded-br-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-12 h-1 bg-white rounded-full"></div>
                <div className="h-12 w-1 bg-white rounded-full absolute"></div>
            </div>
        </div>

        {(isCameraInitializing || cameraError) && (
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-gray-900 z-20">
                {isCameraInitializing ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-cyan-400 font-display tracking-wider text-sm">INITIALIZING...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-red-400">{cameraError}</p>
                        <button onClick={() => setMode('select')} className="mt-6 text-white underline underline-offset-4 hover:text-cyan-400">Go Back</button>
                    </div>
                )}
            </div>
        )}
        
        {stream && !cameraError && !isCameraInitializing && (
             <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 pointer-events-auto">
                 <button
                    onClick={handleCapture}
                    className="w-20 h-20 rounded-full border-4 border-white/80 p-1 transition-transform duration-200 active:scale-95 hover:scale-105"
                    aria-label="Capture photo"
                >
                    <div className="w-full h-full rounded-full bg-white shadow-lg" />
                </button>
             </div>
        )}
      </div>
     
      <div className="mt-8">
         <button
          onClick={handleBack}
          className="text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          BACK TO OPTIONS
        </button>
      </div>
    </div>
  );
};

export default ImageInput;