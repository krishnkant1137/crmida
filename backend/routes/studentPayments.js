const express = require('express');
const router = express.Router();
const StudentPayment = require('../models/StudentPayment');
const Admission = require('../models/Admission'); // Import the Admission model

// POST a new payment record
router.post('/', async (req, res) => {
    try {
        const { studentId, amountPaid, installmentNumber } = req.body;

        // Create a new payment record
        const payment = new StudentPayment({
            studentId,
            amountPaid,
            installmentNumber,
        });

        // Save the payment record to the database
        await payment.save();

        // Update the corresponding student's paymentReceived and installments fields
        await Admission.findByIdAndUpdate(studentId, {
            $inc: {
                paymentReceived: amountPaid,
                installments: 1, // Increment the number of installments
            },
        });

        res.status(201).json({ message: 'Payment recorded successfully!', payment });
    } catch (error) {
        console.error('Error recording payment:', error);
        res.status(500).json({ message: 'Failed to record payment.' });
    }
});

// GET all payment records for a specific student
router.get('/api/admissions/:id', async (req, res) => {
    try {
        const studentId = req.params.studentId; // Get the student ID from the request parameters
        const payments = await StudentPayment.find({ studentId }).populate('studentId'); // Fetch payments for the student

        res.json(payments); // Return the list of payments
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Failed to fetch payments.' });
    }
});

module.exports = router;
