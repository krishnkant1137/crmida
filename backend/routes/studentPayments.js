const express = require('express');
const router = express.Router();
const StudentPayment = require('../models/StudentPayment');
const Admission = require('../models/Admission');

// Add payment and update passport photo route
router.put('/:id', async (req, res) => {
    const { paymentReceived, passportPhoto } = req.body; // Include passportPhoto in request body

    try {
        // Parse paymentReceived to ensure it's a number
        const paymentAmount = Number(paymentReceived);
        if (isNaN(paymentAmount) || paymentAmount <= 0) {
            return res.status(400).json({ message: 'Invalid payment amount' });
        }

        // Find the admission record
        const admission = await Admission.findById(req.params.id);
        if (!admission) {
            return res.status(404).json({ message: 'Student record not found' });
        }

        // Check if payment exceeds remaining fee
        const remainingFee = admission.totalFee - admission.paymentReceived;
        if (paymentAmount > remainingFee) {
            return res.status(400).json({ message: 'Payment amount cannot exceed the remaining fee.' });
        }

        // Calculate the fixed installment amount
        const installmentAmount = admission.totalFee / admission.installments;

        // Calculate the total payment to be recorded
        let totalPaymentToBeRecorded = paymentAmount;

        // Update the paymentReceived in Admission, but only add the installment amount if within limits
        if (totalPaymentToBeRecorded + admission.paymentReceived > admission.totalFee) {
            totalPaymentToBeRecorded = admission.totalFee - admission.paymentReceived;
        }

        admission.paymentReceived += totalPaymentToBeRecorded;

        // Update the passport photo if provided
        if (passportPhoto) {
            admission.passportPhoto = passportPhoto; // Update passport photo
        }

        await admission.save();

        // Create a new payment entry in StudentPayment
        const newPayment = new StudentPayment({
            student: admission._id,
            amount: totalPaymentToBeRecorded,
            installmentNumber: admission.installments,
            paymentMethod: 'Cash', // or adjust as per your needs
        });
        await newPayment.save();

        // Update Installment Status based on the cumulative payments
        const currentTotalPayments = admission.paymentReceived;

        // Initialize installmentsStatus if it's not already an array
        if (!Array.isArray(admission.installmentsStatus)) {
            admission.installmentsStatus = Array(admission.installments).fill('Pending');
        }

        // Ensure updates to installment statuses
        for (let i = 0; i < admission.installments; i++) {
            if (currentTotalPayments >= installmentAmount * (i + 1) && admission.installmentsStatus[i] !== 'Completed') {
                admission.installmentsStatus[i] = 'Completed';
            }
        }

        // Save the updated admission document
        await admission.save();

        // Respond with updated data
        res.status(200).json({ message: 'Payment updated successfully', admission });
    } catch (error) {
        console.error('Error updating payment:', error);
        res.status(500).json({ message: 'Failed to update payment', error });
    }
});

// Get payment history for a specific student
router.get('/:studentId', async (req, res) => {
    console.log(`Fetching payment history for student ID: ${req.params.studentId}`);
    try {
        const payments = await StudentPayment.find({ student: req.params.studentId }).populate('student');
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payment history:', error);
        res.status(500).json({ message: 'Failed to fetch payment history', error });
    }
});

module.exports = router;
