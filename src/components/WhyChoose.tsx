import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle } from "lucide-react";

const reasons = [
  {
    title: "Expert Team",
    description: "Our team of seasoned professionals brings years of industry experience",
    iconColor: "text-cyan-300",
    bgColor: "bg-cyan-500/20",
    hoverColor: "hover:bg-cyan-500/30",
    gradient: "from-cyan-500/40 to-cyan-600/20",
    darkGradient: "dark:from-cyan-800/40 dark:to-cyan-900/20",
    rotate: -5
  },
  {
    title: "Proven Track Record",
    description: "Consistent success stories across diverse business domains",
    iconColor: "text-emerald-300",
    bgColor: "bg-emerald-500/20",
    hoverColor: "hover:bg-emerald-500/30",
    gradient: "from-emerald-500/40 to-emerald-600/20",
    darkGradient: "dark:from-emerald-800/40 dark:to-emerald-900/20",
    rotate: 3
  },
  {
    title: "Tailored Solutions",
    description: "Customized strategies that align with your unique business needs",
    iconColor: "text-amber-300",
    bgColor: "bg-amber-500/20",
    hoverColor: "hover:bg-amber-500/30",
    gradient: "from-amber-500/40 to-amber-600/20",
    darkGradient: "dark:from-amber-800/40 dark:to-amber-900/20",
    rotate: -2
  },
  {
    title: "Innovation Focus",
    description: "Leveraging cutting-edge technologies and methodologies",
    iconColor: "text-purple-300",
    bgColor: "bg-purple-500/20",
    hoverColor: "hover:bg-purple-500/30",
    gradient: "from-purple-500/40 to-purple-600/20",
    darkGradient: "dark:from-purple-800/40 dark:to-purple-900/20",
    rotate: 4
  }
];

const WhyChoose = () => {
  const { scrollYProgress } = useScroll();
  const scrollRef = React.useRef(null);
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });
  
  // Enhanced parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  // Section-specific animations
  const opacity = useTransform(sectionScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(sectionScrollProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const yOffset = useTransform(sectionScrollProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  
  // Card reveal animation based on scroll position
  const cardRevealProgress = useTransform(sectionScrollProgress, [0.1, 0.4], [0, 1]);
  const cardOpacity = useTransform(cardRevealProgress, [0, 1], [0, 1]);
  const cardScale = useTransform(cardRevealProgress, [0, 1], [0.5, 1]);
  const cardY = useTransform(cardRevealProgress, [0, 1], [100, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0, rotate: 5 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 0.5,
        delay: i * 0.1 // Stagger based on index
      }
    })
  };

  const headingVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.5
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 15,
        delay: 0.4
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "backOut" 
      }
    }
  };

  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8
      }
    }
  };

  return (
    <section 
      ref={scrollRef}
      id="why-choose" 
      className="section-padding bg-gradient-to-br from-resurgent-blue to-resurgent-lightBlue dark:from-gray-900 dark:to-gray-800 overflow-hidden relative min-h-screen flex items-center transition-colors duration-300"
      style={{ position: "relative" }}
    >
      {/* Section content with animations */}
      <motion.div
        style={{
          opacity,
          scale,
          y: yOffset
        }}
        className="w-full h-full absolute inset-0"
      >
        {/* Parallax background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5 dark:bg-white/10 backdrop-blur-sm"
              style={{
                position: "relative",
                width: Math.random() * 300 + 100,
                height: Math.random() * 300 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: `blur(${Math.random() * 10 + 5}px)`
              }}
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0.05, 0.2, 0.05]
              }}
              transition={{
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="container mx-auto container-padding relative z-10">
          <motion.div 
            className="text-center mb-16 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={headingVariants}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-white mb-4"
              variants={textVariants}
            >
              Why Choose Resurgent
            </motion.h2>
            
            <motion.div 
              className="heading-line-center bg-gradient-to-r from-transparent via-white to-transparent h-1.5 mb-8 mx-auto max-w-md"
              variants={lineVariants}
            />
            
            <motion.p 
              className="text-white/90 dark:text-gray-200 max-w-3xl mx-auto text-xl"
              variants={textVariants}
              transition={{ delay: 0.6 }}
            >
              We deliver exceptional value through our comprehensive solutions and dedicated expertise
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
            style={{ 
              opacity: cardOpacity,
              scale: cardScale,
              y: cardY
            }}
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={itemVariants}
                className={`${reason.bgColor} dark:bg-gray-800/80 ${reason.hoverColor} dark:hover:bg-gray-800 backdrop-blur-lg rounded-2xl p-8 border border-white/30 dark:border-gray-700/50 relative overflow-hidden transition-all duration-500 group cursor-default`}
                style={{
                  position: "relative",
                  perspective: "1000px",
                  transform: `rotate(${reason.rotate}deg)`
                }}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} ${reason.darkGradient} opacity-40 z-0`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 ${reason.bgColor} dark:bg-gray-700 rounded-2xl mb-6 flex items-center justify-center ${reason.iconColor}`}
                    variants={iconVariants}
                  >
                    <CheckCircle size={32} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-2xl font-bold text-white dark:text-white mb-2"
                    variants={textVariants}
                  >
                    {reason.title}
                  </motion.h3>
                  
                  <motion.div 
                    className="h-1 w-12 bg-white/30 dark:bg-gray-600 mb-4"
                    variants={underlineVariants}
                  />
                  
                  <motion.p 
                    className="text-white/80 dark:text-gray-300"
                    variants={textVariants}
                    transition={{ delay: 0.2 }}
                  >
                    {reason.description}
                  </motion.p>
                  
                  {/* Interactive hover effects */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-white/60 dark:text-gray-400 text-sm flex items-center gap-1">
                      <span>Learn more</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChoose;