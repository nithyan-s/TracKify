import React, { useState } from 'react';

const WarehouseForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'warehouse', // Setting default role for warehouse registration
    location: '',
    contact: '',
    walletAddress: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include' // To allow cookies to be sent and received
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'warehouse',
        location: '',
        contact: '',
        walletAddress: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
      <h3 className="text-2xl text-blue-200 mb-6">Register New Warehouse</h3>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Registration successful! You can now login.
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-blue-200">Warehouse Name</label>
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={handleChange}
          required 
          className="w-full p-3 mb-4 bg-gray-600 rounded-md text-white focus:outline-none"
        />

        <label htmlFor="email" className="text-blue-200">Email</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={handleChange}
          required 
          className="w-full p-3 mb-4 bg-gray-600 rounded-md text-white focus:outline-none"
        />

        <label htmlFor="password" className="text-blue-200">Password</label>
        <input 
          type="password" 
          id="password" 
          value={formData.password}
          onChange={handleChange}
          required 
          className="w-full p-3 mb-4 bg-gray-600 rounded-md text-white focus:outline-none"
        />

        <label htmlFor="location" className="text-blue-200">Location</label>
        <input 
          type="text" 
          id="location" 
          value={formData.location}
          onChange={handleChange}
          required 
          className="w-full p-3 mb-4 bg-gray-600 rounded-md text-white focus:outline-none"
        />

        <label htmlFor="contact" className="text-blue-200">Contact Number</label>
        <input 
          type="text" 
          id="contact" 
          value={formData.contact}
          onChange={handleChange}
          required 
          className="w-full p-3 mb-4 bg-gray-600 rounded-md text-white focus:outline-none"
        />

        <label htmlFor="walletAddress ( Optional )" className="text-blue-200">Wallet Address</label>
        <input 
          type="text" 
          id="walletAddress" 
          value={formData.walletAddress}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-gray-600 rounded-md text-white focus:outline-none"
        />

        <button 
          type="submit" 
          className="w-full py-3 bg-blue-200 text-gray-800 font-bold rounded-md"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register Warehouse'}
        </button>
      </form>
    </div>
  );
};

export default WarehouseForm;