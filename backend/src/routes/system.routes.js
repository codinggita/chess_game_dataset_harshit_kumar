const express = require('express');
const router = express.Router();
const systemController = require('../controllers/system.controller');

// GET /api/v1/health (This route will be mapped appropriately in app.js)
// But since the requirements want GET /api/v1/health AND GET /api/v1/system/status,
// We can handle the `/health` route directly in app.js or map it here if mounted at `/api/v1`.
// We will mount this router at `/api/v1/system` and handle `/api/v1/health` separately in app.js,
// OR we can mount this router at `/api/v1` so it can handle both `/health` and `/system/...`.
// Let's assume this router is mounted at `/api/v1` for simplicity so we can define all system routes here.

router.get('/health', systemController.getHealth);
router.get('/system/status', systemController.getSystemStatus);
router.get('/system/version', systemController.getVersion);
router.get('/system/uptime', systemController.getUptime);
router.get('/system/database/status', systemController.getDatabaseStatus);

module.exports = router;
