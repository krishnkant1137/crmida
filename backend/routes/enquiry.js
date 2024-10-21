const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry'); // Assuming the Enquiry model is in the 'models' folder

// Create a new enquiry
router.post('/', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry created successfully', enquiry });
  } catch (error) {
    res.status(400).json({ message: 'Error creating enquiry', error });
  }
});

// Get all enquiries
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching enquiries', error });
  }
});

// Update enquiry response by ID
router.put('/enquiry/:id', async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;

  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      id,
      { response },
      { new: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({
      message: 'Enquiry updated successfully',
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    res.status(500).json({ message: 'Server error while updating enquiry', error });
  }
});

module.exports = router;
