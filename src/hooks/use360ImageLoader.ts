import { useState, useEffect } from 'react';

interface Use360ImageLoaderProps {
  uploadedImage?: string | null;
}

interface Use360ImageLoaderResult {
  imagePath: string;
  is360Ready: boolean;
  errorMessage: string | null;
  prepareRotation: () => void;
}

/**
 * Custom hook to handle 360-degree image loading with proper error handling
 */
const use360ImageLoader = ({ 
  uploadedImage 
}: Use360ImageLoaderProps): Use360ImageLoaderResult => {
  const [imagePath, setImagePath] = useState<string>('');
  const [is360Ready, setIs360Ready] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset error message when uploaded image changes
  useEffect(() => {
    setErrorMessage(null);
    // Reset 360 ready state when image changes
    setIs360Ready(false);
  }, [uploadedImage]);

  /**
   * Prepares the uploaded image for 360-degree rotation
   * This function simulates a 360-degree view with a single image
   */
  const prepareRotation = () => {
    // Reset states
    setErrorMessage(null);
    
    if (!uploadedImage) {
      setErrorMessage('Please upload an image first.');
      return;
    }
    
    try {
      // For a single image, we'll use the image directly
      // React360Viewer will handle the rotation effect
      setImagePath(uploadedImage);
      setIs360Ready(true);
      console.log('Image prepared for 360° rotation');
    } catch (error) {
      console.error('Error preparing image for rotation:', error);
      setErrorMessage('Failed to prepare image for 360° view. Please try again.');
    }
  };

  return {
    imagePath,
    is360Ready,
    errorMessage,
    prepareRotation
  };
};

export default use360ImageLoader;