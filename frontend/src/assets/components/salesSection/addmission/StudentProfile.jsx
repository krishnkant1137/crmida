import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { id } = useParams(); // Use the correct parameter for the student ID
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
        const response = await axios.get(`http://3.145.137.229:5000/api/admissions/${id}`); // Fetch student by ID
        const data = response.data;

        const amountPaid = Number(data.paymentReceived);
        const totalFee = Number(data.totalFee);
        const remainingAmount = totalFee - amountPaid;
        const installmentsCount = data.installments;

        setStudent(data);
        updateInstallments(remainingAmount, installmentsCount);
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
        dueDate.setDate(dueDate.getDate() + (30 * (index + 1))); // 30 days for each installment
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
      await axios.patch(`http://3.145.137.229:5000/api/student-payments/${id}`, { amountPaid: Number(newPayment) });
      setNotification('Payment added successfully!'); 
      setNewPayment(''); 
      
      // Fetch updated student data
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{student.fullName}'s Profile</h1>
      <p><strong>Roll Number:</strong> {student.rollNumber}</p>
      <p><strong>College:</strong> {student.college}</p>
      <p><strong>Course Name:</strong> {student.courseName}</p>
      <p><strong>Total Fee:</strong> {student.totalFee}</p>
      <p><strong>Amount Paid:</strong> {student.paymentReceived}</p>
      <p><strong>Remaining Amount:</strong> {student.totalFee - student.paymentReceived}</p>
      
      <h2 className="mt-4 font-semibold">Installments</h2> 
      <ul> 
        {installments.map((installment) => ( 
          <li key={installment.installmentNumber}> 
            Installment {installment.installmentNumber}: {installment.amount} due on {installment.dueDate}
          </li> 
        ))} 
      </ul>
      
      <input
        type="text"
        value={newPayment}
        onChange={handlePaymentChange}
        placeholder="Enter payment amount"
        className="mt-4 p-2 border rounded"
      />
      <button 
        onClick={addPayment}
        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Payment
      </button>
      {notification && <p className="text-red-500 mt-2">{notification}</p>}
      <button onClick={handleBack} className="mt-4 bg-gray-300 text-black py-2 px-4 rounded">Back</button>
    </div>
  ); 
};

export default StudentProfile;
