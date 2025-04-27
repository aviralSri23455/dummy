import React, { useState } from 'react';

const CollaborativeFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rooms' | 'tools' | 'integration'>('rooms');
  const [selectedRoom, setSelectedRoom] = useState<string>('conference');

  // Sample collaborative room types
  const roomTypes = [
    {
      id: 'conference',
      name: 'Conference Room',
      description: 'Professional meeting space equipped with advanced audio-visual technology for presentations and video conferencing.',
      capacity: '10-20 people',
      equipment: ['Interactive Display', 'Video Conferencing System', 'Spatial Audio', 'Wireless Presentation']
    },
    {
      id: 'huddle',
      name: 'Huddle Space',
      description: 'Small collaborative area designed for impromptu meetings and brainstorming sessions with integrated technology.',
      capacity: '2-6 people',
      equipment: ['Compact Display', 'Video Bar', 'Digital Whiteboard', 'Wireless Charging']
    },
    {
      id: 'training',
      name: 'Training Room',
      description: 'Versatile space for workshops and training sessions with interactive learning technology.',
      capacity: '15-30 people',
      equipment: ['Dual Projectors', 'Audience Response System', 'Recording Capability', 'Modular AV Controls']
    },
    {
      id: 'boardroom',
      name: 'Executive Boardroom',
      description: 'Premium meeting environment with sophisticated audio-visual solutions for high-level discussions.',
      capacity: '8-16 people',
      equipment: ['Premium Video Wall', 'Integrated Control System', 'Voice Recognition', 'Secure Conferencing']
    }
  ];

  // Sample collaboration tools
  const collaborationTools = [
    {
      name: 'Real-time Document Collaboration',
      description: 'Edit and review documents simultaneously with team members, with changes visible to all participants instantly.',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    },
    {
      name: 'Interactive Whiteboarding',
      description: 'Digital canvas for sketching ideas, creating diagrams, and visual collaboration that can be saved and shared.',
      icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
    },
    {
      name: 'Multi-feed Video Conferencing',
      description: 'Connect with remote team members through high-definition video with intelligent camera tracking and framing.',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    },
    {
      name: 'Wireless Content Sharing',
      description: 'Share screens and content from any device without cables or adapters, supporting multiple simultaneous sources.',
      icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
    },
    {
      name: 'Room Scheduling System',
      description: 'Digital displays outside meeting rooms showing availability and allowing on-the-spot booking of available spaces.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      name: 'Integrated Control System',
      description: 'Centralized touch panel to control all room technology including displays, audio, lighting, and environmental settings.',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
    }
  ];

  // Sample integration options
  const integrationOptions = [
    {
      name: 'Microsoft Teams Integration',
      description: 'Seamlessly connect room systems with Microsoft Teams for unified communication and collaboration.',
      compatible: ['Conference Room', 'Huddle Space', 'Training Room', 'Executive Boardroom']
    },
    {
      name: 'Zoom Rooms',
      description: 'Certified hardware solutions that work natively with Zoom to provide one-touch meeting experiences.',
      compatible: ['Conference Room', 'Huddle Space', 'Executive Boardroom']
    },
    {
      name: 'Google Meet Hardware',
      description: 'Purpose-built video conferencing hardware that integrates with Google Workspace.',
      compatible: ['Conference Room', 'Huddle Space', 'Training Room']
    },
    {
      name: 'Cisco Webex Devices',
      description: 'Intelligent collaboration devices designed for Webex with advanced AI features.',
      compatible: ['Conference Room', 'Executive Boardroom', 'Training Room']
    }
  ];

  const selectedRoomData = roomTypes.find(room => room.id === selectedRoom) || roomTypes[0];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rooms':
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {roomTypes.map((room) => (
                <div 
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedRoom === room.id 
                    ? 'bg-resurgent-blue dark:bg-resurgent-lightBlue text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  <h3 className="text-lg font-bold mb-1">{room.name}</h3>
                  <p className="text-sm mb-2 opacity-90">{room.capacity}</p>
                  <p className={`text-sm ${selectedRoom === room.id ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}`}>
                    {room.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">{selectedRoomData.name} Equipment</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedRoomData.equipment.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-resurgent-blue dark:text-resurgent-lightBlue mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'tools':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {collaborationTools.map((tool, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex">
                <div className="flex-shrink-0 h-12 w-12 bg-resurgent-blue dark:bg-resurgent-lightBlue rounded-full flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tool.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{tool.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'integration':
        return (
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Resurgent's audio-visual solutions integrate seamlessly with popular collaboration platforms, ensuring a consistent and reliable experience across all your meeting spaces.
            </p>
            <div className="space-y-4">
              {integrationOptions.map((option, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-1">{option.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{option.description}</p>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Compatible With:</h4>
                    <div className="flex flex-wrap gap-2">
                      {option.compatible.map((room, idx) => (
                        <span key={idx} className="px-2 py-1 bg-resurgent-blue/10 dark:bg-resurgent-lightBlue/20 text-resurgent-blue dark:text-resurgent-lightBlue rounded text-xs">
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Collaborative Environments</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Resurgent creates productive collaborative experiences for Corporates with our Audio-Visual technology to enable interactive environments. By integrating innovative and versatile video collaboration solutions into the business, we transform the way Professionals share information and help them stay one step ahead, always.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'rooms' 
              ? 'bg-white dark:bg-gray-900 border-b-2 border-resurgent-blue dark:border-resurgent-lightBlue' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            Collaborative Spaces
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'tools' 
              ? 'bg-white dark:bg-gray-900 border-b-2 border-resurgent-blue dark:border-resurgent-lightBlue' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            Collaboration Tools
          </button>
          <button
            onClick={() => setActiveTab('integration')}
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${activeTab === 'integration' 
              ? 'bg-white dark:bg-gray-900 border-b-2 border-resurgent-blue dark:border-resurgent-lightBlue' 
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            Platform Integration
          </button>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900">
          {renderTabContent()}
        </div>
      </div>

      <div className="mt-8 bg-resurgent-blue/10 dark:bg-resurgent-lightBlue/10 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-resurgent-blue dark:text-resurgent-lightBlue">Request a Consultation</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Our team of AV specialists can help design the perfect collaborative environment for your organization's specific needs.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 bg-resurgent-blue dark:bg-resurgent-lightBlue text-white rounded-md hover:opacity-90 transition-opacity">
            Schedule Demo
          </button>
          <button className="px-6 py-2 border border-resurgent-blue dark:border-resurgent-lightBlue text-resurgent-blue dark:text-resurgent-lightBlue rounded-md hover:bg-resurgent-blue/5 dark:hover:bg-resurgent-lightBlue/5 transition-colors">
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeFeatures;