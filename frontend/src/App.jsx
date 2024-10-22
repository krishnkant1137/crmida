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
import BatchPage from "./assets/components/facultySection/Batchpage";
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
import HRDashboard from "./assets/components/HRSection/HRDashboard";
import HRLogin from "./assets/components/HRSection/HRLogin";
import StudentStatus from "./assets/components/HRSection/StudentStatus";
import AdminLogin from "./assets/components/adminSection/AdminLogin";
import AdminDashboard from "./assets/components/adminSection/AdminDashboard";
import SeeAllSections from "./assets/components/adminSection/SeeAllSections";
import RevenueChart from "./assets/components/adminSection/RevenueChart";
import RevenueLineChart from "./assets/components/adminSection/RevenueLineChart";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        {/* Background image for the entire app */}
        <div
          className="min-h-screen bg-cover bg-center p-6"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dpwcvgpt3/image/upload/v1729494553/blauc6qmmxwxaqdgdago.jpg')",
          }}
        >
          <Routes>
            <Route path="/sales/login" element={<SalesLogin />} />
            <Route path="/faculties/login" element={<FacultyLogin />} />
            <Route path="/HR/login" element={<HRLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Landing page with animated buttons */}
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

            {/* Other routes */}
            <Route
              path="/salesDashboard"
              element={
                <SalesDashboard />
              }
            />
            <Route
              path="/sales/search-student"
              element={
                <SearchStudent />

              }
            />
            <Route
              path="/sales/student-enquiry"
              element={
                <StudentEnquiry />

              }
            />
            <Route
              path="/sales/all-enquiry"
              element={
                <AllEnquiry />

              }
            />
            <Route
              path="/sales/demo"
              element={
                <Demo />
              }
            />
            <Route
              path="/sales/all-demo"
              element={
                <AllDemo />
              }
            />
            <Route
              path="/sales/enrolled-students"
              element={
                <EnrolledStudent />
              }
            />
            <Route path="/sales/all-enrolled-students" element={<AllEnrolledStudents />} />
            <Route path="/students/:studentId" element={<StudentProfile />} />

            {/* Faculties section routes */}
            <Route
              path="/facultiesDashboard"
              element={
                <FacultyDashboard />
              }
            />
            <Route path="/facultiesDashboard/batch" element={<BatchPage />} />
            <Route path="/facultiesDashboard/attendance" element={<AttendancePage />} />
            <Route path="/facultiesDashboard/performance" element={<PerformancePage />} />
            <Route path="/facultiesDashboard/resourceSharing" element={<ResourceSharing />} />

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
        </div>
      </Router>
    </>
  );
}

export default App;
