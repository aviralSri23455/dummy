import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "The Evolution of Hybrid Meeting Spaces in 2025",
    excerpt: "Discover how modern AV integration can revolutionize your hybrid workplace with seamless collaboration tools...",
    date: "2025-04-15",
    author: "John Smith",
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Microsoft Teams Rooms: Transforming Collaboration",
    excerpt: "Exploring best practices for implementing Microsoft Teams Rooms for an immersive meeting experience...",
    date: "2025-04-10",
    author: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    title: "Digital Signage Solutions for Modern Workplaces",
    excerpt: "Learn how PADS4 Digital Signage can enhance communication and engagement in your organization...",
    date: "2025-04-05",
    author: "Michael Chen",
    image: "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

const Blog = () => {
  return (
    <section id="blog" className="section-padding bg-gray-50" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue mb-2">
            Latest Insights
          </h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Stay updated with our latest thoughts on audio-visual technology and collaboration trends
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up" data-aos-delay="600">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-resurgent-blue mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                
                <a href="#" className="inline-flex items-center text-resurgent-lightBlue hover:text-resurgent-blue transition-colors">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
