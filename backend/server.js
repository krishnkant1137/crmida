const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const enquiryRoutes = require('./routes/enquiry');
const studentRoutes = require('./routes/student');
const demoRoutes = require('./routes/demo');
const salesRoutes = require('./routes/salesLogin');
const facultiesRoutes = require('./routes/facultyLogin');
const admissionRoutes = require('./routes/admission');
const enrolledStudentsRoutes = require('./routes/enrolledStudents');
const studentPaymentsRoutes = require('./routes/studentPayments');
const batchRoutes = require('./routes/batchRoutes');
const attendanceRoutes = require('./routes/attendance');
const performanceRoutes = require('./routes/performance');
const HrLoginRoute = require('./routes/hrLogin');
const adminLoginRoute = require('./routes/adminLogin');
const addFacultyRoute = require('./routes/addFaculty');
const hrStudentRoute = require('./routes/hrStudent');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://3.145.137.229','http://localhost:5000'],  // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow cookies
}));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/demo', demoRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/enrolled-students', enrolledStudentsRoutes);
app.use('/api/student-payments', studentPaymentsRoutes);
app.use('/api/faculties', facultiesRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/HR', HrLoginRoute);
app.use('/api/admin', adminLoginRoute);
app.use('/api/addFaculty', addFacultyRoute);
app.use('/api/hrStudent', hrStudentRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Catch-all route for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
