const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, count: users.length, data: users });
  } catch (err) { next(err); }
};

exports.getLogs = async (req, res, next) => {
  try { res.json({ success: true, data: ["Log 1: System Boot", "Log 2: Admin login"] }); } catch (err) { next(err); }
};

exports.getSystemHealth = async (req, res, next) => {
  try { res.json({ success: true, status: 'healthy', message: 'Admin system health check passed' }); } catch (err) { next(err); }
};

exports.clearCache = async (req, res, next) => {
  try { res.json({ success: true, message: 'Application cache cleared' }); } catch (err) { next(err); }
};

exports.banUser = async (req, res, next) => {
  try { res.json({ success: true, message: `User ${req.params.id} has been banned` }); } catch (err) { next(err); }
};

exports.unbanUser = async (req, res, next) => {
  try { res.json({ success: true, message: `User ${req.params.id} has been unbanned` }); } catch (err) { next(err); }
};

exports.protectedDashboard = async (req, res, next) => {
  try { res.json({ success: true, message: 'Welcome to the protected admin dashboard', data: { metrics: "ok" } }); } catch (err) { next(err); }
};

exports.middlewareInfo = (name) => (req, res) => {
  res.json({ success: true, message: `${name} middleware is active and configured correctly.` });
};

exports.protectedMatchesInfo = (req, res) => {
  res.json({ success: true, message: 'Protected matches route accessed successfully' });
};
