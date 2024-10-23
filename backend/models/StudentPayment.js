const mongoose = require('mongoose');

// Define the StudentPayment schema
const StudentPaymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true }, // Reference to the student
    amountPaid: { type: Number, required: true }, // Amount paid
    installmentNumber: { type: Number, required: true }, // Installment number
    paymentDate: { type: Date, default: Date.now }, // Date of payment
});

// Export the StudentPayment model
const StudentPayment = mongoose.models.StudentPayment || mongoose.model('StudentPayment', StudentPaymentSchema);
module.exports = StudentPayment;
