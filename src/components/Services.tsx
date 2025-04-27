import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import AOS from 'aos';
import 'aos/dist/aos.css';

const serviceItems = [
  {
    title: "Corporate",
    description: "Our AV solutions for businesses are designed to transcend spaces and connect people across multiple locations and devices, empowering teams as they work towards a common goal.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    details: "We integrate Microsoft Teams Rooms, Cisco solutions, and high-end conferencing systems that enhance productivity in hybrid workplaces with seamless communication tools."
  },
  {
    title: "Education",
    description: "By augmenting lessons and boosting interaction, our AV integration solutions enrich the learning and teaching experience in both traditional and digital classrooms.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    details: "Our solutions include interactive whiteboards like Samsung Flip, digital learning platforms, and advanced presentation systems that make education more engaging and effective."
  },
  {
    title: "Healthcare",
    description: "Our integrated AV solutions for hospitals are designed to deliver precision and speed through advanced software and audiovisual equipment with a wide range of applications.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1491&q=80",
    details: "From telemedicine platforms to operating room visualization systems, our healthcare AV solutions enhance communication, training, and patient care with cutting-edge technology."
  },
  {
    title: "Public Sector",
    description: "Our audiovisual solutions for the public sector cover a wide spectrum of requirements and applications, using the latest technology to aid faster decision-making.",
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    details: "We provide command centers, digital signage, and secure communication systems that enable government agencies and financial institutions to operate efficiently with real-time information sharing."
  },
  {
    title: "Retail",
    description: "Whether it's wayfinding, digital signage or virtual support, our audiovisual solutions for the retail sector can enhance customer interactions and create engaging shopping experiences.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    details: "Our PADS4 Digital Signage solutions and interactive displays transform retail environments, guiding customers and creating immersive brand experiences that drive engagement."
  },
  {
    title: "Residential",
    description: "From home automation and home theatres to lighting control systems, our bespoke audiovisual solutions help transform homes into more personalised, connected spaces.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    details: "Experience smart home AV integration with custom entertainment setups, voice-controlled systems, and immersive home theater designs for ultimate comfort and convenience."
  }
];

const Services = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true
    });
    
    // Ensure Swiper styles are loaded
    const style = document.createElement('style');
    style.innerHTML = `
      .swiper {
        padding: 30px 0;
      }
      .swiper-pagination-bullet {
        background-color: #007BFF;
        opacity: 0.5;
        transition: all 0.3s ease;
      }
      .swiper-pagination-bullet-active {
        background-color: #007BFF;
        opacity: 1;
        transform: scale(1.2);
      }
      .swiper-button-next, .swiper-button-prev {
        color: #007BFF;
      }
      .swiper-slide {
        transition: transform 0.5s;
      }
      .swiper-slide-active {
        transform: scale(1.05);
        z-index: 1;
      }
      .service-card {
        transition: all 0.5s ease;
      }
      .bounce-arrow {
        animation: bounce 2s infinite;
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }
    `;
    document.head.appendChild(style);

    // Clean up
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section id="services" className="section-padding bg-resurgent-gray dark:bg-gray-900 transition-colors duration-300" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2 transition-colors duration-300">Audio-Visual Solutions</h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            From businesses to schools and retail outlets to hospitals, our audiovisual solutions can be customised to meet the specific requirements of different industries.
          </p>
          <div className="mt-4 bounce-arrow text-resurgent-blue dark:text-resurgent-lightBlue transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          speed={700}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="mySwiper"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {serviceItems.map((service, index) => (
            <SwiperSlide key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div 
                ref={(el) => (cardRefs.current[index] = el)}
                className="service-card bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-all duration-500 hover:shadow-xl"
                data-aos="zoom-in"
                data-aos-delay={index * 100 + 400}
              >
                <div className="relative h-48 w-full bg-resurgent-lightBlue/10 dark:bg-resurgent-lightBlue/5 rounded-lg mb-6 overflow-hidden transition-colors duration-300">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse transition-colors duration-300" style={{ zIndex: 0 }}></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110 z-10" 
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://images.unsplash.com/photo-1581091226033-c6e1f4b37fa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-4 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">{service.description}</p>
                <button 
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)} 
                  className="mt-4 text-resurgent-lightBlue hover:underline text-sm font-medium"
                >
                  {expandedCard === index ? 'Show Less' : 'Explore More'}
                </button>
                <AnimatePresence>
                  {expandedCard === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300"
                    >
                      {service.details}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="text-center mt-12" data-aos="fade-up" data-aos-delay="800">
          <a 
            href="#contact" 
            className="btn-primary hover:shadow-lg transition-all duration-300 hover:scale-105 transform bg-resurgent-blue dark:bg-resurgent-lightBlue text-white"
          >
            Request AV Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
