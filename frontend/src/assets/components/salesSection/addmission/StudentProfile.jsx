import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams(); // Use student ID instead of rollNumber
  const [student, setStudent] = useState(null);
  const [newPayment, setNewPayment] = useState('');
  const [installments, setInstallments] = useState([]);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://3.145.137.229:5000/api/admissions/${id}`); // Fetch by student ID
        const data = response.data;

        setStudent(data);
        updateInstallments(data.totalFee - data.paymentReceived, data.installments);
      } catch (error) {
        console.error('Error fetching student profile:', error);
        setNotification('Failed to load student information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const updateInstallments = (remainingAmount, installmentsCount) => {
    if (installmentsCount > 0 && remainingAmount > 0) {
      const installmentAmount = (remainingAmount / installmentsCount).toFixed(2);
      const dueDates = Array.from({ length: installmentsCount }, (_, index) => {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (30 * (index + 1)));
        return {
          installmentNumber: index + 1,
          amount: installmentAmount,
          dueDate: dueDate.toLocaleDateString(),
        };
      });
      setInstallments(dueDates);
    }
  };

  const handleBack = () => {
    navigate("/sales/all-enrolled-students");
  };

  const handlePaymentChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setNewPayment(value);
    }
  };

  const addPayment = async () => {
    try {
      await axios.post(`http://3.145.137.229:5000/api/student-payments`, { studentId: student._id, amountPaid: Number(newPayment) });
      setNotification('Payment added successfully!');
      setNewPayment('');
      
      // Refresh the student data after payment
      const response = await axios.get(`http://3.145.137.229:5000/api/admissions/${id}`);
      setStudent(response.data);
      updateInstallments(response.data.totalFee - response.data.paymentReceived, response.data.installments);
    } catch (error) {
      console.error('Error adding payment:', error);
      setNotification('Failed to add payment. Please try again later.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>No student found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 pt-24">
      <h1 className="text-3xl font-bold">{student.fullName}'s Profile</h1>
      <p><strong>Roll Number:</strong> {student.rollNumber}</p>
      <p><strong>Total Fee:</strong> {student.totalFee}</p>
      <p><strong>Amount Paid:</strong> {student.paymentReceived}</p>
      <p><strong>Remaining Amount:</strong> {student.totalFee - student.paymentReceived}</p>
      <h2 className="mt-4 text-2xl font-semibold">Installments</h2>
      <ul>
        {installments.map((installment) => (
          <li key={installment.installmentNumber}>
            Installment {installment.installmentNumber}: {installment.amount} due on {installment.dueDate}
          </li>
        ))}
      </ul>
      <input
        type="number"
        value={newPayment}
        onChange={handlePaymentChange}
        placeholder="Enter payment amount"
        className="mt-4 p-2 border rounded"
      />
      <button onClick={addPayment} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
        Add Payment
      </button>
      {notification && <p className="mt-2 text-red-500">{notification}</p>}
      <button onClick={handleBack} className="mt-4 bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition duration-300 ease-in-out">
        Back
      </button>
    </div>
  );
};

export default StudentProfile;
