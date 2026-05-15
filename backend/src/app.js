const express = require('express');
const cors = require('cors');

// Route files
const matchRoutes = require('./routes/match.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/v1/matches', matchRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Chess Match Analytics API is running!' });
});

module.exports = app;
