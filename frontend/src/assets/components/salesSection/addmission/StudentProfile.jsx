import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { studentId } = useParams();
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
        const response = await axios.get(`${process.env.VITE_BASE_URL}/api/enrolled-students/${studentId}`);
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
  }, [studentId]);

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
    const paymentAmount = parseFloat(newPayment);

    if (paymentAmount <= 0 || isNaN(paymentAmount)) {
      alert('Please enter a valid payment amount greater than zero.');
      return;
    }

    try {
      const response = await axios.patch(
        `${process.env.VITE_BASE_URL}/api/enrolled-students/${studentId}`,
        {  amountPaid: paymentAmount,
           }
      );

      if (response.data && response.data.student) {
        setStudent(response.data.student);
        setNewPayment('');
        setNotification(`Payment of ₹${paymentAmount} has been recorded successfully!`);
        updateInstallments(response.data.remainingAmount, response.data.installments);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error updating payment:', error.response ? error.response.data : error);
      alert('Error updating payment: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading student information...</div>;
  }

  if (!student) {
    return <div className="text-center py-4">Student information not available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-blue-100 shadow-lg rounded-xl mt-14 p-6 pt-20">
      <button onClick={handleBack} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-transform transform hover:scale-105 mb-4">
        Back
      </button>
      <h2 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Student Profile</h2>

      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4 shadow-md">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{notification}</span>
          <button onClick={() => setNotification('')} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M10 9l-5 5 1 1 4-4 4 4 1-1-5-5z" />
            </svg>
          </button>
        </div>
      )}

      <div className="flex items-center space-x-6 mb-6">
        <img src={student.passportPhoto || 'https://via.placeholder.com/150'} alt={`${student.fullName}'s profile`} className="w-28 h-28 rounded-full shadow-md border border-gray-300" />
        <div className="text-xl">
          <h3 className="font-bold text-blue-700">{student.fullName}</h3>
          <p className="text-gray-600">Roll Number: <span className="font-medium">{student.rollNumber}</span></p>
          <p className="text-gray-600">Course: <span className="font-medium">{student.courseName}</span></p>
        </div>
      </div>

      <table className="w-full bg-white rounded-lg shadow-md mb-6">
        <tbody>
          <tr className="bg-gray-200">
            <td className="p-4 font-semibold">Total Fee</td>
            <td className="p-4">₹{student.totalFee}</td>
          </tr>
          <tr className="bg-gray-100">
            <td className="p-4 font-semibold">Payment Received</td>
            <td className="p-4">₹{student.paymentReceived}</td>
          </tr>
          <tr className="bg-gray-200">
            <td className="p-4 font-semibold">Remaining Amount</td>
            <td className="p-4">₹{student.totalFee - student.paymentReceived}</td>
          </tr>
        </tbody>
      </table>

      <div className="mb-6">
        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="newPayment">
          Add Payment:
        </label>
        <div className="flex">
          <input
            id="newPayment"
            type="number"
            value={newPayment}
            onChange={handlePaymentChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter payment amount"
          />
          <button onClick={addPayment} className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-transform transform hover:scale-105">
            Add Payment
          </button>
        </div>
      </div>

      {installments.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Installment Details:</h4>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 font-semibold">Installment #</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {installments.map((installment, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                  <td className="p-4">{installment.installmentNumber}</td>
                  <td className="p-4">₹{installment.amount}</td>
                  <td className="p-4">{installment.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
