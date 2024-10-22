const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');

// POST route to handle form submission
router.post('/admissions', async (req, res) => {
  const {
    serialNumber,
    rollNumber,
    admissionDate,
    fullName,
    fatherName,
    motherName,
    dob,
    mobileNumber,
    email,
    qualification,
    college,
    occupation,
    status,
    gender,
    presentAddress,
    permanentAddress,
    emergencyContact,
    relation,
    courseName,
    totalFee,
    registrationFee,
    admissionType,
    paymentType,
    paymentMode,
    startDate,
    installments,
    paymentReceived,
    paymentDate,
    passportPhotoUrl,
    aadhaarCardUrl,
    documentsSubmitted,
  } = req.body;

  console.error('Request body:', req.body);

  // Validate required fields
  const requiredFields = [fullName, email, admissionDate, dob, mobileNumber];
  if (requiredFields.includes(undefined) || requiredFields.includes('')) {
    return res.status(400).json({ error: 'Full name, email, admission date, dob, and mobile number are required' });
  }
    // Format emergency contact if it's an object
    const formattedEmergencyContact = {
      name: emergencyContact.name,
      mobileNumber: emergencyContact.mobileNumber,
      relation: emergencyContact.relation,
    };

    const formattedDob = formatDate(dob);

    // Create a new admission entry
    const newAdmission = new Admission({
      serialNumber,
      rollNumber,
      admissionDate,
      fullName,
      fatherName,
      motherName,
      dob:formattedDob,
      mobileNumber,
      email,
      qualification,
      college,
      occupation,
      status,
      gender,
      presentAddress,
      permanentAddress,
      emergencyContact,
      relation,
      courseName,
      totalFee,
      registrationFee,
      admissionType,
      paymentType,
      paymentMode,
      startDate,
      installments,
      paymentReceived,
      paymentDate,
      passportPhoto:passportPhotoUrl || '',
      aadhaarCard: aadhaarCardUrl || '',
      documentsSubmitted,
    });
try{
    // Save the admission data to MongoDB
    await newAdmission.save();
    res.status(201).json({ message: 'Admission submitted successfully!' });
  } catch (error) {
    console.error('Error saving admission data:', error);
    res.status(500).json({ error: 'Failed to submit admission' });
  }
});

// GET route to fetch student by ID
router.get('/student/:studentId', async (req, res) => {
  try {
    const { dob } = req.body;
    const formattedDate = formatDate(dob);
    const newDateEntry = new DateModel({ dob: formattedDate });
        await newDateEntry.save();
    const { studentId } = req.params;
    const student = await Admission.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`; // Convert to 'dd-mm-yyyy'
}

module.exports = router;
