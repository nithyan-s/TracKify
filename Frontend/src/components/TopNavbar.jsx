import React from 'react';

const TopNavbar = ({ sidebarOpen, setSidebarOpen, darkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left: Hamburger */}
        <div className="flex">
          <button
            className="text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰ {/* Menu Icon */}
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark/Light Toggle */}
          {/* <button
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button> */}

          {/* Notifications */}
          {/* <button className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <span className="sr-only">Notifications</span>
            🔔
          </button> */}

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://via.placeholder.com/150"
                alt="User avatar"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline-block">
                Seller Name
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
