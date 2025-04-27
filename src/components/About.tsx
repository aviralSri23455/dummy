import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="section-padding bg-white" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        {/* About Header */}
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue mb-2">
            About Resurgent
          </h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Building Tomorrow's Business Solutions Today
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative" data-aos="fade-right" data-aos-delay="600"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
              alt="Our Team"
              className="rounded-lg shadow-xl w-full object-cover h-[400px]"
            />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-aos="fade-left" data-aos-delay="800"
          >
            <h3 className="text-2xl font-bold text-resurgent-blue mb-4">
              Empowering Businesses Since 2010
            </h3>
            <p className="text-gray-700 mb-6">
              Resurgent is a leading provider of innovative business solutions, helping organizations transform their operations and achieve sustainable growth. With our expertise in digital transformation, financial advisory, and operational excellence, we deliver tailored strategies that drive measurable results.
            </p>
            <p className="text-gray-700 mb-8">
              Our team of experienced professionals brings deep industry knowledge and a proven track record of success across diverse sectors. We partner with our clients to understand their unique challenges and opportunities, developing customized solutions that create lasting value.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-6 bg-gray-50 rounded-lg" data-aos="fade-up" data-aos-delay="1000"
              >
                <div className="text-4xl font-bold text-resurgent-lightBlue mb-2">13+</div>
                <div className="text-gray-600">Years Experience</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-6 bg-gray-50 rounded-lg" data-aos="fade-up" data-aos-delay="1200"
              >
                <div className="text-4xl font-bold text-resurgent-lightBlue mb-2">500+</div>
                <div className="text-gray-600">Clients Worldwide</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
