const mongoose = require('mongoose');

const StudentPaymentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true },
    amountPaid: { type: Number, required: true },
    installmentNumber: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudentPayment', StudentPaymentSchema);
