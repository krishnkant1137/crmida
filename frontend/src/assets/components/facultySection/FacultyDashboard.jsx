import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Access the location object
  const { selectedBatch } = location.state || {}; // Get selectedBatch from state

  const handleBatchesClick = () => {
    navigate("/facultiesDashboard/batch");
  };

  const handleAttendanceClick = () => {
    navigate("/facultiesDashboard/attendance"); 
  };

  const handlePerformanceClick = () => {
    navigate(`/facultiesDashboard/performance`); 
  };

  // const handleProfileClick = () => {
  //   alert("Profile section is under development.");
  // };

  const handleResourceSharingClick = () => {
    navigate("/facultiesDashboard/resourceSharing"); 
  };

  const handleMyStudentDemoClick = () => {
    navigate("/facultiesDashboard/demosReceived"); 
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto p-8 rounded-lg bg-gradient-to-tr from-gray-50 to-gray-200 min-h-screen pt-20">
      <h1 className="text-5xl font-extrabold mb-10 text-center text-blue-900 animate-fadeIn">
        Welcome to Faculty Dashboard
      </h1>

      <div className="flex flex-wrap justify-center space-x-2 mt-4 gap-4">
        <button
          onClick={handleBatchesClick}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ease-out hover:bg-blue-700"
        >
          Batches
        </button>
        <button
          onClick={handleAttendanceClick}
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ease-out hover:bg-green-700"
        >
          Attendance
        </button>
        <button
          onClick={handlePerformanceClick}
          className="bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ease-out hover:bg-yellow-700"
        >
          Performance
        </button>
        {/* <button
          onClick={handleProfileClick}
          className="bg-purple-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ease-out hover:bg-purple-700"
        >
          Profile
        </button> */}
        <button
          onClick={handleResourceSharingClick}
          className="bg-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ease-out hover:bg-teal-700"
        >
          Resource Sharing
        </button>
        <button
          onClick={handleMyStudentDemoClick}
          className="bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-all duration-300 ease-out hover:bg-orange-700"
        >
          My Student Demo
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-out hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default FacultyDashboard;
