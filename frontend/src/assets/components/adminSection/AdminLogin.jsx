import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };
    console.log('Sending payload:', payload); // Log payload before sending

    try {
      const response = await axios.post(`${process.env.VITE_BASE_URL}/api/admin/login`, payload);
      
      if (response.data.token) {
        localStorage.setItem('adminAuthToken', response.data.token);
        localStorage.setItem('userRole', 'admin');
        setSuccess(true)
        // setModalMessage('Login Successful!');
        // setModalVisible(true);
        setTimeout(() => {
          navigate('/adminDashboard');
          setSuccess(false)
        }, 500);
      } else {
        setModalMessage('Invalid credentials');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setModalMessage('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-100">
      <form onSubmit={handleLogin} className="relative bg-white p-12 rounded-2xl shadow-2xl w-[32rem] space-y-8 mt-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          &#10005;
        </button>

        <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-6 p-4 rounded-xl text-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
          required
        />
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-4 rounded-xl text-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 text-gray-500 hover:text-gray-800 transition duration-200"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-4 rounded-xl text-2xl font-semibold hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>

       {/* Success Animation */}
       {success && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-green-100 bg-opacity-75">
          <div className="relative">
            {/* Spinning circle */}
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-green-600 border-r-transparent"></div>

            {/* Login Successful text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 font-bold text-lg">
              Login Successful
            </div>
          </div>
        </div>
      )}

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">{modalMessage}</h3>
            <button 
              onClick={closeModal} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;