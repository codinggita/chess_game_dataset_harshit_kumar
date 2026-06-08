// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  let statusCode = 500;
  let message = err.message || 'Server Error';

  // Handle Mongoose CastError (Invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 404; // Not Found makes sense if the ID format is invalid
    message = 'Resource not found or invalid ID format';
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    // Extract the specific validation messages from the error object
    const validationMessages = Object.values(err.errors).map(val => val.message);
    message = validationMessages.join(', ');
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered';
  }

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
