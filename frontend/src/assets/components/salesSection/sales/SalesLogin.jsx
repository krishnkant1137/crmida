import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SalesLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login request:', { username, password });
      
      // Clear any previous tokens to avoid role conflicts
      localStorage.removeItem('facultiesAuthToken');
      localStorage.removeItem('salesAuthToken');
      localStorage.removeItem('userRole');
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/sales/login', {
        username,
        password,
      });
      console.log('Response:', response.data);
    
      if (response.data.token) {
        localStorage.setItem('salesAuthToken', response.data.token);
        localStorage.setItem('userRole', 'sales');
        setSuccess(true)
        // setModalMessage('Login Successful!');
        // setModalVisible(true);
        setTimeout(() => {
          navigate('/salesDashboard');
          setSuccess(false)
        }, 1000);
      } else {
        setModalMessage('Invalid credentials');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setModalMessage('Login failed');
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
    <div className="flex justify-center items-center min-h-[85vh] bg-gray-100 pt-20">
      <form
        onSubmit={handleLogin}
        className="relative bg-white p-12 rounded-2xl shadow-2xl w-[32rem] space-y-8 mt-8"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
        >
          &#10005;
        </button>

        <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Sales Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

      {/* Error Modal */}
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
export default SalesLogin;
