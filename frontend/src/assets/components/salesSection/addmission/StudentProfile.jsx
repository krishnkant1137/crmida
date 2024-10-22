import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { rollNumber } = useParams(); // Use rollNumber instead of studentId
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
        const response = await axios.get(`http://3.145.137.229:5000/api/admissions/${rollNumber}`);
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
  }, [rollNumber]);

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

  const addPayment =async () => { 
    try { 
      await axios.patch(`http://3.145.137.229:5000/api/student-payments/${rollNumber}`,
         { amountPaid: Number(newPayment), });
         setNotification('Payment added successfully!'); setNewPayment(''); 
        const response = await axios.get(`http://3.145.137.229:5000/api/admissions/${rollNumber}`); setStudent(response.data); updateInstallments(response.data.totalFee - response.data.paymentReceived, response.data.installments); } catch (error) { console.error('Error adding payment:', error); setNotification('Failed to add payment. Please try again later.'); } };

    if (loading) return <div>Loading...</div>;
    
    if (!student) return <div>No student found.</div>;
    
    return ( 
    <div> 
    <h1>{student.fullName}s Profile</h1>
     <p>Roll Number: {student.rollNumber}</p> 
     <p>Total Fee: {student.totalFee}</p>
      <p>Amount Paid: {student.paymentReceived}</p>
       <p>Remaining Amount: {student.totalFee - student.paymentReceived}</p>
        <h2>Installments</h2> 
        <ul> {installments.map((installment) => ( <li key={installment.installmentNumber}> Installment {installment.installmentNumber}: {installment.amount} due on {installment.dueDate}
         </li> ))} 
        </ul>
        <input
    type="text"
    value={newPayment}
    onChange={handlePaymentChange}
    placeholder="Enter payment amount"
  />
  <button onClick={addPayment}>Add Payment</button>
  {notification && <p>{notification}</p>}
  <button onClick={handleBack}>Back</button>
</div>

); };

export default StudentProfile;
