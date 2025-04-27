import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrosoft, 
  faAmazon, 
  faWindows,
  faApple,
  faJava,
  faEbay,
  faSafari,
  faGoogle,
  faReddit,
  faEdge
} from '@fortawesome/free-brands-svg-icons';
import { motion, useInView, useAnimation } from 'framer-motion';

// Enhanced brand colors with gradients and animations
const brandStyles = {
  Microsoft: 'group-hover:text-[#0078D4] group-hover:drop-shadow-[0_0_15px_rgba(0,120,212,0.8)]',
  IBM: 'group-hover:text-[#0530AD] group-hover:drop-shadow-[0_0_15px_rgba(5,48,173,0.8)]',
  Accenture: 'group-hover:text-[#A100FF] group-hover:drop-shadow-[0_0_15px_rgba(161,0,255,0.8)]',
  Amazon: 'group-hover:text-[#FF9900] group-hover:drop-shadow-[0_0_15px_rgba(255,153,0,0.8)]',
  Samsung: 'group-hover:text-[#1428A0] group-hover:drop-shadow-[0_0_15px_rgba(20,40,160,0.8)]',
  HP: 'group-hover:text-[#0096D6] group-hover:drop-shadow-[0_0_15px_rgba(0,150,214,0.8)]',
  KPMG: 'group-hover:text-[#0091DA] group-hover:drop-shadow-[0_0_15px_rgba(0,145,218,0.8)]',
  SAP: 'group-hover:text-[#0FAAFF] group-hover:drop-shadow-[0_0_15px_rgba(15,170,255,0.8)]',
  Shell: 'group-hover:text-[#FF1E00] group-hover:drop-shadow-[0_0_15px_rgba(255,30,0,0.8)]',
  Nomura: 'group-hover:text-[#AB0520] group-hover:drop-shadow-[0_0_15px_rgba(171,5,32,0.8)]',
};

const clientLogos = [
  { id: 1, name: "Microsoft", icon: faMicrosoft, style: brandStyles.Microsoft },
  { id: 2, name: "IBM", icon: faJava, style: brandStyles.IBM },
  { id: 3, name: "Amazon", icon: faAmazon, style: brandStyles.Amazon },
  { id: 4, name: "Samsung", icon: faSafari, style: brandStyles.Samsung },
  { id: 5, name: "HP", icon: faWindows, style: brandStyles.HP },
  { id: 6, name: "Accenture", icon: faEdge, style: brandStyles.Accenture },
  { id: 7, name: "KPMG", icon: faEbay, style: brandStyles.KPMG },
  { id: 8, name: "SAP", icon: faApple, style: brandStyles.SAP },
  { id: 9, name: "Shell", icon: faReddit, style: brandStyles.Shell },
  { id: 10, name: "Nomura", icon: faGoogle, style: brandStyles.Nomura },
];

const ClientLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const controls = useAnimation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  const hoverEffect = {
    scale: 1.15,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  };

  return (
    <div ref={ref} className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 sm:py-24 overflow-hidden transition-colors duration-300">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100 dark:bg-blue-900 opacity-10 transition-colors duration-300"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
            }}
            animate={{
              x: [null, Math.random() * 200 - 100],
              y: [null, Math.random() * 200 - 100],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300">
            Our Clients
          </h2>
          <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-6 sm:mb-8 rounded-full"></div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Innovation drives our AV integration, enhancing client experiences through seamless technology solutions, custom-tailored to their unique needs.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8"
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {clientLogos.map((client, index) => (
            <motion.div 
              key={client.id}
              className="group flex items-center justify-center"
              variants={item}
              style={{ height: '100px' }}
              whileHover={hoverEffect}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative">
                {/* Main icon with enhanced glow */}
                <FontAwesomeIcon 
                  icon={client.icon} 
                  size="4x" 
                  className={`text-gray-300 dark:text-gray-600 transition-all duration-500 ${client.style} group-hover:opacity-100 opacity-90`}
                />
                
                {/* Animated glow effect */}
                <motion.span 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1.5 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="absolute w-24 h-24 rounded-full bg-white dark:bg-gray-800 blur-xl transition-colors duration-300"></span>
                </motion.span>
                
                {/* Floating name label */}
                <motion.div
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-colors duration-300"
                  initial={{ y: 10 }}
                  animate={{ 
                    y: hoveredIndex === index ? 0 : 10,
                    opacity: hoveredIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {client.name}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Join our growing list of satisfied clients
          </h3>
          <a 
            href="#contact" 
            className="inline-block py-3 px-6 bg-resurgent-blue dark:bg-resurgent-lightBlue text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Schedule a Demo
          </a>
        </motion.div>
        
        {/* Animated border effect with motion */}
        <motion.div 
          className="mt-20 mx-auto max-w-4xl relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-full opacity-20"></div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-px w-1/3 mx-auto blur-sm"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent h-px w-1/4 mx-auto blur-[1px]"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ClientLogos;