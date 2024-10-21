const mongoose = require('mongoose');

// Emergency contact schema
const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobileNumber: { 
    type: String, 
    required: true, 
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v),
      message: 'Mobile number must be 10 digits.'
    }
  },
  relation: { type: String, required: true },
  fatherNumber: { type: String },
});

// Documents submitted schema
const documentsSubmittedSchema = new mongoose.Schema({
  aadhaar: { type: Boolean, default: false },
  voterCard: { type: Boolean, default: false },
  drivingLicense: { type: Boolean, default: false },
  other: { type: Boolean, default: false },
  submittedAt: { type: Date }
});

// Payment history schema
const paymentHistorySchema = new mongoose.Schema({
  installmentNumber: { type: Number, required: true },
  amountPaid: { type: Number, required: true, min: 0 },
  paymentDate: { type: Date, required: true },
});

// Admission schema
const admissionSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  rollNumber: { type: String, required: true, unique: true },
  admissionDate: { type: String, default: Date.now },
  fullName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { 
    type: String, 
    required: true,
  },
  mobileNumber: { 
    type: String, 
    required: true, 
    validate: {
      validator: (v) => /^[0-9]{10}$/.test(v),
      message: 'Mobile number must be 10 digits.'
    }
  },
  email: { 
    type: String, 
    required: true, 
    validate: {
      validator: (v) => /\S+@\S+\.\S+/.test(v),
      message: 'Invalid email format.'
    }
  },
  qualification: { type: String },
  college: { type: String },
  occupation: { type: String },
  status: { type: String },
  gender: { type: String },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  emergencyContact: emergencyContactSchema,
  courseName: { type: String },
  totalFee: { type: Number, required: true },
  registrationFee: { type: Number }, 
  admissionType: { type: String, default: 'Offline' },
  paymentType: { type: String, default: 'Full Payment' },
  paymentMode: { type: String, default: 'Cash' },
  startDate: { 
    type: Date,
  },
  installments: { type: Number, default: 1 }, // Ensure this is the default value
  paymentHistory: {
    type: [paymentHistorySchema, { type: mongoose.Schema.Types.ObjectId, ref: 'StudentPayment' }],

  },
  paymentReceived: { type: Number, default: 0 },
  paymentDate: { 
    type: Date,
  },
  passportPhoto: { type: String, required: true }, 
  aadhaarCard: { type: String, required: true }, 
  documentsSubmitted: documentsSubmittedSchema,
  batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  classification: { 
    type: String, 
    enum: ['Not Classified', 'Good', 'Average', 'Weak', 'Better'], 
    default: 'Not Classified' 
  }
});

// Create and export the Admission model
const Admission = mongoose.models.Admission || mongoose.model('Admission', admissionSchema);
module.exports = Admission;
