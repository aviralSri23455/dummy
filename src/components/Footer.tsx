import React from "react";

const Footer = () => {
  return (
    <footer className="bg-resurgent-blue text-white" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div data-aos="fade-right" data-aos-delay="400">
            <h3 className="text-2xl font-bold mb-6">Resurgent</h3>
            <p className="text-gray-300 mb-6">
              Empowering businesses with innovative solutions that drive growth, optimize operations, and enhance market positioning.
            </p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="600">
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="800">
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Business Consulting
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Digital Transformation
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Financial Advisory
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Marketing Strategy
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-white transition-colors">
                  Operational Excellence
                </a>
              </li>
            </ul>
          </div>
          
          <div data-aos="fade-left" data-aos-delay="1000">
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Business Ave, Suite 500, New York, NY 10001</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📧</span>
                <a href="mailto:info@resurgent.com" className="hover:underline">info@resurgent.com</a>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☎️</span>
                <a href="tel:+11234567890" className="hover:underline">+1 (123) 456-7890</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700" data-aos="fade-up" data-aos-delay="1200">
        <div className="container mx-auto container-padding py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Resurgent Business Solutions. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
