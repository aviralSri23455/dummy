import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  features: string[];
  category: string;
}

const ProductShowcase: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Executive Conference Table',
      description: 'Premium oak conference table with integrated power solutions and cable management.',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1332&q=80',
      price: '$2,499',
      features: ['Seats 12', 'Integrated power outlets', 'Cable management', 'Scratch-resistant surface'],
      category: 'Tables'
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      description: 'Fully adjustable ergonomic chair with lumbar support and breathable mesh back.',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
      price: '$349',
      features: ['Adjustable height', 'Lumbar support', '360° swivel', 'Breathable mesh'],
      category: 'Chairs'
    },
    {
      id: 3,
      name: 'Smart Whiteboard',
      description: 'Interactive digital whiteboard with cloud synchronization and multi-user collaboration.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
      price: '$1,899',
      features: ['4K resolution', 'Touch-enabled', 'Cloud sync', 'Video conferencing integration'],
      category: 'Technology'
    },
  ]);

  const [activeProduct, setActiveProduct] = useState<Product | null>(products[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isRotating, setIsRotating] = useState(false);
  const productRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(products.map(product => product.category)))];

  // Filter products by category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Handle product selection
  const handleProductSelect = (product: Product) => {
    setActiveProduct(product);
    setRotation(0); // Reset rotation when changing products
    setIsRotating(false);
    setIsLoading(true); // Reset loading state when changing products
    
    // Preload the image
    const img = new Image();
    img.src = product.image;
    img.onload = () => {
      // Always update loading state when image loads
      setIsLoading(false);
    };
    img.onerror = () => {
      // Always update loading state when image errors
      setIsLoading(false);
    };
  };

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsLoading(true); // Reset loading state when changing category
    setRotation(0); // Reset rotation when changing category
    setIsRotating(false);
    
    let newActiveProduct: Product | null = null;
    
    if (category === 'All') {
      newActiveProduct = products[0];
    } else {
      const filtered = products.filter(product => product.category === category);
      if (filtered.length > 0) {
        newActiveProduct = filtered[0];
      }
    }
    
    if (newActiveProduct) {
      setActiveProduct(newActiveProduct);
      
      // Preload the image
      const img = new Image();
      img.src = newActiveProduct.image;
      img.onload = () => {
        // Always update loading state when image loads
        setIsLoading(false);
      };
      img.onerror = () => {
        // Always update loading state when image errors
        setIsLoading(false);
      };
    }
  };

  // Toggle auto-rotation
  const toggleRotation = () => {
    setIsRotating(!isRotating);
  };

  // Handle auto-rotation
  useEffect(() => {
    let animationId: number;
    
    if (isRotating && productRef.current) {
      const rotate = () => {
        setRotation(prev => (prev + 1) % 360);
        animationId = requestAnimationFrame(rotate);
      };
      animationId = requestAnimationFrame(rotate);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isRotating]);
  
  // Add a safety timeout to ensure loading state doesn't get stuck
  useEffect(() => {
    // Set a timeout to force loading to complete after 3 seconds
    // This helps when images might be having trouble loading
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 3000);
    
    return () => clearTimeout(timeoutId);
  }, [isLoading, activeProduct]);

  return (
    <section id="product-showcase" className="section-padding bg-gray-50 dark:bg-gray-900 transition-colors duration-300" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2 transition-colors duration-300">Interactive Product Showcase</h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">Explore our premium office and meeting room products with our interactive 3D showcase.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300" data-aos="fade-up" data-aos-delay="600">
          {/* Category Filter */}
          <div className="flex overflow-x-auto p-4 bg-gray-100 dark:bg-gray-700 gap-2 transition-colors duration-300">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-300 ${selectedCategory === category 
                  ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Product Display */}
          <div className="grid md:grid-cols-3 gap-6 p-6">
            {/* Product List */}
            <div className="md:col-span-1 space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeProduct?.id === product.id 
                    ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm mb-2 line-clamp-2 transition-colors duration-300">{product.description}</p>
                  <p className="font-bold">{product.price}</p>
                </div>
              ))}
            </div>

            {/* Active Product Display */}
            <div className="md:col-span-2 flex flex-col">
              {activeProduct && (
                <>
                  <div className="relative h-[300px] md:h-[400px] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden transition-colors duration-300">
                    <div 
                      ref={productRef}
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        transform: `perspective(1000px) rotateY(${rotation}deg)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-600 bg-opacity-50 dark:bg-opacity-50 transition-colors duration-300">
                          <div className="w-12 h-12 border-4 border-resurgent-blue dark:border-resurgent-lightBlue border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                      <img 
                        key={activeProduct.id} /* Add key to force re-render when product changes */
                        src={activeProduct.image} 
                        alt={activeProduct.name} 
                        className="max-h-full max-w-full object-contain"
                        onLoad={(e) => {
                          // Successfully loaded the image
                          const target = e.target as HTMLImageElement;
                          target.style.opacity = '1';
                          setIsLoading(false);
                        }}
                        onError={(e) => {
                          // Fallback image if the main one fails to load
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop
                          target.style.opacity = '1';
                          
                          // Create a more reliable fallback image with product name
                          const fallbackSvg = `
                            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                              <rect width="100%" height="100%" fill="${document.documentElement.classList.contains('dark') ? '#374151' : '#f0f0f0'}"/>
                              <text x="50%" y="50%" font-family="Arial" font-size="24" text-anchor="middle" dominant-baseline="middle" fill="${document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#555'}">${activeProduct.name}</text>
                            </svg>
                          `;
                          
                          // Use a cleaner base64 encoding approach
                          const encodedSvg = btoa(fallbackSvg.trim());
                          target.src = `data:image/svg+xml;base64,${encodedSvg}`;
                          setIsLoading(false);
                        }}
                        style={{ opacity: 1, transition: 'opacity 0.3s ease' }}
                      />
                    </div>
                    <button
                      onClick={toggleRotation}
                      className="absolute bottom-4 right-4 bg-resurgent-blue dark:bg-resurgent-lightBlue text-white p-2 rounded-full hover:bg-opacity-90 transition-all duration-300"
                    >
                      {isRotating ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="mt-6 space-y-4">
                    <h2 className="text-2xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue transition-colors duration-300">{activeProduct.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{activeProduct.description}</p>
                    <div>
                      <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-200 transition-colors duration-300">Features:</h3>
                      <ul className="grid grid-cols-2 gap-2">
                        {activeProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300 transition-colors duration-300">
                            <svg className="w-5 h-5 mr-2 text-green-500 dark:text-green-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue transition-colors duration-300">{activeProduct.price}</span>
                      <button className="btn-primary bg-resurgent-blue dark:bg-resurgent-lightBlue text-white hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all duration-300">Add to Quote</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;