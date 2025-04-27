import React, { useState, useRef, useEffect } from 'react';

interface Measurement {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  length: number; // in virtual feet
  label: string;
}

const VirtualMeasurement: React.FC = () => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [activeMeasurement, setActiveMeasurement] = useState<Partial<Measurement> | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scale, setScale] = useState(10); // pixels per foot
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showMeasurements, setShowMeasurements] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setRoomImage(URL.createObjectURL(file));
      // Clear existing measurements when new image is uploaded
      setMeasurements([]);
    }
  };

  // Draw everything on canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw room image if available
    if (roomImage) {
      const img = new Image();
      img.src = roomImage;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawMeasurementsAndGrid();
      };
    } else {
      drawMeasurementsAndGrid();
    }
  };
  
  // Draw measurements and grid
  const drawMeasurementsAndGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Draw grid if enabled
    if (showGrid) {
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
    
    // Draw measurements if enabled
    if (showMeasurements) {
      measurements.forEach(measurement => {
        drawMeasurement(ctx, measurement);
      });
    }
    
    // Draw active measurement
    if (activeMeasurement && isDrawing) {
      const { startX, startY, endX, endY } = activeMeasurement;
      if (startX !== undefined && startY !== undefined && endX !== undefined && endY !== undefined) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#00a8ff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw measurement length
        const length = calculateLength(startX, startY, endX, endY);
        const midX = (startX + endX) / 2;
        const midY = (startY + endY) / 2;
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText(`${length.toFixed(1)} ft`, midX, midY);
        ctx.fillText(`${length.toFixed(1)} ft`, midX, midY);
      }
    }
  };
  
  // Draw a single measurement
  const drawMeasurement = (ctx: CanvasRenderingContext2D, measurement: Measurement) => {
    const { startX, startY, endX, endY, length, label } = measurement;
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = '#00a8ff';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw endpoints
    ctx.fillStyle = '#00a8ff';
    ctx.beginPath();
    ctx.arc(startX, startY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(endX, endY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw label
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.strokeText(`${label}: ${length.toFixed(1)} ft`, midX, midY);
    ctx.fillText(`${label}: ${length.toFixed(1)} ft`, midX, midY);
  };
  
  // Calculate length in feet based on scale
  const calculateLength = (startX: number, startY: number, endX: number, endY: number) => {
    const pixelDistance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    return pixelDistance / scale;
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setActiveMeasurement({
      startX: x,
      startY: y,
      endX: x,
      endY: y
    });
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !activeMeasurement || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setActiveMeasurement(prev => ({
      ...prev,
      endX: x,
      endY: y
    }));
    
    drawCanvas();
  };
  
  const handleMouseUp = () => {
    if (!isDrawing || !activeMeasurement) return;
    
    const { startX, startY, endX, endY } = activeMeasurement;
    
    if (startX !== undefined && startY !== undefined && endX !== undefined && endY !== undefined) {
      // Only add if the measurement has some length
      if (startX !== endX || startY !== endY) {
        const length = calculateLength(startX, startY, endX, endY);
        const newMeasurement: Measurement = {
          id: Date.now().toString(),
          startX,
          startY,
          endX,
          endY,
          length,
          label: `Measurement ${measurements.length + 1}`
        };
        
        setMeasurements(prev => [...prev, newMeasurement]);
      }
    }
    
    setIsDrawing(false);
    setActiveMeasurement(null);
  };
  
  // Handle scale change
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(e.target.value));
  };
  
  // Clear all measurements
  const clearMeasurements = () => {
    setMeasurements([]);
  };
  
  // Update canvas when component mounts or dependencies change
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = 500; // Fixed height or adjust as needed
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);
  
  // Redraw canvas when dependencies change
  useEffect(() => {
    drawCanvas();
  }, [roomImage, measurements, scale, showGrid, showMeasurements]);
  
  return (
    <section id="virtual-measurement" className="section-padding bg-gray-50 dark:bg-gray-800" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2">Virtual Room Measurement</h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Upload a room photo and create accurate measurements to plan your space effectively.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="600">
          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1">
                <label htmlFor="roomImageUpload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Upload Room Image:
                </label>
                <input 
                  type="file" 
                  id="roomImageUpload"
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none p-2"
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="scaleSlider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Scale (pixels per foot): {scale}
                </label>
                <input 
                  type="range" 
                  id="scaleSlider"
                  min="5" 
                  max="50" 
                  value={scale} 
                  onChange={handleScaleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showGrid"
                  checked={showGrid} 
                  onChange={() => setShowGrid(!showGrid)}
                  className="w-4 h-4 text-resurgent-blue bg-gray-100 border-gray-300 rounded focus:ring-resurgent-blue dark:focus:ring-resurgent-lightBlue dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="showGrid" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Show Grid
                </label>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="showMeasurements"
                  checked={showMeasurements} 
                  onChange={() => setShowMeasurements(!showMeasurements)}
                  className="w-4 h-4 text-resurgent-blue bg-gray-100 border-gray-300 rounded focus:ring-resurgent-blue dark:focus:ring-resurgent-lightBlue dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="showMeasurements" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Show Measurements
                </label>
              </div>
              
              <button 
                onClick={clearMeasurements}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
              >
                Clear All Measurements
              </button>
            </div>
            
            <div ref={containerRef} className="relative border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <canvas 
                ref={canvasRef} 
                className="w-full h-[500px] bg-gray-200 dark:bg-gray-700"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
              
              {!roomImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90">
                  <div className="text-center p-6">
                    <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Upload a room image to start measuring</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Click and drag to create measurements</p>
                  </div>
                </div>
              )}
            </div>
            
            {measurements.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Measurement List</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {measurements.map((measurement) => (
                    <div key={measurement.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <p className="font-bold">{measurement.label}</p>
                      <p className="text-gray-700 dark:text-gray-300">{measurement.length.toFixed(2)} ft</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">Click and drag on the image to create measurements. Adjust the scale to match real-world dimensions.</p>
              <button className="btn-primary dark:bg-resurgent-lightBlue dark:hover:bg-opacity-90">Save Measurements</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualMeasurement;