import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, Award, ThumbsUp } from "lucide-react";

// Icons for each testimonial
const testimonialIcons = [Star, Award, ThumbsUp];

const testimonials = [
  {
    id: 1,
    quote: "Resurgent transformed our conference rooms with innovative AV solutions. The Microsoft Teams integration has significantly improved our hybrid meetings.",
    name: "Sarah Johnson",
    position: "CTO, Accenture India",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    rating: 5
  },
  {
    id: 2,
    quote: "Their audiovisual solutions helped us visualize complex data in our collaborative spaces. The results were beyond our expectations.",
    name: "Michael Chen",
    position: "Facilities Director, IBM India",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 5
  },
  {
    id: 3,
    quote: "Working with Resurgent has been a game-changer for our business. Their integrated AV solutions have enhanced our remote collaboration capabilities.",
    name: "Emma Rodriguez",
    position: "Operations Head, Nomura",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    rating: 5
  }
];

// Loading state for images
const ImageWithLoading = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full animate-pulse">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-resurgent-blue border-t-transparent rounded-full"
          />
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.5, ease: "easeOut" }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3, ease: "easeIn" }
      }
    })
  };

  // Star rating animation
  const ratingVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4,
        type: "spring",
        stiffness: 400
      }
    })
  };

  const IconComponent = testimonialIcons[activeIndex % testimonialIcons.length];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="section-padding bg-gradient-to-br from-resurgent-blue to-resurgent-lightBlue relative overflow-hidden"
    >
      {/* Enhanced animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 0.1 : 0 }}
        transition={{ duration: 1 }}
        style={{ y, opacity }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(50px)",
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto container-padding relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-2"
            variants={itemVariants}
          >
            Client Testimonials
          </motion.h2>
          <motion.div 
            className="heading-line-center bg-white mb-6"
            variants={itemVariants}
          ></motion.div>
          <motion.p 
            className="text-white/90 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Here's what our clients say about their experience working with us
          </motion.p>
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Enhanced Navigation Buttons */}
          <motion.button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/80 hover:text-white transition-colors hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm"
            aria-label="Previous testimonial"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            <ChevronLeft size={28} />
          </motion.button>
          
          <motion.button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/80 hover:text-white transition-colors hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm"
            aria-label="Next testimonial"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            variants={itemVariants}
          >
            <ChevronRight size={28} />
          </motion.button>

          {/* Enhanced Testimonials Slider */}
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-8 shadow-xl relative overflow-hidden">
            {/* Animated background blob */}
            <motion.div 
              className="absolute -bottom-20 -right-20 bg-resurgent-blue/5 rounded-full w-64 h-64 z-0"
              animate={{ 
                scale: [1, 1.2, 1], 
                rotate: [0, 10, 0],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut" 
              }}
            />
            
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10"
              >
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/4 relative">
                    <motion.div
                      className="absolute -top-4 -right-2 bg-resurgent-blue rounded-full p-2 z-20 text-white"
                      initial={{ opacity: 0, scale: 0, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <IconComponent size={20} />
                    </motion.div>
                    <motion.div 
                      className="relative"
                      initial={{ scale: 0.9, rotateY: 90 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ 
                        delay: 0.2,
                        type: "spring",
                        stiffness: 400,
                        damping: 10
                      }}
                    >
                      {/* Animated glow effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-resurgent-blue to-resurgent-lightBlue rounded-full opacity-20"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Image with loading state */}
                      <ImageWithLoading
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-24 h-24 rounded-full object-cover relative z-10 border-4 border-white shadow-lg mx-auto"
                      />
                    </motion.div>
                    
                    {/* Star Rating */}
                    <motion.div className="flex justify-center mt-3 space-x-1">
                      {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          custom={i}
                          variants={ratingVariants}
                          initial="initial"
                          animate="animate"
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                  
                  <div className="md:w-3/4 text-center md:text-left">
                    <Quote className="text-resurgent-blue/30 w-8 h-8 mb-4 mx-auto md:mx-0" />
                    <motion.p 
                      className="text-xl text-gray-700 mb-6 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="absolute -left-6 -top-2 text-resurgent-blue text-4xl opacity-30">"</span>
                      {testimonials[activeIndex].quote}
                      <span className="absolute -right-6 -bottom-4 text-resurgent-blue text-4xl opacity-30">"</span>
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="text-lg font-bold text-resurgent-blue">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="text-resurgent-lightBlue">
                        {testimonials[activeIndex].position}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Dots Navigation */}
          <motion.div 
            className="flex justify-center mt-8 gap-3"
            variants={itemVariants}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className="w-3 h-3 rounded-full transition-all relative bg-white/30 backdrop-blur-sm"
                aria-label={`Go to testimonial ${index + 1}`}
                whileHover={{ scale: 1.3 }}
              >
                {index === activeIndex && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-full bg-white shadow-lg shadow-white/20"
                    style={{ 
                      boxShadow: "0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.3)" 
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;