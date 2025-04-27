import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Clients from "@/components/Clients";
import Blog from "@/components/Blog";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import RoomConfigurator from "@/components/RoomConfigurator";
import FeatureShowcase from "@/components/FeatureShowcase";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Clients />
      <Blog />
      <Testimonials />
      <RoomConfigurator />
      <FeatureShowcase />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
