const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const {
  getUsers,
  getLogs,
  getSystemHealth,
  clearCache,
  banUser,
  unbanUser,
  protectedDashboard
} = require('../controllers/admin.controller');

router.get('/users', protect, getUsers);
router.get('/logs', protect, getLogs);
router.get('/system/health', protect, getSystemHealth);
router.delete('/cache/clear', protect, clearCache);
router.patch('/users/:id/ban', protect, banUser);
router.patch('/users/:id/unban', protect, unbanUser);
router.get('/protected/dashboard', protect, protectedDashboard);

module.exports = router;
