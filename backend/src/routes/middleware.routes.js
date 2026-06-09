const express = require('express');
const router = express.Router();
const { middlewareInfo } = require('../controllers/admin.controller');

router.get('/logger', middlewareInfo('Logger'));
router.get('/auth', middlewareInfo('Auth'));
router.get('/rate-limit', middlewareInfo('Rate Limit'));
router.get('/error-handler', middlewareInfo('Error Handler'));

module.exports = router;
