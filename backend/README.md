# Chess Match Analytics API

A beginner-friendly RESTful API built with Express, MongoDB, and Mongoose for tracking, searching, and analyzing chess matches.

## Project Overview

This backend API provides a comprehensive set of endpoints to manage chess match data. It's organized using the standard MVC (Model-View-Controller) pattern, ensuring clean separation of concerns.

### API Modules

The project is divided into several modules, each accessible via `/api/v1/...`:
- **Auth** (`/auth`): Handles user registration and login using JWT.
- **Matches** (`/matches`): Handles core CRUD operations for chess matches, along with specialized sorting and filtering routes.
- **Search** (`/search`): Allows searching through matches, players, and chess openings.
- **Analytics** (`/analytics`): Provides aggregations like victory distributions, color advantages, and opening success rates.
- **Stats** (`/stats`): Returns quick statistical summaries, such as total match counts, win rates, and average player ratings.
- **System** (`/system` & `/health`): Exposes basic system health checks, uptimes, and database connectivity status.

## Environment Variables

Create a `.env` file in the root of the `backend` directory (you can copy `.env.example`) and configure the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Installation & Setup

1. **Install Dependencies**
   Run the following command in the `backend` directory:
   ```bash
   npm install
   ```

2. **Seed the Database (Optional)**
   If you have a seed script and want initial data, run:
   ```bash
   npm run seed
   ```

3. **Run the Server**
   Start the Express server:
   ```bash
   node src/index.js
   ```

## Using Postman for Testing

A complete Postman collection is included to help you test all the API endpoints effortlessly.

1. Open Postman.
2. Click **Import** in the top left corner.
3. Select the `postman_collection.json` file located in the `backend` directory.
4. You will see a new collection named "Chess Match Analytics API" containing grouped folders for Auth, Matches, Search, Analytics, Stats, and System endpoints.
5. For protected endpoints (like creating a match), first use the Auth -> Login endpoint to get your token, and configure it in the Authorization tab of the subsequent requests as a "Bearer Token".
