import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StudentProfile from './StudentProfile';
import { useNavigate } from 'react-router-dom';

const HRDashboard = () => {
  const navigate = useNavigate();
  
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [courses, setCourses] = useState([
    "Business Analytics",
    "Data Analytics",
    "Data Science",
    "Java Full Stack",
    "MERN Stack",
    "React Development",
    "Python Development",
    "Salesforce",
    "Software Testing",
    "Digital Marketing",
    "DSA",
  ]);
  const [selectedCourse, setSelectedCourse] = useState('Sale'); // Default course

  // Function to fetch students from the API
  const fetchStudents = async () => {
    try {
      const response = await axios.get('/api/hrStudent'); // Use the correct endpoint
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Function to fetch courses from the API
  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses'); // Replace with your actual endpoint
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Fetch students and courses when the component mounts
  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  // Filter students based on selected course
  const filteredStudents = selectedCourse === 'Sale'
    ? students // Show all students if 'Sale' is selected
    : students.filter(student => student.courseName === selectedCourse);

  // Handle view profile action
  const handleViewProfile = (student) => {
    setSelectedStudent(student);
  };

  // Handle close profile action
  const handleCloseProfile = () => {
    setSelectedStudent(null);
  };

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen pt-20">
      {/* Sidebar for course selection */}
      <div className="w-1/4 bg-white shadow-lg p-6 h-screen">
        <h2 className="text-2xl font-semibold mb-4 text-center">Select Course</h2>
        <select 
          value={selectedCourse} 
          onChange={(e) => setSelectedCourse(e.target.value)} 
          className="p-2 border border-gray-300 rounded w-full mb-6 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-200 w-full"
        >
          Logout
        </button>
      </div>

      <div className="w-3/4 p-6">
        {/* Check if filtered students array is empty */}
        {filteredStudents.length === 0 ? (
          <p className="text-center mt-4 text-xl font-medium">No students found for the selected course.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div key={student.rollNumber} className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <img src={student.passportPhoto} alt={`${student.fullName} Profile`} className="h-32 w-32 rounded-full mx-auto mb-3 border-4 border-blue-500" />
                <h3 className="text-xl font-semibold text-center mb-1">{student.fullName}</h3>
                <p className="text-center text-gray-600">Roll No: {student.rollNumber}</p>
                <p className="text-center text-gray-600">Mobile: {student.mobileNumber}</p>
                <button
                  onClick={() => handleViewProfile(student)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200 w-full"
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Render StudentProfile when a student is selected */}
        {selectedStudent && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <StudentProfile student={selectedStudent} onClose={handleCloseProfile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRDashboard;