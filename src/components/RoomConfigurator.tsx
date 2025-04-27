import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import use360ImageLoader from '../hooks/use360ImageLoader';

const RoomConfigurator = () => {
  const [viewMode, setViewMode] = useState<'2d' | '360'>('2d');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [spinReverse, setSpinReverse] = useState<boolean>(false);
  const [autoplay, setAutoplay] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Use our custom hook for 360 image loading
  const { 
    imagePath, 
    is360Ready, 
    errorMessage, 
    prepareRotation 
  } = use360ImageLoader({
    uploadedImage: imageUrl
  });
  
  // For a true 360° view, you would need a set of 36 sequential images
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // For a single image preview
      setImageUrl(URL.createObjectURL(file));
      // The is360Ready state will be managed by the hook when loadSampleImages is called
    } else {
      setImageUrl(null);
      // The is360Ready state will be reset when fallbackImage changes in the hook
    }
  };
  
  // Prepare the 360° viewer with the uploaded image
  const prepareFor360View = () => {
    // Use our custom hook to prepare the image for rotation
    prepareRotation();
  };
  
  // Toggle autoplay for the 360 viewer
  const toggleAutoplay = () => {
    setAutoplay(!autoplay);
    
    // If turning on autoplay, start the rotation animation
    if (!autoplay) {
      const startRotation = () => {
        if (imageRef.current && autoplay) {
          setRotation(prev => (prev + (spinReverse ? -1 : 1)) % 360);
          requestAnimationFrame(startRotation);
        }
      };
      requestAnimationFrame(startRotation);
    }
  };
  
  // Effect to handle autoplay rotation
  useEffect(() => {
    let animationId: number;
    
    if (autoplay && imageRef.current) {
      const rotate = () => {
        setRotation(prev => (prev + (spinReverse ? -1 : 1)) % 360);
        animationId = requestAnimationFrame(rotate);
      };
      animationId = requestAnimationFrame(rotate);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [autoplay, spinReverse]);
  
  // Toggle spin direction
  const toggleSpinDirection = () => {
    setSpinReverse(!spinReverse);
  };

  // Custom mouse event handlers for manual rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoplay) return; // Don't allow manual rotation during autoplay
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || autoplay) return;
    const deltaX = e.clientX - startX;
    setRotation(prev => (prev + deltaX * 0.5) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (autoplay) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || autoplay) return;
    const deltaX = e.touches[0].clientX - startX;
    setRotation(prev => (prev + deltaX * 0.5) % 360);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="room-configurator" className="section-padding bg-gray-50 dark:bg-gray-800" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2">Customize Your Meeting Room Spaces</h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Design your ideal meeting room with our interactive configurator. Switch between 2D layouts and a 360-degree virtual tour.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="600">
          <div className="flex justify-center space-x-4 p-4 bg-gray-100 dark:bg-gray-700">
            <button
              onClick={() => setViewMode('2d')}
              className={`px-4 py-2 rounded-md font-medium ${viewMode === '2d' ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              2D Layout
            </button>
            <button
              onClick={() => setViewMode('360')}
              className={`px-4 py-2 rounded-md font-medium ${viewMode === '360' ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              360° Virtual Tour
            </button>
          </div>
          <div className="relative h-96">
            {viewMode === '2d' ? (
              <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700">
                <img src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" alt="2D Room Layout" className="max-h-full max-w-full object-contain" />
                <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 p-2 rounded-md text-sm text-gray-700 dark:text-gray-300">Drag elements to customize layout</div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-200 dark:bg-gray-700 relative p-4" style={{ minHeight: '400px' }}>
                <div className="mb-4 w-full max-w-md">
                  <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Upload Preview Image:
                  </label>
                  <input 
                    type="file" 
                    id="imageUpload"
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none p-2"
                  />
                  {imageUrl && !is360Ready && (
                    <button 
                      onClick={prepareFor360View}
                      className="mt-2 px-4 py-2 bg-resurgent-blue text-white rounded-md hover:bg-opacity-90 transition-all flex items-center justify-center"
                    >
                      <span>Rotate 360°</span>
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {imageUrl ? (
                  <div className="w-full h-[400px] flex items-center justify-center"> 
                    {is360Ready ? (
                      <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                        <div className="w-full h-[350px] rounded-md overflow-hidden relative">
                          <div 
                            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                            style={{
                              backgroundImage: `url(${imagePath})`,
                              backgroundSize: 'contain',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              transform: `rotate(${rotation}deg)`,
                              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                            }}
                            ref={imageRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                          />
                        </div>
                        <div className="mt-4 flex space-x-4">
                          <button 
                            onClick={toggleAutoplay}
                            className="px-3 py-1 bg-resurgent-blue text-white rounded-md hover:bg-opacity-90 transition-all text-sm"
                          >
                            {autoplay ? 'Stop Autoplay' : 'Start Autoplay'}
                          </button>
                          <button 
                            onClick={toggleSpinDirection}
                            className="px-3 py-1 bg-resurgent-blue text-white rounded-md hover:bg-opacity-90 transition-all text-sm"
                          >
                            Reverse Direction
                          </button>
                        </div>
                        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-md max-w-md text-center">
                            <p className="mb-2">360° View</p>
                            <p className="text-sm">Drag left/right to rotate the view</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <img 
                          src={imageUrl} 
                          alt="360 View" 
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-md max-w-md text-center">
                            <p className="mb-2">Ready for 360° View</p>
                            <p className="text-sm">Click "Prepare 360° View" to enable interactive rotation.</p>
                            <p className="text-sm mt-2">For best results, use a set of 36 sequential images.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] w-full bg-gray-300 dark:bg-gray-600 rounded-md p-4">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Please upload a 360° image to view.</p>
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">Please upload an image to view in 360°</p>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">After uploading, click the "Rotate 360°" button to enable rotation</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Interactive Room Configurator</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">Visualize and customize your meeting room setup. Switch to 360° view for an immersive virtual tour experience.</p>
            <div className="flex justify-center">
              <button className="btn-primary dark:bg-resurgent-lightBlue dark:hover:bg-opacity-90">Save Configuration</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomConfigurator;
