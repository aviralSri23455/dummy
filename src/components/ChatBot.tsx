import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hey there! I'm Echo, your virtual assistant from Resurgent. We're transforming corporate collaboration with audio-visual tech. I can guide you through our project features and how to use them. Ask me anything!",
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate bot response
  const getBotResponse = (userMessage: string, messages: { text: string; sender: string }[]): string => {
    const msg = userMessage.toLowerCase().trim();
    const lastUserMessage = messages.filter(m => m.sender === 'user').slice(-1)[0]?.text.toLowerCase().trim();
    const isRepeatedQuery = lastUserMessage === msg;

    // --- Repetition Check ---
    if (isRepeatedQuery) {
      return "It looks like you asked that again. To give you the best help, could you perhaps rephrase or add more detail about what you're looking for regarding our AV solutions or project features?";
    }

    // --- Keyword Matching with Priority ---

    // Priority 1: Setup/Installation Guide
    const setupKeywords = ['setup guide', 'how to setup', 'how to install', 'guide me on setup', 'setup', 'installation']; // More specific first
    if (setupKeywords.some(keyword => msg.includes(keyword))) {
      return "I’m happy to guide you through setting up or exploring audio-visual solutions using our Resurgent Echo Project! Here’s a simple walkthrough based on the tools available on our website:\n" +
             "1. **Design Your Space (RoomConfigurator)**: Start by visiting the 'Room Configurator' tool. Here you can easily choose the room size and add equipment like screens or speakers to visualize the setup. It's designed to be straightforward!\n" +
             "2. **Get Inspired (Clients Showcase)**: Head over to the 'Clients' section. Find real examples (case studies) of how we've helped other businesses. It’s like looking through a portfolio!\n" +
             "3. **Explore Advanced Tools (FeatureShowcase)**: Check out the 'Feature Showcase' for more options like virtual measurement, color customization, and AR previews to see equipment in your actual room.\n" +
             "4. **Learn About Our Help (Services)**: The 'Services' section explains how our team assists with planning, installation, and support. Contact us directly for personalized help!\n" +
             "This project is all about making advanced AV technology accessible. Just mention the part you're curious about (like 'RoomConfigurator' or 'Services'), and I'll give you the details right away!";
    }

    // Priority 2: Features Overview
    const featureKeywords = ['project features', 'what features', 'tell me about features', 'features']; // More specific first
    if (featureKeywords.some(keyword => msg.includes(keyword))) {
      return "Our Resurgent Echo Project website makes planning AV solutions easy! Here’s a look at the main features and how they help you:\n" +
             "- **RoomConfigurator**: Use this tool to visually design your meeting space. Just enter the room size and drag-and-drop equipment like screens or speakers to see how it fits.\n" +
             "- **Clients**: Visit this section to see real examples (case studies) of projects we've done for other businesses. It helps you get ideas and see our work.\n" +
             "- **Services**: Check here to learn how we assist with planning your AV setup, installing the equipment, and providing ongoing support.\n" +
             "- **FeatureShowcase**: Explore this area for advanced tools like virtually measuring your space, previewing equipment in AR (Augmented Reality), or customizing color themes.\n" +
             "- **Interactive Elements**: Notice the smooth animations as you scroll (using AOS library) and the easy-to-use navigation menu at the top. These help you browse the site comfortably.\n" +
             "You can explore these sections on our website to understand your options better. Let me know if you'd like more detail on any specific part!";
    }

    // Priority 3: Specific Components
    const componentResponses = {
      'how to use room configurator|room setup': 
        "Great choice! Using the Room Configurator is easy. It helps you plan your room visually. Here’s how:\n" +
        "1. **Go to the Tool**: Find the 'Room Configurator' on our website.\n" +
        "2. **Enter Room Size**: Tell the tool how big your room is (length and width).\n" +
        "3. **Pick Your Gear**: Choose things like screens, speakers, or cameras from the list.\n" +
        "4. **Place Items**: Drag the gear onto the room map where you want it.\n" +
        "5. **See Your Design**: The tool instantly shows you how it will look!\n" +
        "It's made to be simple, no tech skills needed. Want to try it out? Let me know what kind of room you're designing!",
      'room configurator|configurator': // Broader terms catch-all
        "You got it! The Room Configurator lets you easily design your meeting space online. Just follow these simple steps:\n" +
        "1. **Find the tool** on our website.\n" +
        "2. **Enter your room's** length and width.\n" +
        "3. **Select AV equipment** like screens or speakers.\n" +
        "4. **Drag items** onto the room layout.\n" +
        "5. **Instantly see** a preview of your design! It's simple to use. Do you have questions about specific equipment options?",
      'how to use client showcase|case studies': 
        "Excellent! The Client Showcase ('Clients' section) is like our portfolio. Here's how to explore it:\n" +
        "1. Visit the 'Clients' section.\n" +
        "2. Browse through different project examples or company logos.\n" +
        "3. Click on one to read about the AV tech we installed and the results.\n" +
        "It helps you see practical applications. Are you interested in solutions for a specific industry?",
      'client showcase|clients': 
        "Perfect! In the 'Clients' section, you can see real examples of our AV projects and installations. Click on any project to learn more about the solutions we provided. It's a great way to get ideas!",
      'how to use services|services overview|service details': 
        "Good question! Our 'Services' section explains how Resurgent helps businesses. Here's the breakdown:\n" +
        "- **Consultation & Planning**: We help you choose the best AV setup.\n" +
        "- **Installation**: Our team installs all the equipment professionally.\n" +
        "- **Support**: We offer ongoing help to keep things running smoothly.\n" +
        "Which service area – planning, setup, or support – would you like more details on?",
      'tell me about feature showcase|what is feature showcase': 
        "Sure thing! The Feature Showcase highlights our advanced interactive tools. Take a look:\n" +
        "- **Product Showcase**: Details on specific AV gear.\n" +
        "- **Virtual Measurement**: Helps plan room layouts accurately.\n" +
        "- **Color Theme Customizer**: Matches visuals to your brand.\n" +
        "- **AV Integrator Tool**: Visualizes equipment placement.\n" +
        "- **AR Visualization**: Uses augmented reality to preview gear in *your* space.\n" +
        "- **Collaborative Features**: Tools for team interaction.\n" +
        "Explore these via the tabs in the Feature Showcase. Which tool sounds most interesting?",
      'feature showcase': // Broader term last
        "Right! The Feature Showcase is where you find our specialized tools like Virtual Measurement, AR Visualization, Color Customization, and more. It helps you explore advanced planning options for your AV setup.",
      'past projects|previous projects|your projects|projects': 
        "Definitely! We've completed diverse projects like Hybrid Meeting Rooms, Large Conference AV setups, and Interactive Workspaces. Check out the 'Clients' section for detailed case studies and examples!",
      'ui elements|animations|navbar|interactive elements': 
        "Ah, the details! Our website uses smooth scroll animations (from the AOS library) and a clear navigation bar to make browsing easy and visually engaging. We aimed for an intuitive user experience."
    };
    for (const [key, value] of Object.entries(componentResponses)) {
      const patterns = key.split('|');
      if (patterns.some(pattern => msg.includes(pattern.trim()))) {
        return value; // Return the specific component response
      }
    }

    // Priority 4: General Queries
    const generalResponses = {
      'hi|hello|hey': "Hi there! I'm Echo from Resurgent... How can I help you explore our project today?",
      'what is resurgent|what do you do|about resurgent': "Resurgent specializes in making advanced audio-visual technology simple... Showcasing tools like Room Configurator... What aspect are you curious about?",
      'contact|reach out|get in touch': "You can easily contact Resurgent via our website https://resurgent.co.in/ or let me know what you need...",
      'bye|goodbye|see you': "Thanks for stopping by! Feel free to reach out again... Have a great day!"
    };
    for (const [key, value] of Object.entries(generalResponses)) {
      const patterns = key.split('|');
      if (patterns.some(pattern => msg.includes(pattern.trim()))) {
        return value; // Return the general response
      }
    }

    // --- Fallback Response --- 
    // Only use this if no keywords were matched in the checks above
    return "Thanks for asking! At Resurgent, we help businesses create amazing meeting spaces... I can guide you through tools like the Room Configurator or show client stories. What specifically are you interested in learning about today? Telling me more helps me give you the right info!";
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const userInput = input.trim();
      // Add user message
      const userMessage: Message = { 
        id: `user-${Date.now()}`, 
        text: userInput, 
        sender: 'user', 
        timestamp: new Date().toISOString() 
      };
      
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      // Create a safe reference to the current messages including the new user message
      const currentMessages = [...messages, userMessage];
      
      // Simulate bot response after a short delay
      const timer = setTimeout(() => {
        try {
          const botResponse = getBotResponse(userInput, currentMessages);
          const botMessage: Message = { 
            id: `bot-${Date.now()}`, 
            text: botResponse, 
            sender: 'bot', 
            timestamp: new Date().toISOString() 
          };
          
          setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
          console.error("Error generating bot response:", error);
          // Add fallback message if there's an error
          setMessages(prevMessages => [
            ...prevMessages, 
            { 
              id: `error-${Date.now()}`, 
              text: "Sorry, I encountered an error. Please try again.", 
              sender: 'bot' as const, 
              timestamp: new Date().toISOString() 
            }
          ]);
        }
      }, 800);

      // Cleanup function to prevent memory leaks
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-resurgent-darkBlue hover:bg-resurgent-lightBlue text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-105"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <div className="bg-black bg-opacity-80 backdrop-blur-lg rounded-lg shadow-2xl w-80 h-[70vh] flex flex-col border border-resurgent-lightBlue/30 animate-fade-in">
          {/* Header */}
          <div className="p-3 border-b border-resurgent-lightBlue/30 flex justify-between items-center bg-resurgent-darkBlue/50">
            <h3 className="text-white font-semibold text-lg">Echo Assistant</h3>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-resurgent-lightBlue hover:text-white p-1 h-auto"
            >
              ✕
            </Button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-resurgent-lightBlue/50 scrollbar-track-transparent"
          >
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                Start a conversation...
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-gray-700 text-white' : 'bg-resurgent-lightBlue bg-opacity-30 text-white'}`}
                  >
                    {msg.text}
                  </span>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-resurgent-lightBlue/30 bg-black/70">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-1 focus:ring-resurgent-lightBlue placeholder-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className={`p-2 rounded-md transition-colors ${input.trim() ? 'bg-resurgent-lightBlue hover:bg-resurgent-lightBlue/80 text-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
