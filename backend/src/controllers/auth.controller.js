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
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if the user already exists in the DB
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User already exists' });
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
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Login existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by their email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Compare the raw password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
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
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get the current logged-in user's profile
exports.getProfile = async (req, res) => {
  try {
    // req.user.id is securely attached by our auth middleware!
    const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
