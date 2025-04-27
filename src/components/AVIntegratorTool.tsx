import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AVEquipmentItem {
  id: string;
  name: string;
  type: string;
  width: number; // in virtual feet
  depth: number; // in virtual feet
  x: number; // position
  y: number; // position
  rotation: number; // in degrees
  color: string;
  icon: string;
}

const AVIntegratorTool: React.FC = () => {
  const [roomWidth, setRoomWidth] = useState<number>(20); // in feet
  const [roomDepth, setRoomDepth] = useState<number>(15); // in feet
  const [scale, setScale] = useState<number>(20); // pixels per foot
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [roomBackground, setRoomBackground] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [furnitureItems, setFurnitureItems] = useState<AVEquipmentItem[]>([
    {
      id: '1',
      name: 'Conference Table',
      type: 'table',
      width: 8,
      depth: 4,
      x: 10,
      y: 7.5,
      rotation: 0,
      color: '#8B4513',
      icon: '🪑'
    },
    {
      id: '2',
      name: 'Office Chair',
      type: 'chair',
      width: 2,
      depth: 2,
      x: 5,
      y: 5,
      rotation: 0,
      color: '#1E1E1E',
      icon: '🪑'
    },
    {
      id: '3',
      name: 'Bookshelf',
      type: 'storage',
      width: 3,
      depth: 1,
      x: 2,
      y: 2,
      rotation: 0,
      color: '#5D4037',
      icon: '📚'
    },
  ]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const isRotating = useRef<boolean>(false);
  const startPoint = useRef<{x: number, y: number}>({x: 0, y: 0});
  
  // AV Equipment templates that can be added to the room
  const furnitureTemplates: Omit<AVEquipmentItem, 'id' | 'x' | 'y'>[] = [
    {
      name: 'Smart Projector Pro',
      type: 'projection',
      width: 3,
      depth: 1,
      rotation: 0,
      color: '#3B82F6',
      icon: '📽️'
    },
    {
      name: 'Dynamic Video Wall System',
      type: 'display',
      width: 5,
      depth: 2.5,
      rotation: 0,
      color: '#10B981',
      icon: '🖥️'
    },
    {
      name: 'Enterprise Conferencing System',
      type: 'conferencing',
      width: 6,
      depth: 3,
      rotation: 0,
      color: '#8B5CF6',
      icon: '🎙️'
    },
    {
      name: 'Interactive Display Board',
      type: 'interactive',
      width: 8,
      depth: 1,
      rotation: 0,
      color: '#EC4899',
      icon: '📋'
    },
  ];
  
  // Handle room background image upload
  const handleBackgroundUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setRoomBackground(URL.createObjectURL(file));
    }
  };
  
  // Add new furniture item to the room
  const addFurnitureItem = (template: Omit<AVEquipmentItem, 'id' | 'x' | 'y'>) => {
    const newItem: AVEquipmentItem = {
      ...template,
      id: Date.now().toString(),
      x: roomWidth / 2,
      y: roomDepth / 2
    };
    
    setFurnitureItems(prev => [...prev, newItem]);
    setSelectedItem(newItem.id);
  };
  
  // Handle item selection
  const selectItem = (id: string) => {
    setSelectedItem(id);
  };
  
  // Handle item movement
  const startDrag = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (isRotating.current) return;
    
    isDragging.current = true;
    setSelectedItem(id);
    
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    startPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging.current || !selectedItem || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const currentPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    const deltaX = (currentPoint.x - startPoint.current.x) / scale;
    const deltaY = (currentPoint.y - startPoint.current.y) / scale;
    
    setFurnitureItems(prev => prev.map(item => {
      if (item.id === selectedItem) {
        // Constrain to room boundaries
        const newX = Math.max(item.width / 2, Math.min(roomWidth - item.width / 2, item.x + deltaX));
        const newY = Math.max(item.depth / 2, Math.min(roomDepth - item.depth / 2, item.y + deltaY));
        
        return {
          ...item,
          x: newX,
          y: newY
        };
      }
      return item;
    }));
    
    startPoint.current = currentPoint;
  };
  
  const endDrag = () => {
    isDragging.current = false;
  };
  
  // Handle item rotation
  const startRotation = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    isRotating.current = true;
    setSelectedItem(id);
  };
  
  const rotateItem = (direction: 'clockwise' | 'counterclockwise') => {
    if (!selectedItem) return;
    
    setFurnitureItems(prev => prev.map(item => {
      if (item.id === selectedItem) {
        const rotationAmount = direction === 'clockwise' ? 15 : -15;
        return {
          ...item,
          rotation: (item.rotation + rotationAmount) % 360
        };
      }
      return item;
    }));
  };
  
  // Delete selected item
  const deleteSelectedItem = () => {
    if (!selectedItem) return;
    
    setFurnitureItems(prev => prev.filter(item => item.id !== selectedItem));
    setSelectedItem(null);
  };
  
  // Clear all items
  const clearAllItems = () => {
    setFurnitureItems([]);
    setSelectedItem(null);
  };
  
  // Handle room dimension changes
  const updateRoomDimensions = (dimension: 'width' | 'depth', value: number) => {
    if (dimension === 'width') {
      setRoomWidth(value);
    } else {
      setRoomDepth(value);
    }
  };
  
  // Handle scale change
  const updateScale = (value: number) => {
    setScale(value);
  };
  
  // Handle click on empty space to deselect
  const handleContainerClick = () => {
    setSelectedItem(null);
  };
  
  // Save the current layout
  const saveLayout = () => {
    const layout = {
      roomWidth,
      roomDepth,
      items: furnitureItems
    };
    
    const layoutJSON = JSON.stringify(layout);
    const blob = new Blob([layoutJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'room_layout.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <section id="av-integrator-tool" className="section-padding bg-gray-50 dark:bg-gray-800" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2">AV Integrator Equipment Tool</h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Design your ideal AV setup with our interactive equipment arrangement tool for professional environments.</p>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="600">
          <div className="grid md:grid-cols-4 gap-0">
            {/* Controls Sidebar */}
            <div className="md:col-span-1 bg-gray-100 dark:bg-gray-800 p-6 overflow-y-auto max-h-[700px]">
              <div className="space-y-6">
                {/* Room Dimensions */}
                <div>
                  <h3 className="text-lg font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Room Dimensions</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Width: {roomWidth} ft
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="50" 
                        value={roomWidth}
                        onChange={(e) => updateRoomDimensions('width', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Depth: {roomDepth} ft
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="50" 
                        value={roomDepth}
                        onChange={(e) => updateRoomDimensions('depth', Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Scale: {scale} pixels/ft
                      </label>
                      <input 
                        type="range" 
                        min="10" 
                        max="40" 
                        value={scale}
                        onChange={(e) => updateScale(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Room Background */}
                <div>
                  <h3 className="text-lg font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Room Background</h3>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleBackgroundUpload}
                    className="block w-full text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 focus:outline-none p-2 mb-3"
                  />
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <input 
                      type="checkbox" 
                      id="showGrid"
                      checked={showGrid} 
                      onChange={() => setShowGrid(!showGrid)}
                      className="w-4 h-4 text-resurgent-blue bg-gray-100 border-gray-300 rounded focus:ring-resurgent-blue dark:focus:ring-resurgent-lightBlue dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="showGrid" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Grid
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="showDimensions"
                      checked={showDimensions} 
                      onChange={() => setShowDimensions(!showDimensions)}
                      className="w-4 h-4 text-resurgent-blue bg-gray-100 border-gray-300 rounded focus:ring-resurgent-blue dark:focus:ring-resurgent-lightBlue dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="showDimensions" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Dimensions
                    </label>
                  </div>
                </div>
                
                {/* AV Equipment Library */}
                <div>
                  <h3 className="text-lg font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">AV Equipment Library</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {furnitureTemplates.map((template, index) => (
                      <div 
                        key={index}
                        onClick={() => addFurnitureItem(template)}
                        className="p-2 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 text-center border border-gray-200 dark:border-gray-600"
                      >
                        <div className="text-2xl mb-1">{template.icon}</div>
                        <p className="text-xs font-medium text-gray-700 dark:text-gray-300">{template.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{template.width}' × {template.depth}'</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div>
                  <h3 className="text-lg font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Actions</h3>
                  
                  <div className="space-y-2">
                    {selectedItem && (
                      <div className="space-y-2 mb-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Item:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {furnitureItems.find(item => item.id === selectedItem)?.name}
                        </p>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => rotateItem('counterclockwise')}
                            className="p-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                          </button>
                          
                          <button 
                            onClick={() => rotateItem('clockwise')}
                            className="p-2 bg-gray-300 dark:bg-gray-600 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                          
                          <button 
                            onClick={deleteSelectedItem}
                            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 ml-auto"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      onClick={clearAllItems}
                      className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      Clear All Items
                    </button>
                    
                    <button 
                      onClick={saveLayout}
                      className="w-full px-4 py-2 bg-resurgent-blue text-white rounded-md hover:bg-opacity-90 transition-all dark:bg-resurgent-lightBlue"
                    >
                      Save Layout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Room Layout Canvas */}
            <div className="md:col-span-3 p-6">
              <div 
                ref={containerRef}
                onClick={handleContainerClick}
                onMouseMove={onDrag}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
                className="relative border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
                style={{
                  width: '100%',
                  height: `${roomDepth * scale}px`,
                  maxHeight: '600px',
                  backgroundImage: roomBackground ? `url(${roomBackground})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Grid */}
                {showGrid && (
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      {/* Vertical grid lines */}
                      {Array.from({ length: Math.floor(roomWidth) + 1 }).map((_, i) => (
                        <line 
                          key={`v-${i}`}
                          x1={i * scale}
                          y1="0"
                          x2={i * scale}
                          y2="100%"
                          stroke="rgba(200, 200, 200, 0.3)"
                          strokeWidth="1"
                        />
                      ))}
                      
                      {/* Horizontal grid lines */}
                      {Array.from({ length: Math.floor(roomDepth) + 1 }).map((_, i) => (
                        <line 
                          key={`h-${i}`}
                          x1="0"
                          y1={i * scale}
                          x2="100%"
                          y2={i * scale}
                          stroke="rgba(200, 200, 200, 0.3)"
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                  </div>
                )}
                
                {/* Room dimensions */}
                {showDimensions && (
                  <div className="absolute inset-x-0 top-2 flex justify-center">
                    <div className="px-3 py-1 bg-black bg-opacity-50 text-white rounded-md text-sm">
                      {roomWidth}' × {roomDepth}'
                    </div>
                  </div>
                )}
                
                {/* Furniture items */}
                {furnitureItems.map((item) => {
                  const widthPx = item.width * scale;
                  const depthPx = item.depth * scale;
                  const xPos = item.x * scale - widthPx / 2;
                  const yPos = item.y * scale - depthPx / 2;
                  
                  return (
                    <div 
                      key={item.id}
                      className={`absolute cursor-move ${selectedItem === item.id ? 'ring-2 ring-blue-500 z-10' : ''}`}
                      style={{
                        width: `${widthPx}px`,
                        height: `${depthPx}px`,
                        left: `${xPos}px`,
                        top: `${yPos}px`,
                        backgroundColor: item.color,
                        transform: `rotate(${item.rotation}deg)`,
                        transition: isDragging.current ? 'none' : 'transform 0.2s ease-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        color: '#fff',
                        fontSize: `${Math.min(widthPx, depthPx) / 4}px`,
                        textAlign: 'center',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}
                      onMouseDown={(e) => startDrag(e, item.id)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      {widthPx > 60 && depthPx > 40 && (
                        <div className="text-xs font-medium truncate max-w-full px-1">{item.name}</div>
                      )}
                      
                      {/* Rotation handle */}
                      {selectedItem === item.id && (
                        <div 
                          className="absolute -top-6 left-1/2 transform -translate-x-1/2 cursor-pointer bg-blue-500 text-white rounded-full p-1"
                          onMouseDown={(e) => startRotation(e, item.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Empty state */}
                {furnitureItems.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6 bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-lg max-w-md">
                      <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Your AV setup is empty</p>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">Add AV equipment from the library on the left</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-4">Drag AV equipment to position them. Select an item to rotate or delete it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AVIntegratorTool;