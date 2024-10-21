const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST route for admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Use email to find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token for the admin
    const token = jwt.sign({ email }, process.env.ADMIN_JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, email }); // Respond with token and email
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;  
