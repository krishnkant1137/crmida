import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentPayment = () => {
  const { id } = useParams(); // Extract the student ID from the URL
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const [installmentAmount, setInstallmentAmount] = useState(null); // State for fixed installment amount
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://3.145.137.229:5000/api/enrolled-students/${id}`);
        const studentData = response.data;
        setStudent(studentData);

        // Calculate the fixed installment amount based on the remaining fee
        const remainingFee = studentData.totalFee - studentData.paymentReceived;
        const fixedInstallmentAmount = (remainingFee / studentData.installments).toFixed(2);
        setInstallmentAmount(fixedInstallmentAmount);
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

      // Ensure payment does not exceed remaining fee
      if (Number(paymentAmount) > remainingFee) {
        alert('Payment amount cannot exceed the remaining fee.');
        return;
      }

      const updatedPaymentReceived = Number(paymentAmount);

      // Start loading
      setLoading(true);

      // Update payment on the server
      const response = await axios.put(`http://3.145.137.229:5000/api/student-payments/${id}`, {
        paymentReceived: updatedPaymentReceived,
      });

      if (response.status === 200) {
        const updatedStudent = response.data.admission;

        // Update the state with the new data from the server
        setStudent((prevStudent) => ({
          ...prevStudent,
          paymentReceived: updatedStudent.paymentReceived,
          installmentsStatus: updateInstallmentStatus(
            updatedStudent.paymentReceived,
            installmentAmount,
            updatedStudent.installments
          ),
        }));

        // Reset payment amount
        setPaymentAmount('');
      } else {
        throw new Error('Failed to update payment.');
      }
    } catch (err) {
      console.error('Error updating payment:', err.message);
      setError('Failed to update payment. Please check if the student exists and try again.');
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // Helper function to update installment status
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
  const allInstallmentsCompleted = student.installmentsStatus && student.installmentsStatus.every(status => status === 'Completed');
  const dueDates = [];

  for (let i = 0; i < student.installments; i++) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (i + 1) * 30);
    dueDates.push(dueDate.toLocaleDateString());
  }

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
        <div className="mb-3"><strong>Full Name:</strong> {student.fullName}</div>
        <div className="mb-3"><strong>Roll Number:</strong> {student.rollNumber}</div>
        <div className="mb-3"><strong>Mobile Number:</strong> {student.mobileNumber}</div>
        <div className="mb-3"><strong>Course Name:</strong> {student.courseName}</div>
        <div className="mb-3"><strong>Total Fee:</strong> ₹{student.totalFee}</div>
        <div className="mb-3"><strong>Payment Received:</strong> ₹{student.paymentReceived}</div>
        <div className="mb-3"><strong>Remaining Fee:</strong> ₹{remainingFee}</div>
        <div className="mb-3"><strong>Installments:</strong> {student.installments}</div>
        <div className="mb-3"><strong>Installment Amount:</strong> ₹{installmentAmount}</div>
        <div className="mb-3">
          <strong>Due Dates:</strong>
          <ul>
            {dueDates.map((date, index) => (
              <li key={index}>Installment {index + 1}: {date}</li>
            ))}
          </ul>
        </div>
        {!allInstallmentsCompleted && (
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
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Processing...' : 'Add Payment'}
            </button>
          </div>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Installment Status:</h2>
          <ul>
            {student.installmentsStatus && student.installmentsStatus.map((status, index) => (
              <li key={index} className={status === 'Completed' ? 'text-green-600' : 'text-red-600'}>
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
