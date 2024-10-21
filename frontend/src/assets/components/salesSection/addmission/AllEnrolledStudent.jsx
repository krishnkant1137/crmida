import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllEnrolledStudents = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/enrolled-students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching enrolled students:', error);
      });
  }, []);

  const handleViewProfile = (studentId) => {
    navigate(`/students/${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 p-6 pt-24">
      <button
        onClick={() => navigate('/salesDashboard')}
        className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 mb-6"
      >
        Back
      </button>
      <h1 className="text-center text-5xl font-extrabold text-blue-900 mb-10">All Enrolled Students</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.length > 0 ? (
          students.map((student, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={student.passportPhoto || 'https://via.placeholder.com/100'} // Display the profile photo or a placeholder if not available
                  alt={`${student.fullName}'s profile`}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-800">{student.fullName}</h2>
              </div>
              <p className="text-gray-600">Admission Date: <span className="font-medium">{new Date(student.admissionDate).toLocaleDateString()}</span></p>
              <p className="text-gray-600">Roll Number: <span className="font-medium">{student.rollNumber}</span></p>
              <p className="text-gray-600">Email: <span className="font-medium">{student.email}</span></p>
              <p className="text-gray-600">Phone: <span className="font-medium">{student.mobileNumber}</span></p>
              <p className="text-gray-600">Course: <span className="font-medium">{student.courseName}</span></p>
              <button 
                onClick={() => handleViewProfile(student._id)} 
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-full">No enrolled students found.</p>
        )}
      </div>
    </div>
  );
};

export default AllEnrolledStudents;
