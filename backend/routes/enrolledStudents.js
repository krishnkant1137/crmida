const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const EnrolledStudent = require('../models/Admission'); // Adjust the path as needed

// GET all enrolled students
router.get('/', async (req, res) => {
  try {
    const students = await EnrolledStudent.find(); // Fetch all enrolled students
    res.json(students);
  } catch (error) {
    console.error('Error fetching enrolled students:', error.message);
    res.status(500).json({ message: 'Error fetching enrolled students' });
  }
});

// GET a specific enrolled student by ID
router.get('/:id', async (req, res) => {
  const studentId = req.params.id;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(400).json({ message: 'Invalid student ID' });
  }

  try {
    // Fetch only the specific fields required
    const student = await EnrolledStudent.findById(studentId, 'fullName rollNumber mobileNumber courseName totalFee paymentReceived installments');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // Handle not found case
    }

    res.json(student); // Return the student's details
  } catch (error) {
    console.error('Error fetching student:', error.message); // Log the error message
    res.status(500).json({ message: 'Error fetching student', error: error.message }); // Include the error message in the response
  }
});

module.exports = router; 
