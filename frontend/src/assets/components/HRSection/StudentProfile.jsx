import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentStatus = ({ student, onClose }) => {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState({ name: '', position: '', package: '', status: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [companyToRemove, setCompanyToRemove] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch companies for the student from the backend
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`/api/student/${student.id}/companies`); // Adjust endpoint as needed
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Fetch companies when the component mounts
  useEffect(() => {
    fetchCompanies();
  }, [student.id]);

  const handleAddCompany = () => {
    if (newCompany.name && newCompany.position && newCompany.package) {
      setCompanies([...companies, newCompany]);
      setNewCompany({ name: '', position: '', package: '', status: '' });
    }
  };

  const handleStatusChange = (index, value) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index].status = value;

    if (value === 'Selected') {
      setSelectedCompany(updatedCompanies[index].name);
    } else {
      if (selectedCompany === updatedCompanies[index].name) {
        setSelectedCompany(null);
      }
    }

    setCompanies(updatedCompanies);
  };

  const handleRemoveCompany = (index) => {
    setShowConfirmation(true);
    setCompanyToRemove(index);
  };

  const confirmRemoveCompany = () => {
    if (companyToRemove !== null) {
      const updatedCompanies = companies.filter((_, index) => index !== companyToRemove);
      setCompanies(updatedCompanies);

      if (selectedCompany === updatedCompanies[companyToRemove]?.name) {
        setSelectedCompany(null);
      }
    }
    setShowConfirmation(false);
    setCompanyToRemove(null);
  };

  const cancelRemoveCompany = () => {
    setShowConfirmation(false);
    setCompanyToRemove(null);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 p-4 overflow-auto pt-20">
      <div className="w-full max-w-4xl mx-auto mt-5 p-6 bg-white shadow-md rounded-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
        >
          Close
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Student Profile</h2>

        {/* Student Profile Section */}
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={student.passportPhoto}
            alt={student.fullName}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-blue-600 mb-4 md:mb-0 md:mr-5"
          />
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold">{student.fullName}</h3>
            <p className="text-sm"><strong>Roll No:</strong> {student.rollNumber}</p>
            <p className="text-sm"><strong>Email:</strong> {student.email}</p>
            <p className="text-sm"><strong>Mobile:</strong> {student.mobileNumber}</p>
            <p className="text-sm"><strong>Course:</strong> {student.course}</p>
          </div>

          {/* Selected Company Display */}
          {selectedCompany && (
            <div className="mt-4 md:mt-0 md:ml-6 text-green-600">
              <h4 className="text-lg font-bold">Selected:</h4>
              <p className="text-md">{selectedCompany}</p>
            </div>
          )}
        </div>

        {/* Companies Section */}
        <h3 className="text-lg font-semibold mt-4 text-center">Companies</h3>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full bg-white border border-gray-300 text-center rounded-lg shadow">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Company Name</th>
                <th className="border border-gray-300 p-2">Position</th>
                <th className="border border-gray-300 p-2">Package</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{company.name}</td>
                  <td className="border border-gray-300 p-2">{company.position}</td>
                  <td className="border border-gray-300 p-2">{company.package}</td>
                  <td className="border border-gray-300 p-2">
                    {company.status === 'Selected' || company.status === 'Rejected' ? (
                      <span className="font-bold">{company.status}</span>
                    ) : (
                      <select
                        value={company.status}
                        onChange={(e) => handleStatusChange(index, e.target.value)}
                        className="border border-gray-300 p-1 rounded"
                      >
                        <option value="">Select Status</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      onClick={() => handleRemoveCompany(index)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <h4 className="text-lg font-semibold">Are you sure you want to remove this company?</h4>
              <div className="mt-4">
                <button
                  onClick={confirmRemoveCompany}
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelRemoveCompany}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Company Form */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-center">Add New Company</h4>
          <div className="flex flex-col mb-2">
            <input
              type="text"
              placeholder="Company Name"
              value={newCompany.name}
              onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
              className="border border-gray-300 p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Position"
              value={newCompany.position}
              onChange={(e) => setNewCompany({ ...newCompany, position: e.target.value })}
              className="border border-gray-300 p-2 rounded mb-2"
            />
            <input
              type="text"
              placeholder="Package"
              value={newCompany.package}
              onChange={(e) => setNewCompany({ ...newCompany, package: e.target.value })}
              className="border border-gray-300 p-2 rounded mb-2"
            />
          </div>
          <button
            onClick={handleAddCompany}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
          >
            Add Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentStatus;
