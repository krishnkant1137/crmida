const express = require('express');
const router = express.Router();
const EnrolledStudent = require('../models/Admission'); // Adjust the path as needed

// GET all enrolled students
router.get('/', async (req, res) => {
  try {
    const students = await EnrolledStudent.find(); // Fetch all enrolled students
    res.json(students);
  } catch (error) {
    console.error('Error fetching enrolled students:', error);
    res.status(500).json({ message: 'Error fetching enrolled students' });
  }
});

// GET a specific enrolled student by ID
router.get('/:id', async (req, res) => {
  try {
    const studentId = req.params.id; // Get the student ID from the request parameters
    const student = await EnrolledStudent.findById(studentId); // Fetch the student by ID

    if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // Handle not found case
    }

    res.json(student); // Return the student's details
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Error fetching student' });
  }
});

// Remove payment update functionality from here

module.exports = router;
