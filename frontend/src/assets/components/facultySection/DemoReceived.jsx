import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DemosReceived = () => {
  const [pendingDemos, setPendingDemos] = useState([]);
  const [completedDemos, setCompletedDemos] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDemos = async () => {
      try {
        const response = await axios.get('http://3.145.137.229:5000/api/demo?facultyName=Shubham Sir');
        const demos = response.data;

        const pending = demos.filter((demo) => !demo.isCompleted);
        const completed = demos.filter((demo) => demo.isCompleted);

        setPendingDemos(pending);
        setCompletedDemos(completed);
      } catch (error) {
        console.error('Error fetching demo data:', error);
      }
    };

    fetchDemos();
  }, []);

  const handleBackClick = () => {
    navigate('/facultiesDashboard');
  };

  const markAsComplete = async (id) => {
    // Find the demo that is being marked as complete
    const demoToComplete = pendingDemos.find(demo => demo._id === id);
    
    if (demoToComplete) {
      // Immediately update the state
      setPendingDemos(prev => prev.filter(demo => demo._id !== id));
      const updatedDemo = { ...demoToComplete, isCompleted: true }; // Include isCompleted field
  
      setCompletedDemos(prev => [...prev, updatedDemo]);
  
      try {
        await axios.put(`http://3.145.137.229:5000/api/demo/${id}`, { isCompleted: true });
      } catch (error) {
        console.error('Error marking demo as complete:', error);
        // Optionally, you can revert the state update if the request fails
        setPendingDemos(prev => [...prev, demoToComplete]);
        setCompletedDemos(prev => prev.filter(demo => demo._id !== id));
      }
    }
  };
  

  const removeDemo = async (id, isPending) => {
    try {
      await axios.delete(`http://3.145.137.229:5000/api/demo/${id}`);
      if (isPending) {
        setPendingDemos((prev) => prev.filter((demo) => demo._id !== id));
      } else {
        setCompletedDemos((prev) => prev.filter((demo) => demo._id !== id));
      }
    } catch (error) {
      console.error('Error removing demo:', error);
    }
  };

  const renderTableRows = (demos, isPending) =>
    demos.map((demo, index) => (
      <tr key={demo._id} className="border-t border-gray-300">
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{index + 1}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.name}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.number}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.course}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{demo.time}</td>
        <td className="px-6 py-4 text-gray-800 border-r border-gray-300">{new Date(demo.createdAt).toLocaleDateString()}</td> {/* Format the date */}
        <td className="px-6 py-4 text-gray-800 space-x-4">
          {isPending ? (
            <button
              onClick={() => markAsComplete(demo._id)}
              className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300"
            >
              Mark as Complete
            </button>
          ) : (
            <span className="text-green-600 font-semibold">Completed Demo</span>
          )}
          <button
            onClick={() => removeDemo(demo._id, isPending)}
            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
          >
            Remove
          </button>
        </td>
      </tr>
    ));

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-lg min-h-screen mt-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Demos Received (Shubham Sir)</h1>
      
      <div className="mb-6 flex justify-start">
        <button
          onClick={handleBackClick}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Back
        </button>
      </div>

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

      {activeTab === 'pending' ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Demos</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-gray-50 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">S. No.</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Student Name</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Phone Number</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Course</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Time</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Date</th> {/* New date header */}
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderTableRows(pendingDemos, true)}
              </tbody>
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
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">S. No.</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Student Name</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Phone Number</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Course</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Time</th>
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Date</th> {/* New date header */}
                  <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {renderTableRows(completedDemos, false)}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemosReceived;
