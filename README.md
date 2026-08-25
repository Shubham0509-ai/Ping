# 💬 Ping — Real-Time Chat Application

<p align="center">
  <img src="frontend/public/avatar.png" alt="Ping Logo" width="100" height="100" />
</p>

<p align="center">
  <b>A modern, full-stack, real-time messaging application built with the MERN stack, Socket.io, Tailwind CSS, and Arcjet security.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-green.svg" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-19-blue.svg" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-purple.svg" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Socket.io-4.8-black.svg" alt="Socket.io" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-emerald.svg" alt="MongoDB" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Security-Arcjet-orange.svg" alt="Arcjet" />
</p>

---

## 🌟 Overview

**Ping** is a fast, responsive, and secure real-time messaging platform. It delivers instant communication with live user presence tracking, rich media sharing (Cloudinary), optimistic UI updates, delightful audio feedback (keystroke & notification sound effects), and enterprise-grade security powered by Arcjet rate limiting and bot detection.

---

## ✨ Features

- ⚡ **Real-Time Messaging**: Instant 1-on-1 messaging powered by **Socket.io**.
- 🟢 **Live Online/Offline Presence**: Broadcasts active user connection status dynamically in real-time.
- 🖼️ **Media & Image Sharing**: Send images along with text messages, uploaded and optimized via **Multer** and **Cloudinary**.
- 🔐 **Robust Authentication**:
  - Secure signup and login with `bcrypt` password hashing.
  - JWT authentication using **Access Tokens** & **Refresh Tokens** stored in secure, `HttpOnly`, `SameSite` cookies.
  - Token-authenticated WebSocket connections.
- 🛡️ **Bot Detection & Rate Limiting**: Protected with **Arcjet** Shield, Bot Detection, and Sliding Window Rate Limiting.
- 📧 **Automated Welcome Emails**: Sends branded welcome emails to newly registered users via **Resend**.
- 🎨 **Modern Dark Emerald UI**:
  - Sleek glassmorphism UI with animated glowing borders, gradients, and **DaisyUI** components.
  - Fully responsive layout for desktop and mobile screens.
- 🔊 **Sound & Interactive Feedback**:
  - Realistic mechanical keyboard typing sound effects on typing.
  - Audio notifications for incoming messages (with a toggle to enable/disable sound).
- 🚀 **Optimistic UI Updates**: Messages render immediately on the sender's client while sending in the background.
- 📦 **Single-Command Production Deployment**: Express is preconfigured to serve the compiled Vite frontend in production mode.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router v8](https://reactrouter.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Real-Time Client**: [Socket.io Client](https://socket.io/docs/v4/client-api/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Web Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Real-Time Server**: [Socket.io](https://socket.io/)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcrypt`
- **Security & Bot Detection**: [@arcjet/node](https://arcjet.com/) + `@arcjet/inspect`
- **File Uploads & Storage**: [Multer](https://github.com/expressjs/multer) + [Cloudinary](https://cloudinary.com/)
- **Transactional Email**: [Resend](https://resend.com/)

---

## 📁 Repository Structure

```text
Ping/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js       # Signup, login, logout, profile update
│   │   │   └── message.controller.js    # Fetch contacts, chats, messages, send messages
│   │   ├── emails/
│   │   │   ├── emailHandlers.js         # Welcome email dispatch logic
│   │   │   └── emailTemplates.js        # HTML email template generator
│   │   ├── lib/
│   │   │   ├── arcjet.js                # Arcjet shield, bot detection & rate limiting
│   │   │   ├── db.js                    # MongoDB connection helper
│   │   │   ├── resend.js                # Resend client instance & sender config
│   │   │   └── socket.js                # Socket.io server instance & connection map
│   │   ├── middlewares/
│   │   │   ├── arcjet.middleware.js     # Arcjet request protection middleware
│   │   │   ├── auth.middleware.js       # JWT cookie & header verification middleware
│   │   │   ├── multer.middleware.js     # Disk storage configuration for uploads
│   │   │   └── socket.auth.middleware.js# Socket handshake JWT authentication
│   │   ├── models/
│   │   │   ├── message.model.js         # Message Mongoose schema
│   │   │   └── user.model.js            # User Mongoose schema with auth methods
│   │   ├── routes/
│   │   │   ├── auth.route.js            # /api/auth routes
│   │   │   └── message.route.js         # /api/messages routes
│   │   ├── utils/
│   │   │   ├── ApiError.js              # Standardized API error class
│   │   │   ├── ApiResponse.js           # Standardized API response class
│   │   │   └── asyncHandler.js          # Async wrapper for route controllers
│   │   ├── utils/cloudinary.js          # Cloudinary upload and local unlink helper
│   │   └── server.js                    # Main Express & Socket.io server entry point
│   ├── package.json
│   └── nodemon.json
├── frontend/
│   ├── public/
│   │   ├── sounds/                      # Keystroke and notification sound assets
│   │   ├── avatar.png
│   │   ├── login.png
│   │   └── signup.png
│   ├── src/
│   │   ├── components/                  # ChatContainer, MessageInput, Sidebar, Header, etc.
│   │   ├── hooks/
│   │   │   └── useKeyboardSound.js      # Custom hook for interactive typing audio
│   │   ├── lib/
│   │   │   └── axios.js                 # Configured Axios instance with credentials
│   │   ├── pages/
│   │   │   ├── AuthLayout.jsx           # Protected & guest route wrapper
│   │   │   ├── ChatPage.jsx             # Main interactive chat application view
│   │   │   ├── LoginPage.jsx            # Sign-in screen
│   │   │   └── SignupPage.jsx           # Registration screen
│   │   ├── store/
│   │   │   ├── useAuthStore.js          # Zustand store for authentication & sockets
│   │   │   └── useChatStore.js          # Zustand store for messages, contacts & UI state
│   │   ├── App.jsx                      # App root component with global decorators
│   │   ├── index.css                    # Tailwind CSS imports and custom utility classes
│   │   └── main.jsx                     # Vite client entry point & router setup
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── package.json                         # Monorepo scripts for install, build, and run
├── .gitignore
└── README.md