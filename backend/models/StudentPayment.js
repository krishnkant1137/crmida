const mongoose = require('mongoose');

// Payment schema
const studentPaymentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Admission', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, default: Date.now },
    installmentNumber: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ['Cash', 'Card', 'Online Transfer'] },
    status: { type: String, default: 'Completed', enum: ['Completed', 'Pending', 'Failed'] },
    receiptNumber: { type: String },
    remarks: { type: String },
});

// Create the model
const StudentPayment = mongoose.models.StudentPayment || mongoose.model('StudentPayment', studentPaymentSchema);
module.exports = StudentPayment;
