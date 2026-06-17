<div align="center">
  <h1>♟️ Grandmaster Analytics</h1>

  <p><strong>A Full-Stack Platform for Deep Chess Match Analysis</strong></p>

  [![Frontend](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://chess-game-dataset-harshit-kumar.vercel.app)
  [![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://chess-game-dataset-harshit-kumar.onrender.com)
  [![Postman](https://img.shields.io/badge/Postman-Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](#)

  <br />

  ### 🔗 Live Links
  🌐 **Frontend Live Demo:** [chess-game-dataset-harshit-kumar.vercel.app](https://chess-game-dataset-harshit-kumar.vercel.app)  
  ⚙️ **Backend API URL:** [chess-game-dataset-harshit-kumar.onrender.com](https://chess-game-dataset-harshit-kumar.onrender.com)  
  📚 **Postman Documentation:** *[Insert Postman Documentation Link Here]*

</div>

---

## 🌟 Introduction

**Grandmaster Analytics** is a modern, beautifully designed full-stack web application built to analyze massive datasets of professional chess matches. 

Whether you want to discover the highest win-rate openings, analyze player trends, or filter millions of matches by Elo, time control, or victory status, Grandmaster Analytics provides the tools to do it. It features a lightning-fast Node.js/Express REST API on the backend and a stunning, glassmorphism-inspired React Dashboard on the frontend.

---

## 🛠️ Tech Stack & Technologies

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## 🌊 Project Flow & Architecture

The project is built on a **MERN-stack** architecture (MongoDB, Express, React, Node.js), cleanly separated into two environments:

1. **The Client (React + Vite):** 
   - A highly responsive dashboard where users can log in, view live charts, browse paginated chess matches, and configure settings. 
   - Uses **Redux Toolkit** for robust global state management (Authentication & UI Theming).
   - Secures private routes to ensure only logged-in users can view sensitive data.

2. **The Server (Node + Express):**
   - Receives API requests and verifies user identity using **JWT (JSON Web Tokens)**.
   - Queries a highly-optimized **MongoDB** database to perform complex aggregations (e.g., finding the most successful openings, or filtering matches by Elo ratings).
   - Returns paginated JSON data back to the frontend to ensure fast loading times.

---

## ✨ Key Features

- **🔐 Secure Authentication:** Complete JWT-based registration, login, and protected routing.
- **📊 Interactive Dashboard:** High-level metrics showing total games, active players, and unique openings.
- **🔍 Deep Filtering:** Find games based on time controls (Bullet, Blitz, Rapid, Classical), Victory Status (Checkmate, Resignation, Time Out), and Elo thresholds.
- **🌓 Dual Theming:** Beautiful Light and Dark modes with a sleek glassmorphism aesthetic.
- **📱 Fully Responsive:** Works perfectly on desktop, tablet, and mobile devices with a sliding hamburger menu.

---

## 🚀 Local Installation

Want to run Grandmaster Analytics on your own machine? Follow these easy steps:

### 1. Clone the Repository
```bash
git clone https://github.com/harshit-kumar-dev/chess_game_dataset_harshit_kumar.git
cd chess_game_dataset_harshit_kumar
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file inside the `backend` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
Run the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file inside the `frontend` folder:
```env
VITE_API_URL=http://localhost:5000/api/v1
```
Run the frontend server:
```bash
npm run dev
```

### 4. Play!
Open your browser and navigate to `http://localhost:5173` to view the app!

---
<div align="center">
  <p>Built with ❤️ by Harshit Kumar</p>
</div>