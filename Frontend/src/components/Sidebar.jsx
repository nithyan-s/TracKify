import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', icon: '🏠', path: '/seller/dashboard' },
    { name: 'Products', icon: '📦', path: '/seller/products' },
    { name: 'Add Product', icon: '+', path: '/seller/add-product' },
  ];

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/seller" className="text-2xl font-bold text-gray-800 dark:text-white">
          Seller Hub
        </Link>
        {/* Close button only visible on small screens */}
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(false)} // Close sidebar on small screens
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg transition-colors ${location.pathname === item.path
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <span className="w-5 h-5 mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
