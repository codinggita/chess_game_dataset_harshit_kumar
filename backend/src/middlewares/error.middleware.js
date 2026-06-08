/**
 * Global Error Handling Middleware
 * 
 * What is it? 
 * This is a special Express middleware function that catches errors thrown 
 * from anywhere in the application (like inside our controllers).
 * 
 * Why is it useful?
 * Instead of writing `res.status(500).json(...)` in every single controller catch block,
 * we can just pass the error to `next(error)` and let this function handle it.
 * It ensures all our APIs return a consistent error response format.
 * 
 * How it works:
 * Express recognizes a middleware as an error handler if it has exactly 4 parameters:
 * (err, req, res, next). When we call `next(error)`, Express skips all regular routes
 * and goes straight to this error handler.
 */
const errorHandler = (err, req, res, next) => {
  // Log the error to the console for debugging
  console.error(err.stack);

  // Default values for the error response
  let statusCode = 500;
  let message = err.message || 'Server Error';

  // 1. Handle Mongoose "CastError" (e.g., Invalid ObjectId)
  // This happens when we pass a wrongly formatted ID to findById or similar methods
  if (err.name === 'CastError') {
    statusCode = 404; // Not Found makes sense if the ID format is invalid
    message = 'Resource not found or invalid ID format';
  }

  // 2. Handle Mongoose Validation Error
  // This happens when the data doesn't match our Schema requirements (e.g., missing required fields)
  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad Request
    // Extract the specific validation messages from the error object
    const validationMessages = Object.values(err.errors).map(val => val.message);
    message = validationMessages.join(', ');
  }

  // 3. Handle Mongoose Duplicate Key Error
  // This happens when trying to create a document with a unique field that already exists
  if (err.code === 11000) {
    statusCode = 400; // Bad Request
    message = 'Duplicate field value entered';
  }

  // Send the consistent JSON response
  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
