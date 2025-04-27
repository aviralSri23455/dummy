import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real application, you would send the form data to your backend here
    alert("Thank you for your message. We'll get back to you soon!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="section-padding bg-resurgent-gray dark:bg-gray-900 transition-colors duration-300" data-aos="fade-up" data-aos-delay="200">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16" data-aos="fade-down" data-aos-delay="400">
          <h2 className="text-3xl md:text-4xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-2 transition-colors duration-300">
            Contact Us
          </h2>
          <div className="heading-line-center mb-6"></div>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto transition-colors duration-300">
            Have questions or ready to start your journey with us? Get in touch with our team today.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3" data-aos="fade-right" data-aos-delay="600">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full transition-colors duration-300">
              <h3 className="text-2xl font-bold text-resurgent-blue dark:text-resurgent-lightBlue mb-6 transition-colors duration-300">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-resurgent-lightBlue/10 dark:bg-resurgent-lightBlue/20 p-3 rounded-full mr-4 transition-colors duration-300">
                    <Mail className="text-resurgent-lightBlue w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-resurgent-blue dark:text-resurgent-lightBlue transition-colors duration-300">Email</h4>
                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">info@resurgent.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-resurgent-lightBlue/10 dark:bg-resurgent-lightBlue/20 p-3 rounded-full mr-4 transition-colors duration-300">
                    <Phone className="text-resurgent-lightBlue w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-resurgent-blue dark:text-resurgent-lightBlue transition-colors duration-300">Phone</h4>
                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">+1 (123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-resurgent-lightBlue/10 dark:bg-resurgent-lightBlue/20 p-3 rounded-full mr-4 transition-colors duration-300">
                    <MapPin className="text-resurgent-lightBlue w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-resurgent-blue dark:text-resurgent-lightBlue transition-colors duration-300">Address</h4>
                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      123 Business Ave, Suite 500<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3" data-aos="fade-left" data-aos-delay="800">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-colors duration-300">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-resurgent-lightBlue bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-resurgent-lightBlue bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-resurgent-lightBlue bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-300">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-resurgent-lightBlue bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    >
                      <option value="">Select a subject</option>
                      <option value="Business Consulting">Business Consulting</option>
                      <option value="Digital Transformation">Digital Transformation</option>
                      <option value="Financial Advisory">Financial Advisory</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2 transition-colors duration-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-resurgent-lightBlue bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button type="submit" className="btn-primary px-12 bg-resurgent-blue dark:bg-resurgent-lightBlue transition-colors duration-300">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
