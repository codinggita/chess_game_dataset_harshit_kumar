const express = require('express');
const cors = require('cors');

// Route files
const matchRoutes = require('./routes/match.routes');
const searchRoutes = require('./routes/search.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const statsRoutes = require('./routes/stats.routes');
const authRoutes = require('./routes/auth.routes');

const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Chess Match Analytics API is running!' });
});

// Global Error Handler Middleware
// Must be registered after all routes to catch their errors
app.use(errorHandler);

module.exports = app;
