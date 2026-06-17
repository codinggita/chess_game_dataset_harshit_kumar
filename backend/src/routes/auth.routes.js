const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile); // This route is protected!
router.put('/profile', protect, updateProfile);

module.exports = router;
