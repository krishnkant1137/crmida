import React, { useState } from 'react';

const StudentStatus = ({ student, onClose }) => {
  const [companies, setCompanies] = useState([
    // Initial mock data for demonstration
    { name: 'Company A', position: 'Software Engineer', package: '6 LPA', status: 'Selected' },
    { name: 'Company B', position: 'Data Analyst', package: '5 LPA', status: 'Rejected' },
  ]);
  
  const [newCompany, setNewCompany] = useState({ name: '', position: '', package: '', status: '' });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [companyToRemove, setCompanyToRemove] = useState(null);

  const handleAddCompany = () => {
    if (newCompany.name && newCompany.position && newCompany.package) {
      setCompanies([...companies, newCompany]);
      setNewCompany({ name: '', position: '', package: '', status: '' }); // Reset form
    }
  };

  const handleStatusChange = (index, value) => {
    const updatedCompanies = [...companies];
    updatedCompanies[index].status = value;
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
    }
    setShowConfirmation(false);
    setCompanyToRemove(null);
  };

  const cancelRemoveCompany = () => {
    setShowConfirmation(false);
    setCompanyToRemove(null);
  };

  return (
    <div className="fixed inset-0 bg-white p-4 overflow-auto pt-20">
      <div className="w-full max-w-4xl mx-auto mt-5 p-4 border border-gray-300 rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Student Profile</h2>
        <button
          onClick={onClose}
          className="mb-2 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
        >
          Close
        </button>
        <div>
          <img
            src={student.profileImage}
            alt={student.name}
            className="w-24 h-24 rounded-full mb-2"
          />
          <h3 className="text-lg font-semibold">{student.name}</h3>
          <p>
            <strong>Roll No:</strong> {student.id}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Mobile:</strong> {student.mobileNumber}
          </p>
          <p>
            <strong>Course:</strong> {student.course}
          </p>
        </div>

        {/* Companies Section */}
        <h3 className="text-lg font-semibold mt-4">Companies</h3>
        <table className="min-w-full mt-2 border border-gray-300">
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
                    company.status // Display the selected status
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
                    className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Confirmation Popup */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-semibold">Are you sure you want to remove this company?</h4>
              <div className="mt-4">
                <button
                  onClick={confirmRemoveCompany}
                  className="bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700 mr-2"
                >
                  Confirm
                </button>
                <button
                  onClick={cancelRemoveCompany}
                  className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Company Form */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Add New Company</h4>
          <input
            type="text"
            placeholder="Company Name"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
            className="border border-gray-300 p-1 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Position"
            value={newCompany.position}
            onChange={(e) => setNewCompany({ ...newCompany, position: e.target.value })}
            className="border border-gray-300 p-1 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Package"
            value={newCompany.package}
            onChange={(e) => setNewCompany({ ...newCompany, package: e.target.value })}
            className="border border-gray-300 p-1 rounded w-full mb-2"
          />
          <button
            onClick={handleAddCompany}
            className="bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-700"
          >
            Add Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentStatus;
