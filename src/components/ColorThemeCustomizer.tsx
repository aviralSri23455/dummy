import React, { useState, useEffect } from 'react';

interface ColorTheme {
  id: number;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  description: string;
  preview: string;
}

const ColorThemeCustomizer: React.FC = () => {
  const [colorThemes, setColorThemes] = useState<ColorTheme[]>([
    {
      id: 1,
      name: 'Modern Executive',
      primaryColor: '#2c3e50',
      secondaryColor: '#ecf0f1',
      accentColor: '#3498db',
      description: 'Professional and sleek color scheme ideal for executive offices and conference rooms.',
      preview: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 2,
      name: 'Creative Studio',
      primaryColor: '#ffffff',
      secondaryColor: '#f5f5f5',
      accentColor: '#e74c3c',
      description: 'Bright and inspiring color palette perfect for creative spaces and collaborative areas.',
      preview: 'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 3,
      name: 'Tech Minimalist',
      primaryColor: '#121212',
      secondaryColor: '#212121',
      accentColor: '#4caf50',
      description: 'Sleek, dark theme with vibrant accents for modern tech companies and startups.',
      preview: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 4,
      name: 'Warm Professional',
      primaryColor: '#f9f3e5',
      secondaryColor: '#e8dacb',
      accentColor: '#c19a6b',
      description: 'Warm, inviting tones that create a comfortable yet professional atmosphere.',
      preview: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 5,
      name: 'Vibrant Collaboration',
      primaryColor: '#ffffff',
      secondaryColor: '#f0f0f0',
      accentColor: '#9c27b0',
      description: 'Energetic color scheme designed to stimulate creativity and collaboration.',
      preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
  ]);

  const [selectedTheme, setSelectedTheme] = useState<ColorTheme>(colorThemes[0]);
  const [customTheme, setCustomTheme] = useState<{
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  }>({
    primaryColor: colorThemes[0].primaryColor,
    secondaryColor: colorThemes[0].secondaryColor,
    accentColor: colorThemes[0].accentColor,
  });
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [roomView, setRoomView] = useState('office');

  // Update custom theme when selected theme changes
  useEffect(() => {
    if (!isCustomizing) {
      setCustomTheme({
        primaryColor: selectedTheme.primaryColor,
        secondaryColor: selectedTheme.secondaryColor,
        accentColor: selectedTheme.accentColor,
      });
    }
  }, [selectedTheme, isCustomizing]);

  // Handle theme selection
  const handleThemeSelect = (theme: ColorTheme) => {
    setSelectedTheme(theme);
    setIsCustomizing(false);
  };

  // Handle custom color change
  const handleColorChange = (colorType: 'primaryColor' | 'secondaryColor' | 'accentColor', color: string) => {
    setCustomTheme(prev => ({
      ...prev,
      [colorType]: color,
    }));
    setIsCustomizing(true);
  };

  // Get room image based on selected view
  const getRoomImage = () => {
    switch (roomView) {
      case 'office':
        return 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80';
      case 'conference':
        return 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80';
      case 'lounge':
        return 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
      default:
        return 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80';
    }
  };

  // Save custom theme
  const saveCustomTheme = () => {
    const newCustomTheme: ColorTheme = {
      id: colorThemes.length + 1,
      name: `Custom Theme ${colorThemes.length + 1}`,
      primaryColor: customTheme.primaryColor,
      secondaryColor: customTheme.secondaryColor,
      accentColor: customTheme.accentColor,
      description: 'Your custom color theme',
      preview: getRoomImage(),
    };

    setColorThemes(prev => [...prev, newCustomTheme]);
    setSelectedTheme(newCustomTheme);
    setIsCustomizing(false);
  };

  return (
    <section id="color-theme-customizer" className="section-padding bg-gray-50 dark:bg-gray-800" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2">Color Theme Customizer</h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Visualize different color schemes for your workspace or create your own custom theme.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="600">
          <div className="grid md:grid-cols-3 gap-0">
            {/* Theme Selection Sidebar */}
            <div className="md:col-span-1 bg-gray-100 dark:bg-gray-800 p-6 overflow-y-auto max-h-[700px]">
              <h3 className="text-xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Select a Theme</h3>
              
              <div className="space-y-4 mb-6">
                {colorThemes.map((theme) => (
                  <div 
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme)}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${selectedTheme.id === theme.id 
                      ? 'ring-2 ring-resurgent-blue dark:ring-resurgent-lightBlue' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: theme.primaryColor }}></div>
                      <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: theme.secondaryColor }}></div>
                      <div className="w-6 h-6 rounded-full mr-2" style={{ backgroundColor: theme.accentColor }}></div>
                      <h4 className="font-bold">{theme.name}</h4>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{theme.description}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Customize Colors</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="color" 
                        value={customTheme.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="w-10 h-10 rounded-md border-0 cursor-pointer"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{customTheme.primaryColor}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="color" 
                        value={customTheme.secondaryColor}
                        onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                        className="w-10 h-10 rounded-md border-0 cursor-pointer"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{customTheme.secondaryColor}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Accent Color
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="color" 
                        value={customTheme.accentColor}
                        onChange={(e) => handleColorChange('accentColor', e.target.value)}
                        className="w-10 h-10 rounded-md border-0 cursor-pointer"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{customTheme.accentColor}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={saveCustomTheme}
                    className="w-full mt-4 px-4 py-2 bg-resurgent-blue text-white rounded-md hover:bg-opacity-90 transition-all dark:bg-resurgent-lightBlue"
                  >
                    Save Custom Theme
                  </button>
                </div>
              </div>
            </div>
            
            {/* Theme Preview */}
            <div className="md:col-span-2 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4">Preview</h3>
                
                <div className="flex space-x-4 mb-4 overflow-x-auto pb-2">
                  <button
                    onClick={() => setRoomView('office')}
                    className={`px-4 py-2 rounded-md whitespace-nowrap ${roomView === 'office' 
                      ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    Office
                  </button>
                  <button
                    onClick={() => setRoomView('conference')}
                    className={`px-4 py-2 rounded-md whitespace-nowrap ${roomView === 'conference' 
                      ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    Conference Room
                  </button>
                  <button
                    onClick={() => setRoomView('lounge')}
                    className={`px-4 py-2 rounded-md whitespace-nowrap ${roomView === 'lounge' 
                      ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                  >
                    Lounge Area
                  </button>
                </div>
              </div>
              
              <div className="relative rounded-lg overflow-hidden h-[400px] mb-6">
                <img 
                  src={getRoomImage()} 
                  alt="Room Preview" 
                  className="w-full h-full object-cover"
                />
                
                {/* Color Overlay */}
                <div 
                  className="absolute inset-0 opacity-30" 
                  style={{ backgroundColor: isCustomizing ? customTheme.primaryColor : selectedTheme.primaryColor }}
                ></div>
                
                {/* Furniture Elements with Theme Colors */}
                <div className="absolute bottom-0 left-0 right-0 h-1/4 opacity-70" style={{ backgroundColor: isCustomizing ? customTheme.secondaryColor : selectedTheme.secondaryColor }}></div>
                
                <div className="absolute top-10 right-10 w-20 h-20 rounded-full opacity-80" style={{ backgroundColor: isCustomizing ? customTheme.accentColor : selectedTheme.accentColor }}></div>
                
                <div className="absolute bottom-10 left-10 w-40 h-10 rounded-md opacity-80" style={{ backgroundColor: isCustomizing ? customTheme.accentColor : selectedTheme.accentColor }}></div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4" style={{ color: isCustomizing ? customTheme.accentColor : selectedTheme.accentColor }}>
                  {isCustomizing ? 'Custom Theme' : selectedTheme.name}
                </h3>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {isCustomizing ? 'Your custom color theme' : selectedTheme.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: isCustomizing ? customTheme.primaryColor : selectedTheme.primaryColor }}>
                    <p className="text-white font-bold">Primary Color</p>
                    <p className="text-white">{isCustomizing ? customTheme.primaryColor : selectedTheme.primaryColor}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: isCustomizing ? customTheme.secondaryColor : selectedTheme.secondaryColor, color: '#333' }}>
                    <p className="font-bold">Secondary Color</p>
                    <p>{isCustomizing ? customTheme.secondaryColor : selectedTheme.secondaryColor}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: isCustomizing ? customTheme.accentColor : selectedTheme.accentColor }}>
                    <p className="text-white font-bold">Accent Color</p>
                    <p className="text-white">{isCustomizing ? customTheme.accentColor : selectedTheme.accentColor}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button className="btn-primary dark:bg-resurgent-lightBlue dark:hover:bg-opacity-90">
                  Apply Theme to Your Space
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorThemeCustomizer;