# InstaChat

A full-stack real-time chat application built with React, Node.js, Express, and MongoDB. InstaChat enables users to register, set avatars, and exchange messages in real time with a modern, responsive UI.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Overview](#api-overview)
- [Folder Structure](#folder-structure)

---

## Features

- User registration and authentication
- Avatar upload and profile management
- Real-time messaging using Socket.IO
- Responsive, modern UI with React and styled-components
- Secure password hashing and input validation
- Modular, maintainable backend and frontend codebases

---

## Tech Stack

**Frontend:**

- React (with Create React App)
- React Router
- Styled-components
- Axios
- Socket.IO Client

**Backend:**

- Node.js
- Express
- MongoDB (via Mongoose)
- Socket.IO
- JWT (for authentication)
- Bcrypt (for password hashing)
- Validator (for input validation)
- dotenv (for environment variables)

---

## Project Structure

```
InstaChat/
  frontend/      # React client app
  server/        # Node.js/Express backend API
  README.md      # Project documentation
```

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ali-Tarek/InstaChat.git
   cd InstaChat
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   cd frontend
   npm install
   cd ../server
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the `server/` directory with the following:
     ```
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

### Running the App

**Start the backend server:**

```bash
cd server
npm start
```

**Start the frontend development server:**

```bash
cd frontend
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## API Overview

### User Routes

| Method | Endpoint         | Description               |
| ------ | ---------------- | ------------------------- |
| POST   | `/register`      | Register a new user       |
| POST   | `/login`         | User login                |
| POST   | `/setAvatar/:id` | Set user avatar           |
| GET    | `/users/:id`     | Get all users except self |

### Message Routes

| Method | Endpoint   | Description                    |
| ------ | ---------- | ------------------------------ |
| POST   | `/addmsg`  | Add a new message              |
| POST   | `/allmsgs` | Get all messages between users |

---

## Folder Structure

### Frontend (`frontend/`)

- `src/components/` - Reusable UI components (ChatContainer, ChatInput, Contacts, Logout, Welcome)
- `src/pages/` - Page-level components (Chat, Login, Register, SetAvatar)
- `src/styles/` - Styled-components definitions
- `src/utils/` - API route definitions
- `public/` - Static assets and HTML template

### Backend (`server/`)

- `controllers/` - Business logic for users and messages
- `models/` - Mongoose schemas for User and Message
- `routes/` - Express route definitions
- `server.js` - Entry point for the backend server

---