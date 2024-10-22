const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const StudentPayment = require('../models/StudentPayment');

// Route to add a payment
router.patch('/:rollNumber', async (req, res) => {
    const { amountPaid } = req.body;

    try {
        // Fetch student by roll number
        const student = await Admission.findOne({ rollNumber: req.params.rollNumber });
        if (!student) return res.status(404).json({ message: 'Student not found' });

        // Create a new payment record
        const payment = new StudentPayment({
            studentId: student._id,
            amountPaid,
            installmentNumber: student.installments,
        });

        // Save the payment record
        await payment.save();

        // Update the student's payment information
        student.paymentReceived += amountPaid;
        student.paymentHistory.push(payment._id);
        student.installments = Math.max(0, student.installments - 1); // Decrement installments

        await student.save();

        // Response with updated information
        res.json({
            student,
            remainingAmount: student.totalFee - student.paymentReceived,
            installments: student.installments,
        });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
