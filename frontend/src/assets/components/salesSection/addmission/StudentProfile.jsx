import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentPayment = () => {
  const { id } = useParams(); // Extract the student ID from the URL
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the student's details using the student ID
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://3.145.137.229:5000/api/enrolled-students/${id}`);
        setStudent(response.data);
      } catch (err) {
        console.error('Error fetching student details:', err.message);
        setError('Failed to load student details.');
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!student) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  // Render the student details
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-white to-blue-50 rounded-md shadow-lg mt-10">
      <button
        onClick={() => navigate('/sales/all-enrolled-students')}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 mb-6"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Student Profile</h1>
      <div className="bg-white p-6 rounded-md shadow-lg">
        <div className="mb-3">
          <strong>Full Name:</strong> {student.fullName}
        </div>
        <div className="mb-3">
          <strong>Roll Number:</strong> {student.rollNumber}
        </div>
        <div className="mb-3">
          <strong>Mobile Number:</strong> {student.mobileNumber}
        </div>
        <div className="mb-3">
          <strong>Course Name:</strong> {student.courseName}
        </div>
        <div className="mb-3">
          <strong>Total Fee:</strong> ₹{student.totalFee}
        </div>
        <div className="mb-3">
          <strong>Payment Received:</strong> ₹{student.paymentReceived}
        </div>
        <div className="mb-3">
          <strong>Installments:</strong> {student.installments}
        </div>
      </div>
    </div>
  );
};

export default StudentPayment;
