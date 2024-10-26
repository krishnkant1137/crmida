import React from 'react';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleSeeAllSectionsClick = () => {
    navigate("/AdminDashboard/SeeAllSections");
  };

  const handleRevenueClick = () => {
    navigate("/AdminDashboard/RevenueChart");
  };

  const handleRevenue2Click = () => {
    navigate("/AdminDashboard/RevenueLineChart");
  };

  const handleAddFacultyClick = () => {
    navigate("/AdminDashboard/AddFaculty"); // Adjust based on actual route for adding faculty
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-20 rounded-lg bg-gradient-to-tr from-gray-100 to-gray-300 shadow-lg transition-all transform duration-300 hover:scale-105">
      <h1 className="text-5xl font-bold mb-10 text-center text-blue-900 animate-fadeIn">
        Welcome to Admin Dashboard
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <button
          onClick={handleSeeAllSectionsClick}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:bg-blue-700 hover:-translate-y-1 hover:scale-105 shadow-lg w-full sm:w-48"
        >
          See All Sections
        </button>
        <button
          onClick={handleRevenueClick}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:bg-blue-700 hover:-translate-y-1 hover:scale-105 shadow-lg w-full sm:w-48"
        >
          Revenue
        </button>
        <button
          onClick={handleRevenue2Click}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:bg-blue-700 hover:-translate-y-1 hover:scale-105 shadow-lg w-full sm:w-48"
        >
          Revenue 2
        </button>
        <button
          onClick={handleAddFacultyClick}
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:bg-green-700 hover:-translate-y-1 hover:scale-105 shadow-lg w-full sm:w-48"
        >
          Add Faculty
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:bg-red-600 hover:-translate-y-1 hover:scale-105 shadow-lg w-full sm:w-48"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
