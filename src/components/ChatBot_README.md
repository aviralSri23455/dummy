# Echo Assistant (ChatBot) - Functionality Overview

This document outlines the intended conversational flow and specific responses programmed into the `Echo Assistant` ChatBot component (`ChatBot.tsx`).

## Key Features & Responses

The chatbot listens for specific keywords in user messages and responds based on a priority system.

### Priority 1: Setup & Installation Guide

- **User Asks:** "setup", "installation", "how to setup", "guide me on setup"
- **Chatbot Responds:** Provides a 4-step guide on using the website's tools for planning AV solutions:
    1.  **Design Your Space (RoomConfigurator):** Use the tool to choose room size and add equipment visually.
    2.  **Get Inspired (Clients Showcase):** Browse the 'Clients' section for real project examples.
    3.  **Explore Advanced Tools (FeatureShowcase):** Check 'Feature Showcase' for virtual measurement, AR previews, etc.
    4.  **Learn About Our Help (Services):** See the 'Services' section for details on planning, installation, and support.
    *   *Follow-up:* Asks the user which part they're interested in and promises details right away.

### Priority 2: Features Overview

- **User Asks:** "features", "project features", "what features do you have"
- **Chatbot Responds:** Gives a breakdown of key website features and explains their purpose:
    - **RoomConfigurator**: Visually design meeting spaces (enter size, drag gear).
    - **Clients**: See real project examples/case studies.
    - **Services**: Learn about planning, installation, and support help.
    - **FeatureShowcase**: Explore advanced tools (virtual measurement, AR, color themes).
    - **Interactive Elements**: Mentions smooth animations (AOS) and navigation.
    *   *Follow-up:* Invites the user to ask for more details on any specific part.

### Priority 3: Specific Component Details

*   **User Asks about Room Configurator:** "room configurator", "configurator", "how to use room configurator", "room setup"
    *   **Chatbot Responds:** Explains it's a visual planner and gives simple steps (Go to tool -> Enter size -> Pick gear -> Place items -> See design).
*   **User Asks about Client Showcase:** "client showcase", "clients", "how to use client showcase", "case studies"
    *   **Chatbot Responds:** Explains it's a portfolio and gives steps (Visit section -> Browse -> Click for story).
*   **User Asks about Services:** "services", "how to use services", "service details"
    *   **Chatbot Responds:** Breaks down the services (Consultation & Planning, Installation, Support) and asks which area the user wants more details on.
*   **User Asks about Feature Showcase:** "feature showcase", "tell me about feature showcase", "what is feature showcase"
    *   **Chatbot Responds:** Lists the advanced tools within it (Product Showcase, Virtual Measurement, Color Customizer, AV Integrator, AR Visualization, Collaborative Features) and asks which tool is most interesting.
*   **User Asks about Projects:** "projects", "past projects"
    *   **Chatbot Responds:** Mentions types of projects done (Hybrid Rooms, Conference AV) and directs the user to the 'Clients' section for case studies.
*   **User Asks about UI/Interactions:** "ui elements", "animations", "navbar", "interactive elements"
    *   **Chatbot Responds:** Explains the use of AOS animations and the navigation bar for an intuitive experience.

### Priority 4: General Queries

*   **User Greets:** "hi", "hello", "hey"
    *   **Chatbot Responds:** Friendly greeting, introduces itself, and asks how it can help (mentioning key areas like room design, examples, setup).
*   **User Asks About Resurgent:** "what is resurgent", "what do you do"
    *   **Chatbot Responds:** Explains Resurgent simplifies AV tech for businesses, highlights website tools (Room Configurator, Client Showcase).
*   **User Asks to Contact:** "contact", "reach out", "get in touch"
    *   **Chatbot Responds:** Provides the website link (https://resurgent.co.in/) and offers to direct the query.
*   **User Says Goodbye:** "bye", "goodbye"
    *   **Chatbot Responds:** Polite closing message.

### Fallback Response

- **If no keywords match:** The chatbot gives a general response encouraging the user to be more specific, mentioning key tools like Room Configurator or Client Showcase as examples of what to ask about.

### Repetition Handling

- **If the user sends the exact same message twice in a row:** The chatbot provides a specific response asking the user to rephrase or add more detail to get better help.

This README provides a reference for the chatbot's current conversational capabilities.
