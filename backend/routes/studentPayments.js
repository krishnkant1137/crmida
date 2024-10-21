const express = require('express');
const router = express.Router();
const StudentPayment = require('../models/StudentPayment');
const EnrolledStudent = require('../models/Admission');

// Add payment endpoint
router.patch('/:studentId', async (req, res) => {
  const { amountPaid } = req.body;
  const studentId = req.params.studentId;

  // Validate payment amount
  if (!amountPaid || amountPaid <= 0) {
    return res.status(400).json({ message: 'Invalid payment amount' });
  }

  try {
    // Fetch the student
    const student = await EnrolledStudent.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Save the payment
    const paymentNumber = student.paymentHistory.length + 1;
    const newPayment = new StudentPayment({
      studentId,
      amountPaid,
      installmentNumber: paymentNumber,
      paymentDate: new Date()
    });

    await newPayment.save();

    // Update payment history in the enrolled student record
    student.paymentHistory.push(newPayment._id);
    student.paymentReceived += amountPaid;
    await student.save();

    // Calculate remaining amount and installments
    const totalFee = student.totalFee;
    const remainingAmount = totalFee - student.paymentReceived;
    const installmentsCount = student.installments || 1;
    const installmentAmount = (remainingAmount / installmentsCount).toFixed(2);

    const dueDates = Array.from({ length: installmentsCount }, (_, index) => {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + (30 * (index + 1)));
      return {
        installmentNumber: index + 1,
        amount: installmentAmount,
        dueDate: dueDate.toLocaleDateString(),
      };
    });

    res.json({ 
      message: 'Payment recorded successfully!', 
      student, 
      remainingAmount, 
      installments: dueDates 
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
