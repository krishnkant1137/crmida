import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResourceSharing = () => {
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch resources on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/resources'); // Update endpoint
        if (!response.ok) throw new Error('Failed to fetch resources');
        const data = await response.json();
        setResources(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/resources', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      setSuccessMessage('Resource uploaded successfully!');
      // Re-fetch resources to update the list
      fetchResources();
    } catch (error) {
      console.error('Error uploading resource:', error);
      setError('Failed to upload resource. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-20">
      <button
        onClick={() => navigate('/facultiesDashboard')}
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mb-4"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-4 text-center">Resource Sharing</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded shadow-md">
          {successMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded shadow-md">
          {error}
        </div>
      )}

      <form onSubmit={handleUpload} className="mb-6">
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Upload Resource
        </button>
      </form>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">Available Resources</h2>
          <ul>
            {resources.map((resource) => (
              <li key={resource.id}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResourceSharing;
