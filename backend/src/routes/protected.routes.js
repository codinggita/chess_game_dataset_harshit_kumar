const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const { protectedMatchesInfo } = require('../controllers/admin.controller');

router.get('/matches', protect, protectedMatchesInfo);
router.post('/matches', protect, protectedMatchesInfo);
router.patch('/matches/:id', protect, protectedMatchesInfo);
router.delete('/matches/:id', protect, protectedMatchesInfo);

module.exports = router;
