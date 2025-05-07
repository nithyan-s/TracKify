import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-5 py-4 bg-[#0f0f0f] relative top-0 w-full z-[1000]">
      <div className="text-cyan-400 text-xl font-semibold">
        <h1>TracKify</h1>
      </div>
      <div>
        <nav className="flex flex-wrap justify-center items-center gap-4 text-white">
          <Link
            to="/admin-dashboard"
            className="hover:text-cyan-400 transition duration-300"
          >
            Dashboard
          </Link>
         
          <Link
            to="/notifications"
            className="hover:text-cyan-400 transition duration-300"
          >
            Notifications
          </Link>
          <Link
            to="/"
            className="hover:text-cyan-400 transition duration-300"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
