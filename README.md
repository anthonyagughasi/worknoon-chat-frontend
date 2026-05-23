# Worknoon Chat Frontend Engine

A responsive, high-contrast real-time communication interface built with the Next.js App Router, Tailwind CSS, and Socket.io. This repository serves as the enterprise-ready user dashboard for the Worknoon platform, providing role-enforced layouts and seamless WebSocket data streaming.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js (App Router, React server/client components)
* **Styling & Layout:** Tailwind CSS (Dribbble-inspired modern aesthetic)
* **Real-Time Stream Engine:** Socket.io-client v4
* **API Client Layer:** Axios (Stateless HTTP request orchestration)

---

## 🚀 Core Feature Ecosystem

* **Persistent Socket State:** Managed globally via a singleton React Context provider that safely attaches user JWTs to incoming WebSocket handshakes.
* **Volatile Status Trackers:** Real-time event channels that capture and broadcast client-side typing states (`typing_start` / `typing_stop`) instantly across specific conversation rooms without disk overhead.
* **Optimistic Layout Updates:** Message submission flows that instantly render local user inputs to the stream window for zero perceptible lag before backend acknowledgement.
* **Presence & Network Fallbacks:** Built-in network availability triggers that flag connection state switches dynamically if a user loses internet connectivity.

---

## 📐 Project File Layout

├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.jsx
│   │   │   └── signup/page.jsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.jsx          # Role-enforced navigation wrapper
│   │   │   ├── admin/page.jsx       # Restricted Admin view
│   │   │   ├── chat/page.jsx        # Real-time Inbox & Chat View
│   │   │   └── profile/page.jsx     # User settings panel
│   │   ├── layout.jsx               # Global Theme & Socket Providers
│   │   └── page.jsx                 # Route routing gate
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatArea.jsx         # Message stream window & input bar
│   │   │   ├── Sidebar.jsx          # Chat room distribution panel
│   │   │   └── TypingIndicator.jsx  # Volatile indicator UI animation
│   │   └── ui/                      # Reusable visual components
│   ├── context/
│   │   └── SocketContext.jsx        # Global Socket.io provider connection
│   └── utils/
│       └── api.js                   # Authenticated Axios configuration
├── .env.local
├── package.json
└── tailwind.config.js

Design System (Dribbble-Inspired UI)
The dashboard implements an ultra-modern workspace interface with the following design choices:
Layout scaffolding: clean, detached floating elements and sidebar navigation layout panels wrapped with native dark mode token maps ( bg-{#0D0E12} and {#F8F9FC} ).
Visual components: Highly rounded corners ( rounded - 2xl ), subtle indigo glow accents ( shadow-indigo-600/10 ), and scannable active status indicators.
Setup and Runtime Verification
1 Clone the Repository: git clone [https://github.com/anthonyagughasi/worknoon-chat-frontend.git](https://github.com/anthonyagughasi/worknoon-chat-frontend.git)
   cd worknoon-chat-frontend
2 Assemble Project Dependencies: npm install
3 Configure Environment Variables:
Create a local environment parameters configuration file named .env.local inside the root directory:NEXT_PUBLIC_API_URL=http://localhost:5000 
NEXT_PUBLIC_API_URL=http://localhost:5000
4 Initialize Local Development Server:
npm run dev
Open your browser and navigate to http://localhost:3000 to interact with the application.
Challenges and Solutions
1 Persistent Stream Disconnections
- Problem: React component re-renders often tear down and duplicate websocket connections, flooding the backend socket server with duplicate handshake tokens.
- Solution: Isolated the socket configuration into a dedicated react context structure wrapper. The server connection is established excatly once on system boot and shared universally down the virtual DOM tree as a clean state reference.
2 Client UI Freezing Under Heavy Data Load
- Problem: High-frequency rendering loops triggered by incoming global message streams can stall input boxes and visual components.
- Solution: Decoupled input changes from layout drawsby offloading the volatile typing indicators into standard timeouts and leveraging implicit key lookups to render specific conversation lines instantly without reprocessing historical logs.
