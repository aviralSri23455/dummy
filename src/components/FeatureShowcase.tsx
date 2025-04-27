import React, { useState } from 'react';
import ProductShowcase from './ProductShowcase';
import VirtualMeasurement from './VirtualMeasurement';
import ColorThemeCustomizer from './ColorThemeCustomizer';
import AVIntegratorTool from './AVIntegratorTool';
import ARVisualization from './ARVisualization';
import CollaborativeFeatures from './CollaborativeFeatures';
import EquipmentARFeatures from './EquipmentARFeatures';

type FeatureTab = 'product' | 'measurement' | 'color' | 'furniture' | 'ar' | 'collaborative' | 'equipment';

const FeatureShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeatureTab>('product');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'product':
        return <ProductShowcase />;
      case 'measurement':
        return <VirtualMeasurement />;
      case 'color':
        return <ColorThemeCustomizer />;
      case 'furniture':
        return <AVIntegratorTool />;
      case 'ar':
        return <ARVisualization />;
      case 'collaborative':
        return <CollaborativeFeatures />;

      case 'equipment':
        return <EquipmentARFeatures />;
      default:
        return <ProductShowcase />;
    }
  };

  return (
    <section id="feature-showcase" className="section-padding bg-gray-50 dark:bg-gray-800" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2">Advanced Design Tools</h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">Explore our suite of interactive tools to design, visualize, and customize your perfect workspace.</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden" data-aos="fade-up" data-aos-delay="600">
          <div className="flex flex-wrap overflow-x-auto p-4 bg-gray-100 dark:bg-gray-700 gap-2 justify-center">
            <button
              onClick={() => setActiveTab('product')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'product' 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              Product Showcase
            </button>
            <button
              onClick={() => setActiveTab('measurement')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'measurement' 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              Virtual Measurement
            </button>
            <button
              onClick={() => setActiveTab('color')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'color' 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              Color Theme Customizer
            </button>
            <button
              onClick={() => setActiveTab('furniture')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'furniture' 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              AV Integrator Equipment
            </button>
            <button
              onClick={() => setActiveTab('ar')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'ar' 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              AR Visualization
            </button>
            <button
              onClick={() => setActiveTab('collaborative')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'collaborative' 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              Collaborative Features
            </button>

            <button
              onClick={() => setActiveTab('equipment')}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${activeTab === 'equipment' 
                ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
            >
              Equipment AR
            </button>
          </div>

          <div className="p-0">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;