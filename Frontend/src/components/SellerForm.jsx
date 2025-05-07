import React, { useState } from 'react';

const SellerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    contact: '',
    role: 'seller',
    category: 'electronics'
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    setIsError(false);
    
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          contact: formData.contact,
          location: formData.location
        }),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      setMessage('Registration successful!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        location: '',
        contact: '',
        role: 'seller',
        category: 'electronics'
      });
    } catch (error) {
      setMessage(error.message || 'An error occurred while sending request');
      setIsError(true);
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-xl max-w-md mx-auto text-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-center text-blue-400 border-b border-blue-700 pb-3">Register New Seller</h3>
      
      {message && (
        <div className={`p-3 mb-4 rounded-md text-center font-medium ${isError ? 'bg-red-900 text-red-200' : 'bg-blue-900 text-blue-200'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-blue-300">Seller Name</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="block text-sm font-medium text-blue-300">Seller Email</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-blue-300">Password</label>
          <input 
            type="password" 
            id="password" 
            value={formData.password}
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-300">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-1">
          <label htmlFor="contact" className="block text-sm font-medium text-blue-300">Contact</label>
          <input 
            type="text" 
            id="contact" 
            value={formData.contact}
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="location" className="block text-sm font-medium text-blue-300">Seller Location</label>
          <input 
            type="text" 
            id="location" 
            value={formData.location}
            onChange={handleChange}
            required 
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-70 disabled:hover:bg-blue-600 disabled:hover:scale-100"
        >
          {isLoading ? 'Registering...' : 'Register Seller'}
        </button>
      </form>
    </div>
  );
};

export default SellerForm;