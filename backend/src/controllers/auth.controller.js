const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Helper function to easily generate JWTs
const generateToken = (id) => {
  // Signs the payload { id } with the secret in .env
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    
    // Basic Validation Check
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username, email and password' });
    }
    
    // Check if the user already exists in the DB
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    
    // Hash the raw password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create the new user with the hashed password
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    // Return success along with the newly generated token
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

// Login existing user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Basic Validation Check
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Find the user by their email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Compare the raw password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Return success along with a new token
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      token: generateToken(user._id)
    });
  } catch (error) {
    next(error);
  }
};

// Get the current logged-in user's profile
exports.getProfile = async (req, res, next) => {
  try {
    // req.user.id is securely attached by our auth middleware!
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
