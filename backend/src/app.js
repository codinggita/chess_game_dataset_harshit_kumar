const express = require('express');
const cors = require('cors');

// Route files
const matchRoutes = require('./routes/match.routes');
const searchRoutes = require('./routes/search.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const statsRoutes = require('./routes/stats.routes');
const authRoutes = require('./routes/auth.routes');
const systemRoutes = require('./routes/system.routes');\nconst adminRoutes = require('./routes/admin.routes');\nconst middlewareRoutes = require('./routes/middleware.routes');\nconst protectedRoutes = require('./routes/protected.routes');

const errorHandler = require('./middlewares/error.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');

const app = express();

app.use(cors());
app.use(express.json());

// Apply our custom logger middleware to log all incoming requests
app.use(loggerMiddleware);

// Mount routers
app.use('/api/v1/matches', matchRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/stats', statsRoutes);
app.use('/api/v1/auth', authRoutes);\napp.use('/api/v1/admin', adminRoutes);\napp.use('/api/v1/middleware', middlewareRoutes);\napp.use('/api/v1/protected', protectedRoutes);
app.use('/api/v1', systemRoutes);\n\n// Handle OPTIONS and HEAD\napp.options('/api/v1/*', (req, res) => res.sendStatus(204));\napp.head('/api/v1/*', (req, res) => res.sendStatus(200)); // Mounts /health, /system/status, etc.

app.get('/', (req, res) => {
  res.json({ message: 'Chess Match Analytics API is running!' });
});

// Global Error Handler Middleware
// Must be registered after all routes to catch their errors
app.use(errorHandler);

module.exports = app;
