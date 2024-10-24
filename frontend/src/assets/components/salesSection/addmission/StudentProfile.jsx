import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentPayment = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [installmentAmount, setInstallmentAmount] = useState(0);
  const [installmentsStatus, setInstallmentsStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://3.145.137.229:5000/api/enrolled-students/${id}`);
        const studentData = response.data;
        setStudent(studentData);

        const remainingFee = studentData.totalFee - studentData.paymentReceived;
        const fixedInstallmentAmount = (remainingFee / studentData.installments).toFixed(2);
        setInstallmentAmount(fixedInstallmentAmount);

        setInstallmentsStatus(updateInstallmentStatus(studentData.paymentReceived, fixedInstallmentAmount, studentData.installments));
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
      const remainingFee = student.totalFee - student.paymentReceived;

      // Adjust the payment amount to not exceed the remaining fee
      const validPaymentAmount = Math.min(Number(paymentAmount), remainingFee);

      if (validPaymentAmount <= 0) {
        alert('No valid payment can be made.');
        return;
      }

      setLoading(true);

      const response = await axios.put(`http://3.145.137.229:5000/api/student-payments/${id}`, {
        paymentReceived: validPaymentAmount,
      });

      if (response.status === 200) {
        const updatedStudent = response.data.admission;
        setStudent(updatedStudent);
        setInstallmentsStatus(updateInstallmentStatus(updatedStudent.paymentReceived, installmentAmount, updatedStudent.installments));
        setPaymentAmount('');
        setSuccessMessage('Payment updated successfully!');

        // Clear the success message after a few seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Failed to update payment.');
      }
    } catch (err) {
      console.error('Error updating payment:', err.message);
      setError('Failed to update payment. Please check if the student exists and try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateInstallmentStatus = (totalPaymentReceived, installmentAmount, totalInstallments) => {
    const updatedStatus = [];
    let remainingPayment = totalPaymentReceived;

    for (let i = 0; i < totalInstallments; i++) {
      if (remainingPayment >= installmentAmount) {
        updatedStatus.push('Completed');
        remainingPayment -= installmentAmount;
      } else {
        updatedStatus.push('Pending');
      }
    }
    return updatedStatus;
  };

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  if (!student) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const remainingFee = student.totalFee - student.paymentReceived;
  const allInstallmentsCompleted = installmentsStatus.every(status => status === 'Completed');
  const dueDates = [];

  for (let i = 0; i < student.installments; i++) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (i + 1) * 30);
    dueDates.push(dueDate.toLocaleDateString());
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg mt-10">
      <button
        onClick={() => navigate('/sales/all-enrolled-students')}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 mb-6"
      >
        Back
      </button>
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">Student Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img 
          src={student.passportPhoto || 'https://via.placeholder.com/250'} 
          alt={`${student.fullName}'s Profile`} 
          className="w-32 h-32 rounded-full mb-4 mx-auto border-4 border-blue-500 object-cover" 
        />
        <div className="text-lg font-semibold text-blue-600 mb-2">{student.fullName}</div>
        <div className="mb-2"><strong>Roll Number:</strong> {student.rollNumber}</div>
        <div className="mb-2"><strong>Mobile Number:</strong> {student.mobileNumber}</div>
        <div className="mb-2"><strong>Course Name:</strong> {student.courseName}</div>
        <div className="mb-2"><strong>Total Fee:</strong> ₹{student.totalFee}</div>
        <div className="mb-2"><strong>Payment Received:</strong> ₹{student.paymentReceived}</div>
        <div className="mb-2"><strong>Remaining Fee:</strong> ₹{remainingFee}</div>
        <div className="mb-2"><strong>Installments:</strong> {student.installments}</div>
        <div className="mb-4"><strong>Installment Amount:</strong> ₹{installmentAmount}</div>
        <div className="mb-4">
          <strong>Due Dates:</strong>
          <ul className="list-disc pl-5">
            {dueDates.map((date, index) => (
              <li key={index}>Installment {index + 1}: {date}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <strong>Installment Status:</strong>
          <ul className="list-disc pl-5">
            {installmentsStatus.map((status, index) => (
              <li key={index}>Installment {index + 1}: {status}</li>
            ))}
          </ul>
        </div>
      </div>

      {allInstallmentsCompleted ? (
        <div className="mt-4 text-green-600 text-center font-bold">All installments are completed!</div>
      ) : (
        <div className="mt-6 flex flex-col items-center">
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Enter Payment Amount"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full max-w-xs"
          />
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Processing...' : 'Add Payment'}
          </button>
        </div>
      )}

      {successMessage && <div className="text-green-500 text-center mt-4">{successMessage}</div>}
    </div>
  );
};

export default StudentPayment;
