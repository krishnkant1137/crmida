// routes/studentPayments.js
const express = require('express');
const router = express.Router();
const StudentPayment = require('../models/StudentPayment');
const Admission = require('../models/Admission');

// Add payment route
router.post('/', async (req, res) => {
    const { studentId, amount, installmentNumber, paymentMethod, receiptNumber, remarks } = req.body;

    try {
        // Create new payment record
        const newPayment = new StudentPayment({
            student: studentId,
            amount,
            installmentNumber,
            paymentMethod,
            receiptNumber,
            remarks,
        });

        // Save payment to database
        const savedPayment = await newPayment.save();

        // Update the corresponding admission record
        const admission = await Admission.findById(studentId);
        if (!admission) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Update payment history and payment received
        admission.paymentHistory.push(savedPayment._id);
        admission.paymentReceived += amount;

        // Calculate remaining fee if necessary
        // admission.remainingFee = admission.totalFee - admission.paymentReceived;

        await admission.save();

        res.status(201).json(savedPayment);
    } catch (error) {
        console.error('Error adding payment:', error);
        res.status(500).json({ message: 'Failed to add payment', error });
    }
});

// Get payment history for a specific student
router.get('/:studentId', async (req, res) => {
    try {
        const payments = await StudentPayment.find({ student: req.params.studentId }).populate('student');
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ message: 'Failed to fetch payment history', error });
    }
});

module.exports = router;
