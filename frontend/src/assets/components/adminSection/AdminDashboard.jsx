import React from 'react';
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleSeeAllSectionnClick = () => {
    navigate("/AdminDashboard/SeeAllSections");
  };

  const handleRevenueClick = () => {
    navigate("/AdminDashboard/RevenueChart"); 
  };

  const handleRevenue2Click = () => {
    navigate(`/AdminDashboard/RevenueLineChart`); 
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/'); // Adjusted to match the correct path
  };

  return (
    <div className="max-w-6xl mx-auto p-8 mt-20 rounded-lg bg-gradient-to-tl from-gray-50 to-gray-200">
      <h1 className="text-5xl font-bold mb-10 text-center text-blue-900">
        Welcome to Admin Dashboard
      </h1>

      <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mt-4 space-y-4 sm:space-y-0"> {/* Responsive layout */}
        <button
          onClick={handleSeeAllSectionnClick}
          className="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 hover:bg-blue-700 w-48 h-12"
        >
          See All Sections
        </button>
        <button
          onClick={handleRevenueClick}
          className="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 hover:bg-blue-700 w-48 h-12"
        >
          Revenue
        </button>
        <button
          onClick={handleRevenue2Click}
          className="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 hover:bg-blue-700 w-48 h-12"
        >
          Revenue2
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-3 px-4 rounded-lg transition duration-300 hover:bg-red-600 w-48 h-12"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
