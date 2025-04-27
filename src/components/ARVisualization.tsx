import React, { useState, useEffect } from 'react';

const ARVisualization: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>('projector');
  const [viewMode, setViewMode] = useState<'ar' | 'gallery'>('gallery');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  
  // Add custom CSS for rotation animation
  useEffect(() => {
    // Create a style element
    const styleEl = document.createElement('style');
    // Define the animation
    styleEl.innerHTML = `
      @keyframes slow-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .animate-slow-spin {
        animation: slow-spin 15s linear infinite;
      }
    `;
    // Append to document head
    document.head.appendChild(styleEl);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Sample AV equipment data
  const avEquipment = [
    {
      id: 'projector',
      name: 'Smart Projector Pro',
      description: 'Ultra HD 4K projector with smart connectivity and wireless casting capabilities.',
      features: [
        'Native 4K UHD Resolution',
        'Wireless Screen Mirroring',
        'Smart Device Integration',
        'Low Latency for Interactive Presentations',
        'Automatic Keystone Correction'
      ],
      price: '$2,499'
    },
    {
      id: 'videowall',
      name: 'Dynamic Video Wall System',
      description: 'Modular video wall solution for corporate environments with seamless display technology.',
      features: [
        'Bezel-less Design',
        'Modular Configuration',
        'Central Control System',
        'High Brightness Display',
        'Content Management Software Included'
      ],
      price: '$8,750'
    },
    {
      id: 'conferencing',
      name: 'Enterprise Conferencing System',
      description: 'Complete audio-visual solution for modern conference rooms with integrated collaboration tools.',
      features: [
        'HD PTZ Cameras',
        'Spatial Audio Technology',
        'Multi-platform Compatibility',
        'Touch Control Interface',
        'Noise Cancellation Technology'
      ],
      price: '$5,299'
    },
    {
      id: 'interactive',
      name: 'Interactive Display Board',
      description: 'Touch-enabled large format display for interactive presentations and collaborative sessions.',
      features: [
        '86" 4K UHD Display',
        'Multi-touch Capability',
        'Integrated Whiteboarding Software',
        'Object Recognition',
        'Cloud Integration for Content Sharing'
      ],
      price: '$4,199'
    }
  ];

  const selectedEquipment = avEquipment.find(item => item.id === selectedDevice) || avEquipment[0];

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AR Visualization Area */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="relative aspect-video w-full">
            {viewMode === 'ar' ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-6">
                  <div className="mb-4 text-resurgent-blue dark:text-resurgent-lightBlue">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AR Visualization Mode</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    In a real implementation, this would use your device's camera to show how the selected equipment would look in your actual workspace.
                  </p>
                  <button 
                    onClick={() => setViewMode('gallery')} 
                    className="px-4 py-2 bg-resurgent-blue dark:bg-resurgent-lightBlue text-white rounded-md hover:opacity-90 transition-opacity"
                  >
                    Switch to Gallery View
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <div className={`transform transition-transform duration-1000 ${autoRotate ? 'animate-slow-spin' : ''}`}>
                  <img 
                    src={selectedDevice === 'projector' ? 'https://images.pexels.com/photos/1462011/pexels-photo-1462011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : 
                         selectedDevice === 'videowall' ? 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : 
                         selectedDevice === 'conferencing' ? 'https://images.pexels.com/photos/3205568/pexels-photo-3205568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' : 
                         'https://images.pexels.com/photos/4792729/pexels-photo-4792729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                    alt={selectedEquipment.name} 
                    className="max-h-64 max-w-full object-contain"
                    onError={(e) => {
                      // Fallback image if the main one fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Prevent infinite loop
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzU1NSI+JyArIHNlbGVjdGVkRXF1aXBtZW50Lm5hbWUgKyAnPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                </div>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button 
                    onClick={() => setAutoRotate(!autoRotate)}
                    className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title={autoRotate ? "Stop Rotation" : "Start Rotation"}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-resurgent-blue dark:text-resurgent-lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={autoRotate ? "M10 9v6m4-6v6m-9-6h14" : "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"} />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setViewMode('ar')}
                    className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Switch to AR View"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-resurgent-blue dark:text-resurgent-lightBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">{selectedEquipment.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedEquipment.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-resurgent-blue dark:text-resurgent-lightBlue">{selectedEquipment.price}</span>
              <button className="px-4 py-2 bg-resurgent-blue dark:bg-resurgent-lightBlue text-white rounded-md hover:opacity-90 transition-opacity">
                Request Quote
              </button>
            </div>
          </div>
        </div>

        {/* Equipment Selection and Details */}
        <div>
          <h3 className="text-xl font-bold mb-4">Select Audio-Visual Equipment</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {avEquipment.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedDevice(item.id)}
                className={`p-4 rounded-lg text-left transition-colors ${selectedDevice === item.id 
                  ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm truncate">{item.price}</p>
              </button>
            ))}
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-bold mb-2">Key Features</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {selectedEquipment.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="font-bold mb-2">About AR Visualization</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our AR visualization tool helps you see exactly how our audio-visual equipment will look and fit in your workspace before making a purchase decision. In a full implementation, you would be able to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use your device's camera to place virtual equipment in your real environment</li>
              <li>Adjust positioning and scale to ensure perfect fit</li>
              <li>View different equipment configurations and options</li>
              <li>Share visualizations with your team for collaborative decision-making</li>
              <li>Save configurations for future reference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARVisualization;