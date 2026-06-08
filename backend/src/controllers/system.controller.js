const mongoose = require('mongoose');
const pkg = require('../../package.json'); // Adjusted to reach the root package.json from src/controllers

/**
 * Basic Health Check
 * Simply returns a success status to verify the API server is alive and responding.
 */
exports.getHealth = (req, res) => {
  res.status(200).json({ success: true, status: 'healthy' });
};

/**
 * System Status Check
 * Returns a basic overview of the system status.
 */
exports.getSystemStatus = (req, res) => {
  res.status(200).json({ success: true, status: 'healthy' });
};

/**
 * System Version Check
 * Reads the current version of the application from package.json.
 */
exports.getVersion = (req, res) => {
  res.status(200).json({ success: true, version: pkg.version });
};

/**
 * System Uptime Check
 * Returns the amount of time in seconds the server has been continuously running.
 */
exports.getUptime = (req, res) => {
  res.status(200).json({ success: true, uptime_seconds: process.uptime() });
};

/**
 * Database Status Check
 * Checks the connection state to the MongoDB database via Mongoose.
 * 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
 */
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
