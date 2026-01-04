/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CompressedImage {
  data: string;      // base64 encoded image data (without data URL prefix)
  mimeType: string;  // e.g., 'image/jpeg'
}

export interface CompressionOptions {
  maxDimension?: number;  // Maximum width or height in pixels (default: 1920)
  quality?: number;       // JPEG quality 0-1 (default: 0.85)
  outputType?: string;    // Output mime type (default: 'image/jpeg')
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxDimension: 1920,
  quality: 0.85,
  outputType: 'image/jpeg',
};

/**
 * Compresses an image file using canvas.
 * - Resizes if dimensions exceed maxDimension (maintains aspect ratio)
 * - Converts to JPEG with specified quality
 * 
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise with base64 data and mimeType
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<CompressedImage> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      // Clean up the object URL
      URL.revokeObjectURL(objectUrl);

      try {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        
        if (width > opts.maxDimension || height > opts.maxDimension) {
          if (width > height) {
            height = Math.round((height / width) * opts.maxDimension);
            width = opts.maxDimension;
          } else {
            width = Math.round((width / height) * opts.maxDimension);
            height = opts.maxDimension;
          }
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to data URL
        const dataUrl = canvas.toDataURL(opts.outputType, opts.quality);
        const base64 = dataUrl.split(',')[1];

        resolve({
          data: base64,
          mimeType: opts.outputType,
        });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image for compression'));
    };

    img.src = objectUrl;
  });
};

/**
 * Compresses a base64 image string using canvas.
 * Useful for camera captures that are already in base64 format.
 * 
 * @param base64Data - The base64 encoded image data
 * @param mimeType - The original mime type of the image
 * @param options - Compression options
 * @returns Promise with compressed base64 data and mimeType
 */
export const compressBase64Image = async (
  base64Data: string,
  mimeType: string,
  options: CompressionOptions = {}
): Promise<CompressedImage> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      try {
        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        
        if (width > opts.maxDimension || height > opts.maxDimension) {
          if (width > height) {
            height = Math.round((height / width) * opts.maxDimension);
            width = opts.maxDimension;
          } else {
            width = Math.round((width / height) * opts.maxDimension);
            height = opts.maxDimension;
          }
        }

        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Failed to get canvas context');
        }

        // Use high-quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to data URL
        const dataUrl = canvas.toDataURL(opts.outputType, opts.quality);
        const base64 = dataUrl.split(',')[1];

        resolve({
          data: base64,
          mimeType: opts.outputType,
        });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };

    img.src = `data:${mimeType};base64,${base64Data}`;
  });
};

