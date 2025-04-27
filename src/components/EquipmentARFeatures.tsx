import React, { useState } from 'react';

interface Equipment {
  id: number;
  name: string;
  description: string;
  image: string;
  arFeatures: string[];
  compatibility: string[];
  category: string;
}

const EquipmentARFeatures: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: 1,
      name: 'Smart Projector Pro',
      description: 'Ultra HD 4K projector with smart connectivity and wireless casting capabilities for Resurgent AV Integrators.',
      image: '/images/av-equipment/smart-projector.jpg',
      arFeatures: ['Real-time environment mapping', 'Interactive touch surface projection', 'Multi-user collaboration', 'Gesture control'],
      compatibility: ['Windows 10/11', 'macOS', 'iOS', 'Android'],
      category: 'Projection'
    },
    {
      id: 2,
      name: 'Dynamic Video Wall System',
      description: 'Modular video wall solution for corporate environments with seamless display technology by Resurgent AV Integrators.',
      image: '/images/av-equipment/video-wall.jpg',
      arFeatures: ['Bezel-less design visualization', 'Remote configuration options', 'Spatial content mapping', 'Multi-source display management'],
      compatibility: ['HDMI 2.1', 'DisplayPort 1.4', 'HDBaseT', 'IP Streaming'],
      category: 'Display'
    },
    {
      id: 3,
      name: 'Enterprise Conferencing System',
      description: 'Complete audio-visual solution for modern conference rooms with integrated collaboration tools from Resurgent AV Integrators.',
      image: '/images/av-equipment/conference-system.jpg',
      arFeatures: ['Virtual room layout preview', 'Acoustic environment simulation', 'Component placement optimization', 'Cable management visualization'],
      compatibility: ['Microsoft Teams', 'Zoom', 'Google Meet', 'Cisco Webex'],
      category: 'Conferencing'
    },
  ]);
  
  // Fallback images to ensure content always displays
  const fallbackImages = {
    '/images/av-equipment/smart-projector.jpg': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzU1NSI+U21hcnQgUHJvamVjdG9yIFBybzwvdGV4dD48L3N2Zz4=',
    '/images/av-equipment/video-wall.jpg': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzU1NSI+RHluYW1pYyBWaWRlbyBXYWxsIFN5c3RlbTwvdGV4dD48L3N2Zz4=',
    '/images/av-equipment/conference-system.jpg': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzU1NSI+RW50ZXJwcmlzZSBDb25mZXJlbmNpbmcgU3lzdGVtPC90ZXh0Pjwvc3ZnPg=='
  };

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(equipmentList[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [arDemoActive, setArDemoActive] = useState(false);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(equipmentList.map(item => item.category)))];

  // Filter equipment by category
  const filteredEquipment = selectedCategory === 'All' 
    ? equipmentList 
    : equipmentList.filter(item => item.category === selectedCategory);

  // Handle equipment selection
  const handleEquipmentSelect = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setArDemoActive(false);
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSelectedEquipment(equipmentList[0]);
    } else {
      const filtered = equipmentList.filter(item => item.category === category);
      if (filtered.length > 0) {
        setSelectedEquipment(filtered[0]);
      }
    }
    setArDemoActive(false);
  };

  // Toggle AR demo
  const toggleArDemo = () => {
    setArDemoActive(!arDemoActive);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2">Resurgent AV Integrators - Equipment AR Features</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Experience our advanced AR-enabled audiovisual equipment for professional corporate environments.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Equipment List */}
        <div className="md:col-span-1 space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {/* Category Filter */}
          <div className="flex overflow-x-auto mb-4 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-md whitespace-nowrap text-sm ${selectedCategory === category 
                  ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredEquipment.map((equipment) => (
            <div 
              key={equipment.id}
              onClick={() => handleEquipmentSelect(equipment)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${selectedEquipment?.id === equipment.id 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              <h3 className="font-bold text-lg mb-2">{equipment.name}</h3>
              <p className="text-sm mb-2 line-clamp-2">{equipment.description}</p>
              <p className="text-sm">{equipment.category}</p>
            </div>
          ))}
        </div>

        {/* Selected Equipment Display */}
        <div className="md:col-span-2 flex flex-col">
          {selectedEquipment && (
            <>
              <div className="relative h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center relative">
                  <img 
                    src={selectedEquipment.image} 
                    alt={selectedEquipment.name} 
                    className={`max-h-full max-w-full object-contain transition-all duration-500 ${arDemoActive ? 'opacity-70' : 'opacity-100'}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (fallbackImages[selectedEquipment.image]) {
                        target.src = fallbackImages[selectedEquipment.image];
                      }
                    }}
                  />
                  
                  {/* AR Overlay Elements */}
                  {arDemoActive && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* AR UI Elements */}
                      <div className="absolute top-1/4 left-1/4 bg-blue-500 bg-opacity-30 border border-blue-400 rounded-lg p-3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <div className="text-white text-sm font-medium">HDMI Input</div>
                      </div>
                      
                      <div className="absolute top-1/3 right-1/4 bg-green-500 bg-opacity-30 border border-green-400 rounded-lg p-3 transform translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <div className="text-white text-sm font-medium">Control Panel</div>
                      </div>
                      
                      <div className="absolute bottom-1/3 left-1/3 bg-purple-500 bg-opacity-30 border border-purple-400 rounded-lg p-3 transform -translate-x-1/2 translate-y-1/2 animate-pulse">
                        <div className="text-white text-sm font-medium">Network Interface</div>
                      </div>
                      
                      {/* AR Data Visualization */}
                      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <line x1="30%" y1="30%" x2="45%" y2="40%" stroke="rgba(59, 130, 246, 0.8)" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="70%" y1="35%" x2="55%" y2="45%" stroke="rgba(16, 185, 129, 0.8)" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="40%" y1="65%" x2="50%" y2="55%" stroke="rgba(139, 92, 246, 0.8)" strokeWidth="2" strokeDasharray="5,5" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={toggleArDemo}
                  className="absolute bottom-4 right-4 bg-resurgent-blue dark:bg-resurgent-lightBlue text-white p-2 rounded-full hover:bg-opacity-90 transition-all"
                  title={arDemoActive ? 'Disable AR Preview' : 'Enable AR Preview'}
                >
                  {arDemoActive ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <h2 className="text-2xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue">{selectedEquipment.name}</h2>
                <p className="text-gray-700 dark:text-gray-300">{selectedEquipment.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-2">AR Features:</h3>
                    <ul className="space-y-1">
                      {selectedEquipment.arFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Compatibility:</h3>
                    <ul className="space-y-1">
                      {selectedEquipment.compatibility.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <button className="btn-outline dark:border-resurgent-lightBlue dark:text-resurgent-lightBlue dark:hover:bg-resurgent-lightBlue/10">
                    View AV Equipment in AR
                  </button>
                  <button className="btn-primary dark:bg-resurgent-lightBlue dark:hover:bg-opacity-90">
                    Request AV Integration Quote
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentARFeatures;