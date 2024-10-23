import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentPayment = () => {
  const { id } = useParams(); // Extract the student ID from the URL
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
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

  const handlePayment = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || Number(paymentAmount) <= 0) {
      alert('Please enter a valid payment amount.');
      return;
    }

    try {
      // Calculate remaining fee and first installment amount
      const remainingFee = student.totalFee - student.paymentReceived;
      const numberOfInstallments = student.installments;
      const installmentAmount = (remainingFee / numberOfInstallments).toFixed(2); // Amount per installment
      const updatedPaymentReceived = student.paymentReceived + Number(paymentAmount);

      // Update payment in the backend
      const response = await axios.put(`http://3.145.137.229:5000/api/student-payments/${id}`, {
        paymentReceived: updatedPaymentReceived,
      });

      if (response.status === 200) {
        // Update local state
        setStudent((prevStudent) => {
          const newInstallments = [...prevStudent.installmentsStatus];

          // Check if payment meets or exceeds the first installment amount
          if (Number(paymentAmount) >= Number(installmentAmount)) {
            newInstallments[0] = 'Completed'; // Mark first installment as completed
          }

          return {
            ...prevStudent,
            paymentReceived: updatedPaymentReceived,
            installmentsStatus: newInstallments,
          };
        });
        
        // Reset payment amount
        setPaymentAmount('');
      } else {
        throw new Error('Failed to update payment.');
      }
    } catch (err) {
      console.error('Error updating payment:', err.message);
      setError('Failed to update payment. Please check if the student exists and try again.');
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!student) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  // Calculate remaining fee
  const remainingFee = student.totalFee - student.paymentReceived;

  // Calculate installments and due dates
  const numberOfInstallments = student.installments; // Assuming this is the number of installments
  const installmentAmount = (remainingFee / numberOfInstallments).toFixed(2); // Amount per installment
  const dueDates = [];

  // Calculate due dates for each installment
  for (let i = 0; i < numberOfInstallments; i++) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (i + 1) * 30); // Add 30 days for each installment
    dueDates.push(dueDate.toLocaleDateString()); // Store the formatted due date
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
          <strong>Remaining Fee:</strong> ₹{remainingFee} {/* Remaining fee calculation */}
        </div>
        <div className="mb-3">
          <strong>Installments:</strong> {student.installments}
        </div>
        <div className="mb-3">
          <strong>Installment Amount:</strong> ₹{installmentAmount} {/* Amount per installment */}
        </div>
        <div className="mb-3">
          <strong>Due Dates:</strong>
          <ul>
            {dueDates.map((date, index) => (
              <li key={index}>Installment {index + 1}: {date}</li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <label htmlFor="payment" className="block mb-2 font-medium">Add Payment:</label>
          <input
            type="number"
            id="payment"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            className="border rounded-md p-2 w-full"
            placeholder="Enter payment amount"
          />
          <button
            onClick={handlePayment}
            className="mt-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Add Payment
          </button>
        </div>
        {/* Display Installment Status */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Installment Status:</h2>
          <ul>
            {student.installmentsStatus && student.installmentsStatus.map((status, index) => (
              <li key={index}>
                Installment {index + 1}: {status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentPayment;
