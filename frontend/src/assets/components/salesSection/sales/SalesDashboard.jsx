import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sales = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove the token
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="mt-20"> {/* Margin to place below the navbar */}
      <h1
        className="text-center text-5xl font-extrabold text-blue-800 mb-8"
        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }} // Inline text shadow
      >
        Sales Dashboard
      </h1>
      <div className="flex flex-wrap justify-center gap-4"> {/* Use gap for spacing between buttons */}
        <Link
          to="/sales/student-enquiry"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Student Enquiry Section
        </Link>
        <Link
          to="/sales/search-student"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Search Student
        </Link>
        <Link
          to="/sales/all-enquiry"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          All Enquiry Section
        </Link>
        <Link
          to="/sales/demo"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Demo
        </Link>
        <Link
          to="/sales/all-demo"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          All Demo
        </Link>
        <Link
          to="/sales/enrolled-students"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          Enrolled Students
        </Link>
        <Link
          to="/sales/all-enrolled-students"
          className="bg-blue-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          See All Enrolled Students
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-4 rounded-lg shadow-lg w-60 h-12 flex items-center justify-center hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sales;
