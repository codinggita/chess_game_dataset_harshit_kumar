/**
 * Simple Request Logging Middleware
 * 
 * What is it?
 * This middleware intercepts all incoming requests to our server and prints
 * basic information about them to the console before passing them to the next handler.
 * 
 * It logs the current timestamp, the HTTP method (GET, POST, etc.), and the requested URL.
 */
const loggerMiddleware = (req, res, next) => {
  // Generate a standard ISO format timestamp
  const timestamp = new Date().toISOString();
  
  // Print the log in format: [Timestamp] METHOD /url
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  
  // Continue to the next middleware or route handler
  next();
};

module.exports = loggerMiddleware;
