import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EnquiryForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    enquiryDate: "",
    fullName: "",
    mobileNumber: "",
    email: "",
    address: "",
    collegeName: "",
    stream: "",
    passingYear: "",
    courseName: "",
    otherCourse: "",
    source: "",
    otherSource: "",
  });

  const [showOtherCourse, setShowOtherCourse] = useState(false);
  const [showOtherSource, setShowOtherSource] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "courseName" && value === "Other") {
      setShowOtherCourse(true);
    } else if (name === "source" && value === "Other") {
      setShowOtherSource(true);
    } else {
      setShowOtherCourse(false);
      setShowOtherSource(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedData = { ...formData, enquiryDate: new Date() };
      await axios.post("http://localhost:5000/api/enquiry", formattedData);

      setLoading(false);
      setSuccessMessage(true);

      // Hide form and show success message for 3 seconds, then navigate back
      setTimeout(() => {
        setSuccessMessage(false);
        navigate('/salesDashboard');
      }, 3000);

      // Reset form data
      setFormData({
        enquiryDate: "",
        fullName: "",
        mobileNumber: "",
        email: "",
        address: "",
        collegeName: "",
        stream: "",
        passingYear: "",
        courseName: "",
        otherCourse: "",
        source: "",
        otherSource: "",
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Error submitting enquiry");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <button
          onClick={() => navigate('/salesDashboard')}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
        >
          Back
        </button>
        
        {successMessage ? (
          <div className="flex flex-col items-center justify-center h-32">
            <div className="animate-spin rounded-full border-t-2 border-blue-600 w-16 h-16 mb-2"></div>
            <div className="text-lg font-semibold">Submitted Successfully</div>
          </div>
        ) : (
          <>
            <h2 className="text-center text-3xl font-bold text-gray-800">Student Enquiry Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Enquiry Date</label>
                <input
                  type="date"
                  name="enquiryDate"
                  value={formData.enquiryDate}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">College Name</label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="College Name"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stream</label>
                  <input
                    type="text"
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    placeholder="Stream"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passing Year</label>
                <input
                  type="text"
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleChange}
                  placeholder="Passing Year"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Course Name</label>
                <select
                  name="courseName"
                  value={formData.courseName}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="Business Analytics">Business Analytics</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Java Full Stack">Java Full Stack</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="React Development">React Development</option>
                  <option value="Python Development">Python Development</option>
                  <option value="Salesforce">Salesforce</option>
                  <option value="Software Testing">Software Testing</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="DSA">DSA</option>
                  <option value="Regarding Internship">Regarding Internship</option>
                  <option value="Regarding Placement">Regarding Placement</option>
                  <option value="Other">Other</option>
                </select>
                {showOtherCourse && (
                  <input
                    type="text"
                    name="otherCourse"
                    value={formData.otherCourse}
                    onChange={handleChange}
                    placeholder="Please specify the course"
                    className="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Source</label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Word of Mouth">Word of Mouth</option>
                  <option value="Website">Website</option>
                  <option value="Other">Other</option>
                </select>
                {showOtherSource && (
                  <input
                    type="text"
                    name="otherSource"
                    value={formData.otherSource}
                    onChange={handleChange}
                    placeholder="Please specify the source"
                    className="mt-2 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;
