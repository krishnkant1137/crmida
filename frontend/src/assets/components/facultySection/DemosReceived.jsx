import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DemosReceived = () => {
  const [demoList, setDemoList] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

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
          isCompleted: false
        }
      ];
      setDemoList(demos);
    };

    fetchDemos();
  }, []);

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };

  // Function to handle "Mark as Complete" button click
  const markAsComplete = (id) => {
    setDemoList((prevList) =>
      prevList.map((demo) =>
        demo.id === id ? { ...demo, isCompleted: true } : demo
      )
    );
  };

  // Function to handle "Remove Student" button click
  const removeStudent = (id) => {
    setDemoList((prevList) => prevList.filter((demo) => demo.id !== id));
  };

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

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 bg-gray-50 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Student Name</th>
              <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Phone Number</th>
              <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Course</th>
              <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Demo Date</th>
              <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Batch Time</th>
              <th className="px-6 py-4 text-left text-md font-semibold border-b border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demoList.length > 0 ? (
              demoList.map((demo) => (
                <tr key={demo.id} className="border-b border-gray-300 bg-white hover:bg-gray-100 transition duration-200">
                  <td className="px-6 py-4 text-gray-800">{demo.studentName}</td>
                  <td className="px-6 py-4 text-gray-800">{demo.phoneNumber}</td>
                  <td className="px-6 py-4 text-gray-800">{demo.courseName}</td>
                  <td className="px-6 py-4 text-gray-800">{demo.demoDate}</td>
                  <td className="px-6 py-4 text-gray-800">{demo.batchTime}</td>
                  <td className="px-6 py-4 text-gray-800 space-x-4">
                    {!demo.isCompleted ? (
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
                      onClick={() => removeStudent(demo.id)}
                      className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">No demos received yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DemosReceived;
