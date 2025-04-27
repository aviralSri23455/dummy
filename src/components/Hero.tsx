import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-300 dark:bg-gray-900"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(10,35,81,0.95) 0%, rgba(0,102,204,0.9) 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-aos="fade-up" data-aos-delay="200"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute left-0 top-0 w-full h-full animate-pulse" 
             style={{backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI0ZGRiIgZmlsbC1vcGFjaXR5PSIxIj48Y2lyY2xlIGN4PSIwIiBjeT0iMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjQwIiBjeT0iMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjYwIiBjeT0iMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjAiIHI9IjIiLz48Y2lyY2xlIGN4PSIxMjAiIGN5PSIwIiByPSIyIi8+PGNpcmNsZSBjeD0iMTQwIiBjeT0iMCIgcj0iMiIvPjxjaXJjbGUgY3g9IjE2MCIgY3k9IjAiIHI9IjIiLz48Y2lyY2xlIGN4PSIxODAiIGN5PSIwIiByPSIyIi8+PC9nPjwvc3ZnPg==')",
             backgroundRepeat: "repeat"}}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10" data-aos="fade-right" data-aos-delay="400">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-colors duration-300">
              Audio Visual Solutions<br />
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-white opacity-90 transition-colors duration-300"
              >
                For Seamless Collaboration
              </motion.span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white text-lg mb-8 max-w-lg transition-colors duration-300"
            >
              We create productive collaborative experiences for corporate environments with our innovative audio-visual technology, enabling interactive workspaces that transform how professionals share information.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#services" className="btn-primary hover:scale-105 transform transition-transform">
                Our Solutions
              </a>
              <a href="#contact" className="btn-outline text-white border-white hover:bg-white hover:text-resurgent-blue hover:scale-105 transform transition-transform">
                Contact Us
              </a>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center"
            data-aos="fade-left" data-aos-delay="600"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-72 md:h-72 relative z-10 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl transition-all duration-300">
                <motion.img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Modern Conference Room with AV Integration"
                  className="w-full h-full object-cover"
                  initial={{ y: 5 }}
                  animate={{ y: [-5, 5, -5] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
