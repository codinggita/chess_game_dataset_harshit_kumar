const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  try {
    let token;
    
    // Check if the authorization header exists and starts with 'Bearer '
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Split "Bearer <token>" and grab the token part
      token = req.headers.authorization.split(' ')[1];
    }
    
    // If no token was found, reject the request
    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authorized, no token provided' });
    }
    
    // Verify the token signature using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user's ID to the request object so subsequent controllers can use it
    req.user = { id: decoded.id };
    
    // Move to the next middleware or controller
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Not authorized, invalid token' });
  }
};
