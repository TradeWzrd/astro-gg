/**
 * Async Handler Middleware
 * Wraps async route handlers to handle exceptions without try/catch blocks
 * Automatically passes errors to the error handling middleware
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
