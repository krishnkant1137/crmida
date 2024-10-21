const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission'); // Adjust the path as needed

// Route to fetch all student profiles
router.get('/', async (req, res) => {
    try {
      const students = await Admission.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  });

module.exports = router;
