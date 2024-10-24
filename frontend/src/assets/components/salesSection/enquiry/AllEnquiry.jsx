import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllEnquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://3.145.137.229:5000/api/enquiry');
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      alert('Error fetching enquiries');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="mt-8 pt-20">
      <h1 className="text-center text-5xl font-bold text-blue-800">All Enquiries</h1>
      <div className="flex justify-start mt-4">
        <button
          onClick={() => navigate('/salesDashboard')}
          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Back
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border-collapse mx-auto">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2 border text-center">S.No.</th>
              <th className="px-4 py-2 border text-center">Date</th>
              <th className="px-4 py-2 border text-center">Name</th>
              <th className="px-4 py-2 border text-center">Number</th>
              <th className="px-4 py-2 border text-center">Course</th>
              <th className="px-4 py-2 border text-center">Response</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length > 0 ? (
              enquiries.map((enquiry, index) => (
                <tr key={enquiry._id} className="bg-white hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">{formatDate(enquiry.enquiryDate)}</td>
                  <td className="px-4 py-2 border text-center">{enquiry.fullName}</td>
                  <td className="px-4 py-2 border text-center">{enquiry.mobileNumber}</td>
                  <td className="px-4 py-2 border text-center">{enquiry.courseName}</td>
                  <td className="px-4 py-2 border text-center">{enquiry.response || 'No Response'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No Enquiries Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEnquiry;
