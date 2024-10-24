// routes/demo.js

const express = require('express');
const router = express.Router();
const Demo = require('../models/Demo'); // Import the Demo model

// POST route to handle demo form submission
router.post('/', async (req, res) => {
  const { name, number, time, course, demoBy } = req.body;

  try {
    // Create a new demo record
    const newDemo = new Demo({ name, number, time, course, demoBy });
    const savedDemo = await newDemo.save();

    res.status(201).json({ message: 'Demo successfully recorded!', demo: savedDemo });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting demo', error });
  }
});

// GET route to fetch all demos, with optional filtering by faculty name
router.get('/', async (req, res) => {
  const { facultyName } = req.query;

  try {
    const filter = facultyName ? { demoBy: facultyName } : {};
    const demos = await Demo.find(filter);

    // Optionally format the date if you want a specific format
    const formattedDemos = demos.map(demo => ({
      ...demo.toObject(),
      createdAt: demo.createdAt.toISOString(), // or format as needed
    }));

    res.json(formattedDemos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching demos', error });
  }
});

// Update demo route
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const demo = await Demo.findByIdAndUpdate(id, updateData, { new: true });
    if (!demo) {
      return res.status(404).json({ message: 'Demo not found' });
    }
    res.json(demo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating demo' });
  }
});


// Delete demo route
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDemo = await Demo.findByIdAndDelete(id);
    if (!deletedDemo) {
      return res.status(404).json({ message: 'Demo not found' });
    }
    res.json({ message: 'Demo successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting demo' });
  }
});

module.exports = router;
