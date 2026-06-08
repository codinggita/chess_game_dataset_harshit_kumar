const mongoose = require('mongoose');
const pkg = require('../../package.json'); // Adjusted to reach the root package.json from src/controllers

// Basic Health Check
exports.getHealth = (req, res) => {
  res.status(200).json({ success: true, status: 'healthy' });
};

// System Status Check
exports.getSystemStatus = (req, res) => {
  res.status(200).json({ success: true, status: 'healthy' });
};

// System Version Check
exports.getVersion = (req, res) => {
  res.status(200).json({ success: true, version: pkg.version });
};

// System Uptime Check
exports.getUptime = (req, res) => {
  res.status(200).json({ success: true, uptime_seconds: process.uptime() });
};

// Database Status Check
exports.getDatabaseStatus = (req, res) => {
  const state = mongoose.connection.readyState;
  let status = 'unknown';

  if (state === 0) status = 'disconnected';
  else if (state === 1) status = 'connected';
  else if (state === 2) status = 'connecting';
  else if (state === 3) status = 'disconnecting';

  res.status(200).json({
    success: true,
    database_status: status,
    ready_state: state
  });
};
