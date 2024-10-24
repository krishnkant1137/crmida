import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control the success modal
  const [dob, setDob] = useState('');
  const [formData, setFormData] = useState({
    serialNumber: '',
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    mobileNumber: '',
    email: '',
    qualification: '',
    college: '',
    occupation: '',
    status: '',
    gender: '',
    presentAddress: '',
    permanentAddress: '',
    emergencyContact: {
      name: '',
      mobileNumber: '',
      relation: '',
      fatherNumber: '',
    },
    courseName: '',
    totalFee: '',
    registrationFee: '',
    admissionType: 'Offline',
    paymentType: 'Full Payment',
    paymentMode: 'Cash',
    startDate: '',
    installments: '',
    paymentReceived: '',
    paymentDate: '',
    passportPhoto: null,
    aadhaarCard: null,
    documentsSubmitted: {
      aadhaar: false,
      voterCard: false,
      drivingLicense: false,
      other: false,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateForm()) return;

    const dob = formData.dob;

    if (!dob) {
      setErrorMessage('Date of Birth is required.');
      return;
    }

    try {
      const formattedDobDate = formatDate(dob);

      // Upload Aadhaar Card
      const cloudinaryDataAadhaar = new FormData();
      cloudinaryDataAadhaar.append('file', formData.aadhaarCard);
      cloudinaryDataAadhaar.append('upload_preset', 'my_upload_preset');

      const cloudinaryResponseAadhaar = await axios.post(
        'https://api.cloudinary.com/v1_1/dpwcvgpt3/image/upload',
        cloudinaryDataAadhaar
      );
      const aadhaarUrl = cloudinaryResponseAadhaar.data.secure_url;

      // Upload Passport Photo
      const cloudinaryDataPassport = new FormData();
      cloudinaryDataPassport.append('file', formData.passportPhoto);
      cloudinaryDataPassport.append('upload_preset', 'my_upload_preset');

      const cloudinaryResponsePassport = await axios.post(
        'https://api.cloudinary.com/v1_1/dpwcvgpt3/image/upload',
        cloudinaryDataPassport
      );
      const passportUrl = cloudinaryResponsePassport.data.secure_url;

      const rollNumber = `IDA${formData.serialNumber}`;
      const admissionDate = format(new Date(), 'yyyy-MM-dd');
      const formattedStartDate = formatDate(formData.startDate);
      const formattedPaymentDate = formatDate(formData.paymentDate);

      await axios.post('http://3.145.137.229:5000/api/admissions', {
        ...formData,
        dob: formattedDobDate,
        aadhaarCardUrl: aadhaarUrl,
        passportPhotoUrl: passportUrl,
        rollNumber: rollNumber,
        admissionDate: admissionDate,
        startDate: formattedStartDate,
        paymentDate: formattedPaymentDate,
      });

      // Show success modal when the submission is successful
      setSuccessMessage('Form submitted successfully!');
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage('Failed to submit the form. Please try again.');
    }
  };

  const validateForm = () => {
    const { mobileNumber, email, dob } = formData;
    const emailRegex = /\S+@\S+\.\S+/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return false;
    }
    if (!mobileRegex.test(mobileNumber)) {
      setErrorMessage("Mobile number must be 10 digits");
      return false;
    }
    if (!dob) {
      setErrorMessage("Date of Birth is required");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => {
      if (name === 'dob') {
        setDob(value);
      }
      if (name.includes('emergencyContact')) {
        const contactField = name.split('.')[1];
        return {
          ...prevData,
          emergencyContact: {
            ...prevData.emergencyContact,
            [contactField]: value,
          },
        };
      } else if (name === 'aadhaarCard' || name === 'passportPhoto') {
        return {
          ...prevData,
          [name]: files ? files[0] : value,
        };
      } else if (name.includes('documentsSubmitted')) {
        const docField = name.split('.')[1];
        return {
          ...prevData,
          documentsSubmitted: {
            ...prevData.documentsSubmitted,
            [docField]: !prevData.documentsSubmitted[docField],
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const formatDate = (dateString) => {
    const [yyyy, mm, dd] = dateString.split('-');
    if (!dd || !mm || !yyyy || isNaN(Date.parse(`${yyyy}-${mm}-${dd}`))) {
      throw new RangeError('Invalid date format');
    }
    const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
    dateObj.setHours(0, 0, 0, 0);
    return dateObj.toISOString().split('T')[0];
  };

  return (
    <div className='pt-20'>
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 rounded mb-4">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded mb-4">
          <span className="block text-center">{successMessage}</span>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Admission Successful!</h2>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/salesDashboard');
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Go to Sales Dashboard
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4 space-y-4">
        <button
          onClick={() => navigate('/salesDashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
        >
          Back
        </button>
        <h2 className="text-2xl font-bold mb-4">Admission Form</h2>

        {/* Form Fields */}
        {/* Serial Number */}
        <div>
          <label className="block mb-1">Serial Number:</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-1">Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Father Name */}
        <div>
          <label className="block mb-1">Father Name:</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Mother Name */}
        <div>
          <label className="block mb-1">Mother Name:</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={dob}
            onChange={(e) => {
              handleChange(e);
              setFormData({ ...formData, dob: e.target.value });
            }}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block mb-1">Mobile Number:</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block mb-1">Qualification:</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* College */}
        <div>
          <label className="block mb-1">College:</label>
          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-1">Occupation:</label>
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1">Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Present Address */}
        <div>
          <label className="block mb-1">Present Address:</label>
          <input
            type="text"
            name="presentAddress"
            value={formData.presentAddress}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Permanent Address */}
        <div>
          <label className="block mb-1">Permanent Address:</label>
          <input
            type="text"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Emergency Contact</h3>
          <div>
            <label className="block mb-1">Name:</label>
            <input
              type="text"
              name="emergencyContact.name"
              value={formData.emergencyContact.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Mobile Number:</label>
            <input
              type="text"
              name="emergencyContact.mobileNumber"
              value={formData.emergencyContact.mobileNumber}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Relation:</label>
            <input
              type="text"
              name="emergencyContact.relation"
              value={formData.emergencyContact.relation}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1">Father Number:</label>
            <input
              type="text"
              name="emergencyContact.fatherNumber"
              value={formData.emergencyContact.fatherNumber}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Course Name */}
        <div>
          <label className="block mb-1">Course Name:</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Total Fee */}
        <div>
          <label className="block mb-1">Total Fee:</label>
          <input
            type="text"
            name="totalFee"
            value={formData.totalFee}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Registration Fee */}
        <div>
          <label className="block mb-1">Registration Fee:</label>
          <input
            type="text"
            name="registrationFee"
            value={formData.registrationFee}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Admission Type */}
        <div>
          <label className="block mb-1">Admission Type:</label>
          <select
            name="admissionType"
            value={formData.admissionType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>

        {/* Payment Type */}
        <div>
          <label className="block mb-1">Payment Type:</label>
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Full Payment">Full Payment</option>
            <option value="Installment">Installment</option>
          </select>
        </div>

        {/* Payment Mode */}
        <div>
          <label className="block mb-1">Payment Mode:</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
          </select>
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Installments */}
        <div>
          <label className="block mb-1">Installments:</label>
          <input
            type="text"
            name="installments"
            value={formData.installments}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Payment Received */}
        <div>
          <label className="block mb-1">Payment Received:</label>
          <input
            type="text"
            name="paymentReceived"
            value={formData.paymentReceived}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="block mb-1">Payment Date:</label>
          <input
            type="date"
            name="paymentDate"
            value={formData.paymentDate}
            onChange={handleChange}
            required
            className="w-full border rounded p-2"
          />
        </div>

        {/* Upload Aadhaar Card */}
        <div>
          <label className="block mb-1">Upload Aadhaar Card:</label>
          <input
            type="file"
            name="aadhaarCard"
            onChange={handleChange}
            accept="image/*"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Upload Passport Photo */}
        <div>
          <label className="block mb-1">Upload Passport Photo:</label>
          <input
            type="file"
            name="passportPhoto"
            onChange={handleChange}
            accept="image/*"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>

      {isSuccess && (
        <div className="mt-4 bg-green-100 text-green-700 p-2 rounded">
          Form submitted successfully!
        </div>
      )}
    </div>
  );
};

export default AdmissionForm;
