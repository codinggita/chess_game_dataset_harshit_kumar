# ♟️ Chess Match Analytics API

<div align="center">
  <p>A backend-heavy full-stack project for analyzing chess match datasets, featuring comprehensive REST APIs for match statistics, player analytics, and more.</p>
</div>

## 📖 1. Project Overview

The **Chess Match Analytics API** is a robust backend system designed to ingest, manage, and analyze large datasets of chess matches. It provides a comprehensive suite of RESTful APIs to retrieve match details, compute player statistics, analyze opening moves, and perform complex aggregations. The system is secured using JWT authentication, ensuring that only authorized users can perform sensitive operations.

## ✨ 2. Features

- **Authentication System:** Secure user registration and login using JWT.
- **Match CRUD Operations:** Create, Read, Update, and Delete chess match records.
- **Player Statistics:** Advanced endpoints to fetch player win rates, performance metrics, and history.
- **Opening Analytics:** Aggregation endpoints to analyze the most successful and frequently played chess openings.
- **Search, Filter, Sort & Paginate:** Highly queryable API to filter matches by date, player, elo, result, etc., with built-in pagination.
- **Aggregation Analytics:** Deep data insights using MongoDB aggregation pipelines.

## 🛠️ 3. Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Security:** JWT Authentication

## 📁 4. Folder Structure

```text
chess_game_dataset_harshit_kumar/
├── src/
│   ├── config/         # Database and environment configurations
│   ├── controllers/    # API request handlers and business logic
│   ├── middlewares/    # Custom middlewares (e.g., JWT Auth, Error handling)
│   ├── models/         # Mongoose schemas and models (User, Match)
│   ├── routes/         # Express API route definitions
│   └── utils/          # Utility functions and helpers
├── .env                # Environment variables file
├── .gitignore          # Files and folders to ignore in Git
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## 🔌 5. API Modules

The API is divided into several modular route groups:

- **Auth API (`/api/auth`)**: `POST /register`, `POST /login`
- **Matches API (`/api/matches`)**: Standard CRUD operations for match data. Includes support for pagination, sorting, and advanced filtering.
- **Players API (`/api/players`)**: Endpoints focused on player-specific statistics and match histories.
- **Analytics API (`/api/analytics`)**: Complex endpoints for data aggregations, such as opening success rates and overall platform metrics.

## 🚀 6. Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harshit-kumar-dev/chess_game_dataset_harshit_kumar.git
   cd chess_game_dataset_harshit_kumar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the root directory.
   - Fill in the required environment variables (see below).

## 🔑 7. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chess_analytics
JWT_SECRET=hk_chess_secret_key
```

## 🏃‍♂️ 8. Run Commands

- **Start the server in development mode (e.g. with nodemon):**
  ```bash
  npm run dev
  ```

- **Start the server in production mode:**
  ```bash
  npm start
  ```

## 🔮 9. Future Frontend Dashboard Integration

While currently a backend-focused application, this API is designed to seamlessly integrate with a future frontend dashboard (e.g., React, Vue.js, or Next.js). 

**Planned Dashboard Features:**
- Visual charts for player win/loss ratios.
- Interactive data tables for exploring match datasets.
- Heatmaps and graphs for popular opening moves.
- User-friendly authentication flows and profile management.