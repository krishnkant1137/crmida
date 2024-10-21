import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const SeeAllSections = () => {
  const navigate = useNavigate(); // Initialize navigate

  // List of all sections available for the admin
  const sections = [
    { name: 'Sales Section', path: '/salesDashboard' },
    { name: 'Faculties Section', path: '/facultiesDashboard' },
    { name: 'HR Section', path: '/HRDashboard' },
    { name: 'Student Enquiry', path: '/sales/student-enquiry' },
    { name: 'All Enquiries', path: '/sales/all-enquiry' },
    { name: 'Demo Section', path: '/sales/demo' },
    { name: 'All Demos', path: '/sales/all-demo' },
    { name: 'Enrolled Students', path: '/sales/enrolled-students' },
    { name: 'All Enrolled Students', path: '/sales/all-enrolled-students' },
    { name: 'Revenue', path: '/admin/revenue' },
    { name: 'Revenue2 (Line Chart)', path: '/admin/revenue2' }, // Added the Revenue2 section
  ];

  const handleBackButtonClick = () => {
    navigate('/adminDashboard'); // Navigate to the Admin Dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="absolute top-4 left-4 mt-20 ml-20"> {/* Added margin top to the back button */}
        <button
          onClick={handleBackButtonClick}
          className="bg-blue-500 text-black px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Back
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-8 text-blue-600">All Sections</h1> {/* Changed heading color to blue */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dynamically generate section links */}
        {sections.map((section, index) => (
          <Link
            key={index}
            to={section.path}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg shadow hover:bg-blue-600 transition duration-300 text-center"
          >
            {section.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SeeAllSections;
