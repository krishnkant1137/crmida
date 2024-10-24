import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AttendancePage = () => {
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [attendanceData, setAttendanceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State for success message
  const [successMessage, setSuccessMessage] = useState(""); // State for success message content
  const [showAlreadySubmitted, setShowAlreadySubmitted] = useState(false); // State for already submitted message

  // Fetch batches when component mounts
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://3.145.137.229:5000/api/attendance");
        if (!response.ok) throw new Error("Failed to fetch batches");
        const data = await response.json();
        console.log('Fetched Batches:', data);
        setBatches(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBatches();
  }, []);

  // Handle batch selection
  const handleBatchSelect = (batchId) => {
    setSelectedBatch(batchId);
    const selectedBatchData = batches.find((batch) => batch._id === batchId);
    setStudents(selectedBatchData ? selectedBatchData.students : []);
  };

  // Handle attendance checkbox change
  const handleAttendanceChange = (studentId) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: !prev[studentId], // Toggle attendance
    }));
  };

  // Submit attendance data
  const handleSubmitAttendance = async () => {
    const presentStudents = students
      .filter((student) => attendanceData[student._id])
      .map((student) => student.rollNumber);

    const absentStudents = students
      .filter((student) => !attendanceData[student._id])
      .map((student) => student.rollNumber);

    const attendanceToSubmit = {
      batchId: selectedBatch,
      date: new Date().toLocaleDateString("en-GB").replace(/\//g, "-"),
      presentStudents,
      absentStudents,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("http://3.145.137.229:5000/api/attendance/submit-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceToSubmit),
      });

      if (response.ok) {
        setSuccessMessage("Attendance submitted successfully!"); // Set success message
        setShowSuccess(true); // Show success message
        setAttendanceData({});
        setStudents([]);
        setSelectedBatch("");
        setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
      } else if (response.status === 400) {
        // Assuming 400 status indicates already submitted attendance
        setShowAlreadySubmitted(true); // Show already submitted message
        setTimeout(() => setShowAlreadySubmitted(false), 3000); // Hide message after 3 seconds
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit attendance!");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error); // Log error for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-gray-300 min-h-screen p-6 mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 animate-pulse">
        Attendance
      </h1>
      <button
        onClick={() => navigate("/facultiesDashboard")}
        className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 ease-in-out mb-6"
      >
        Back
      </button>
      {loading ? (
        <div className="text-center text-lg animate-pulse text-gray-700">
          Loading...
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <select
              onChange={(e) => handleBatchSelect(e.target.value)}
              value={selectedBatch}
              className="block appearance-none w-64 bg-white border border-gray-400 rounded-md p-3 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out"
            >
              <option value="" disabled className="text-gray-500">
                Select Batch
              </option>
              {batches.length > 0 ? (
                batches.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No Batches Available
                </option>
              )}
            </select>
            <span className="absolute right-4 top-4 text-gray-400">▼</span>
          </div>
        </div>
      )}

      {students.length > 0 && selectedBatch && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
            Students in {batches.find((batch) => batch._id === selectedBatch)?.name}
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="border px-4 py-3">Roll No</th>
                  <th className="border px-4 py-3">Name</th>
                  <th className="border px-4 py-3">College</th>
                  <th className="border px-4 py-3 text-center">Mark Present</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-green-100 transition-all duration-200"
                  >
                    <td className="border px-4 py-3">{student.rollNumber}</td>
                    <td className="border px-4 py-3">{student.fullName}</td>
                    <td className="border px-4 py-3">{student.college}</td>
                    <td className="border px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={attendanceData[student._id] || false}
                        onChange={() => handleAttendanceChange(student._id)}
                        className="cursor-pointer w-6 h-6 text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500 transition-transform duration-200 transform hover:scale-125"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={handleSubmitAttendance}
              className="bg-green-600 text-white py-2 px-8 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Attendance"}
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md text-center transition-opacity duration-300 ease-in-out opacity-100">
          {successMessage}
        </div>
      )}

      {/* Already Submitted Message */}
      {showAlreadySubmitted && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md text-center transition-opacity duration-300 ease-in-out opacity-100">
          Today's attendance has already been submitted!
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
