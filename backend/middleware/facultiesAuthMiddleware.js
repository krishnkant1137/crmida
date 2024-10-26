// middleware/facultiesAuthMiddleware.js

const jwt = require('jsonwebtoken');

const facultyAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.FACULTIES_JWT_SECRET);
    req.facultyId = decoded.facultyId; // Add faculty ID to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error('Invalid token:', error);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = facultyAuthMiddleware;
