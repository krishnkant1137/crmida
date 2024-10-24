import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Layout from "./assets/components/others/Layout";
import SalesDashboard from "./assets/components/salesSection/sales/SalesDashboard";
import SearchStudent from "./assets/components/salesSection/enquiry/EnquirySearch";
import StudentEnquiry from "./assets/components/salesSection/enquiry/EnquiryForm";
import AllEnquiry from "./assets/components/salesSection/enquiry/AllEnquiry";
import Demo from "./assets/components/salesSection/demo/Demo";
import AllDemo from "./assets/components/salesSection/demo/AllDemo";
import PrivateRoute from "./assets/components/others/PrivateRoute";
import BatchPage from "./assets/components/facultySection/BatchPage"; // Correct spelling of BatchPage
import SalesLogin from "./assets/components/salesSection/sales/SalesLogin";
import Unauthorized from "./assets/components/others/Unauthorized";
import EnrolledStudent from "./assets/components/salesSection/addmission/AdmissionForm";
import AllEnrolledStudents from "./assets/components/salesSection/addmission/AllEnrolledStudent";
import StudentProfile from "./assets/components/salesSection/addmission/StudentProfile";
import Navbar from "./assets/components/others/Navbar";
import AttendancePage from "./assets/components/facultySection/AttendancePage";
import PerformancePage from "./assets/components/facultySection/performance/PerformancePage";
import FacultyLogin from "./assets/components/facultySection/FacultiesLogin";
import FacultyDashboard from "./assets/components/facultySection/FacultyDashboard";
import ResourceSharing from "./assets/components/facultySection/ResourceSharing";
import DemosReceived from "./assets/components/facultySection/DemoReceived";
import HRDashboard from "./assets/components/HRSection/HRDashboard";
import HRLogin from "./assets/components/HRSection/HRLogin";
import StudentStatus from "./assets/components/HRSection/StudentStatus";
import AdminLogin from "./assets/components/adminSection/AdminLogin";
import AdminDashboard from "./assets/components/adminSection/AdminDashboard";
import SeeAllSections from "./assets/components/adminSection/SeeAllSections";
import RevenueChart from "./assets/components/adminSection/RevenueChart";
import RevenueLineChart from "./assets/components/adminSection/RevenueLineChart";
import DemosReceived from "./assets/components/facultySection/DemosReceived"; // Correct path for DemosReceived

function App() {
  return (
    <>
      <Router>
        <Navbar />
<<<<<<< HEAD
        <div
=======
        {/* <div
>>>>>>> 202a842e5ea0e4cea0d225f75a2b5e56125dfb7d
          className="min-h-screen bg-cover bg-center p-6"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dpwcvgpt3/image/upload/v1729494553/blauc6qmmxwxaqdgdago.jpg')",
            backgroundSize: "contain", // Set background size to contain
            backgroundPosition: "center", // Center the background image
            backgroundRepeat: "no-repeat", // Prevent the image from repeating
          }}
        > */}
          <Routes>
            <Route path="/sales/login" element={<SalesLogin />} />
            <Route path="/faculties/login" element={<FacultyLogin />} />
            <Route path="/HR/login" element={<HRLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/"
              element={
                <div className="flex flex-col justify-center items-center h-screen space-y-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-blue-400 drop-shadow-lg mb-8 animate-fade-in">
                    Welcome to the InstaDot Portal
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link
                      to="/sales/login"
                      className="bg-indigo-600 text-white px-10 py-5 rounded-lg shadow-lg text-2xl hover:bg-indigo-700 transform hover:-translate-y-1 transition duration-300"
                    >
                      Sales Section
                    </Link>
                    <Link
                      to="/faculties/login"
                      className="bg-teal-500 text-white px-10 py-5 rounded-lg shadow-lg text-2xl hover:bg-teal-600 transform hover:-translate-y-1 transition duration-300"
                    >
                      Faculties Section
                    </Link>
                    <Link
                      to="/HR/login"
                      className="bg-orange-500 text-white px-10 py-5 rounded-lg shadow-lg text-2xl hover:bg-orange-600 transform hover:-translate-y-1 transition duration-300"
                    >
                      HR Section
                    </Link>
                    <Link
                      to="/admin/login"
                      className="bg-purple-600 text-white px-10 py-5 rounded-lg shadow-lg text-2xl hover:bg-purple-700 transform hover:-translate-y-1 transition duration-300"
                    >
                      Admin Section
                    </Link>
                  </div>
                </div>
              }
            />

            <Route path="/salesDashboard" element={<SalesDashboard />} />
            <Route path="/sales/search-student" element={<SearchStudent />} />
            <Route path="/sales/student-enquiry" element={<StudentEnquiry />} />
            <Route path="/sales/all-enquiry" element={<AllEnquiry />} />
            <Route path="/sales/demo" element={<Demo />} />
            <Route path="/sales/all-demo" element={<AllDemo />} />
            <Route path="/sales/enrolled-students" element={<EnrolledStudent />} />
            <Route path="/sales/all-enrolled-students" element={<AllEnrolledStudents />} />
            <Route path="/students/:id" element={<StudentProfile />} />

            {/* Faculties section routes */}
            <Route path="/facultiesDashboard" element={<FacultyDashboard />} />
            <Route path="/facultiesDashboard/batch" element={<BatchPage />} />
            <Route path="/facultiesDashboard/attendance" element={<AttendancePage />} />
            <Route path="/facultiesDashboard/performance" element={<PerformancePage />} />
            <Route path="/facultiesDashboard/resourceSharing" element={<ResourceSharing />} />
            <Route path="/facultiesDashboard/demosReceived" element={<DemosReceived />} />

            {/* HR section routes */}
            <Route path="/HRDashboard" element={<HRDashboard />} />
            <Route path="/HRDashboard/studentStatus" element={<StudentStatus />} />

            {/* Admin section routes */}
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/AdminDashboard/SeeAllSections" element={<SeeAllSections />} />
            <Route path="/AdminDashboard/RevenueChart" element={<RevenueChart />} />
            <Route path="/AdminDashboard/RevenueLineChart" element={<RevenueLineChart />} />

            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        {/* </div> */}
      </Router>
    </>
  );
}

export default App;
