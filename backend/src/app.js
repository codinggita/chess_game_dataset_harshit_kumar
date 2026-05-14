const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Chess Match Analytics API is running!' });
});

module.exports = app;
