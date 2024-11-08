import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFaculty = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/api/addFaculty/create-faculty', { name, email, password });
      alert(response.data.message);
      navigate('/AdminDashboard'); // Redirect after successful creation
    } catch (error) {
      console.error('Error creating faculty account:', error);
      alert('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 mt-20 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Faculty</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 p-2 rounded mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded w-full transition duration-300 transform hover:bg-blue-700"
        >
          Create Faculty
        </button>
      </form>
    </div>
  );
};

export default AddFaculty;
