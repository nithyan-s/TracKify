import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`bg-[#1e1e1e] text-white w-64 h-full pt-20 px-6 fixed top-0 left-0 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-auto`}
      >
        <ul className="space-y-6 text-lg font-medium mt-4">
          <li><Link to="/" className="block hover:text-cyan-400">Dashboard</Link></li>
          <li><Link to="/register-seller" className="block hover:text-cyan-400">Sellers</Link></li>
          <li><Link to="/register-warehouse" className="block hover:text-cyan-400">Warehouses</Link></li>
          <li><Link to="/products" className="block hover:text-cyan-400">Products</Link></li>
          <li><Link to="/notifications" className="block hover:text-cyan-400">Notifications</Link></li>
          <li><Link to="/settings" className="block hover:text-cyan-400">Settings</Link></li>
        </ul>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white text-3xl"
        onClick={toggleSidebar}
      >
        {isOpen ? <AiOutlineClose /> : <HiMenuAlt3 />}
      </button>
    </>
  );
};

export default Sidebar;
