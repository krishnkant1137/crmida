const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const Faculty = require('../models/FacultiesAdmin'); // Ensure this is the correct model

// POST endpoint to create a new faculty
router.post('/create-faculty', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Received data:", req.body); // Debugging line

    // Check if faculty with the same email already exists
    const existingFaculty = await Faculty.findOne({ email });
    if (existingFaculty) {
      return res.status(400).json({ error: 'Faculty with this email already exists.' });
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newFaculty = new Faculty({
      name,
      email,
      password: hashedPassword,
      facultyId: uuidv4(), // Generate unique faculty ID
    });

    await newFaculty.save();
    res.status(201).json({ message: 'Faculty account created successfully!', facultyId: newFaculty.facultyId });
  } catch (error) {
    console.error('Error creating faculty account:', error); // More detailed error logging
    res.status(500).json({ error: 'Error creating faculty account: ' + error.message });
  }
});

module.exports = router;
