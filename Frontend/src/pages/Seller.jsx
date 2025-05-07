import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import Dashboard from '../components/SellerDashboard';
import ProductsPage from '../components/ProductsPage';
import AddProductPage from '../components/AddProductsPage';

function Seller() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div
        className={`w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
        ${sidebarOpen ? 'fixed inset-0 z-50' : 'hidden'} md:block`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <TopNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-grow p-4 sm:p-6 bg-gray-100 dark:bg-gray-900">
          <Routes>
            <Route path="" element={<Dashboard />} /> {/* Default route */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="add-product" element={<AddProductPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Seller;
