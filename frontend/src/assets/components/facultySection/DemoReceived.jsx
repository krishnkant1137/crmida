import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DemosReceived = () => {
  const [pendingDemos, setPendingDemos] = useState([]);
  const [completedDemos, setCompletedDemos] = useState([]);
  const [activeTab, setActiveTab] = useState('pending'); // State to toggle between pending and completed demos
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching demo list from an API
    const fetchDemos = async () => {
      const demos = [
        {
          id: 1,
          studentName: 'John Doe',
          phoneNumber: '123-456-7890',
          courseName: 'React Basics',
          demoDate: '2024-11-05',
          batchTime: '10:00 AM - 12:00 PM',
          isCompleted: false
        },
        {
          id: 2,
          studentName: 'Jane Doe',
          phoneNumber: '987-654-3210',
          courseName: 'Node.js Advanced',
          demoDate: '2024-11-06',
          batchTime: '2:00 PM - 4:00 PM',
          isCompleted: false
        },
        {
          id: 3,
          studentName: 'Alice Smith',
          phoneNumber: '456-789-1234',
          courseName: 'JavaScript Essentials',
          demoDate: '2024-11-07',
          batchTime: '4:00 PM - 6:00 PM',
          isCompleted: true
        }
      ];

      // Split demos into pending and completed based on `isCompleted`
      const pending = demos.filter((demo) => !demo.isCompleted);
      const completed = demos.filter((demo) => demo.isCompleted);

      setPendingDemos(pending);
      setCompletedDemos(completed);
    };

    fetchDemos();
  }, []);

  const handleBackClick = () => {
    navigate("/facultiesDashboard"); // Navigate back to the previous page
  };

  // Function to handle "Mark as Complete" button click
  const markAsComplete = (id) => {
    const demoToComplete = pendingDemos.find((demo) => demo.id === id);
    if (demoToComplete) {
      setPendingDemos(pendingDemos.filter((demo) => demo.id !== id));
      setCompletedDemos([...completedDemos, { ...demoToComplete, isCompleted: true }]);
    }
  };

  // Function to handle "Remove Student" button click
  const removeStudent = (id, isPending) => {
    if (isPending) {
      setPendingDemos(pendingDemos.filter((demo) => demo.id !== id));
    } else {
      setCompletedDemos(completedDemos.filter((demo) => demo.id !== id));
    }
  };

  // Updated renderTableRows with Serial Number (S. No.)
  const renderTableRows = (demos, isPending) =>
    demos.map((demo, index) => (
      <tr key={demo.id} className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{index + 1}</td> {/* Serial Number */}
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.studentName}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.phoneNumber}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.courseName}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.demoDate}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.batchTime}</td>
        <td className="px-6 py-4 text-gray-800 space-x-4">
          {isPending ? (
            <button
              onClick={() => markAsComplete(demo.id)}
              className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              Mark as Complete
            </button>
          ) : (
            <span className="text-green-600 font-semibold">Completed Demo</span>
          )}
          <button
            onClick={() => removeStudent(demo.id, isPending)}
            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
          >
            Remove
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg min-h-screen mt-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Demos Received</h1>

      {/* Back Button */}
      <div className="mb-6 flex justify-start">
        <button
          onClick={handleBackClick}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Back
        </button>
      </div>

      {/* Toggle Buttons for Pending and Completed */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setActiveTab('pending')}
          className={`py-2 px-6 rounded-md text-white transition duration-300 ${activeTab === 'pending' ? 'bg-purple-600' : 'bg-gray-600 hover:bg-purple-500'}`}
        >
          Pending Demos
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`py-2 px-6 rounded-md text-white transition duration-300 ${activeTab === 'completed' ? 'bg-purple-600' : 'bg-gray-600 hover:bg-purple-500'}`}
        >
          Completed Demos
        </button>
      </div>

      {/* Conditionally Render Tables */}
      {activeTab === 'pending' ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Demos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">S. No.</th> {/* Serial No. Column Header */}
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Student Name</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Phone Number</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Course</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Demo Date</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Batch Time</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>{pendingDemos.length > 0 ? renderTableRows(pendingDemos, true) : <tr><td colSpan="7" className="text-center py-4 text-gray-600">No pending demos.</td></tr>}</tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Completed Demos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">S. No.</th> {/* Serial No. Column Header */}
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Student Name</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Phone Number</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Course</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Demo Date</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Batch Time</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>{completedDemos.length > 0 ? renderTableRows(completedDemos, false) : <tr><td colSpan="7" className="text-center py-4 text-gray-600">No completed demos.</td></tr>}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemosReceived;