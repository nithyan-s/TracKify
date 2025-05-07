import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "About", path: "/about" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative top-0 left-0 w-full text-white h-16 px-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-3 cursor-pointer select-none">
        <img
          src="/logo.png" // or your logo path
          alt="Trackify Logo"
          className="w-10 h-10 object-contain"
        />
        <span className="text-2xl font-bold text-white">TracKify</span>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6">
        <ul className="flex space-x-6">
          {navItems.map(({ name, path }) => (
            <li key={path} className="relative group">
              <Link
                to={path}
                className="hover:text-yellow-400 transition font-medium text-xl"
              >
                {name}
                <span
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] bg-yellow-500 transition-all duration-300 rounded ${pathname === path ? "w-3/4" : "w-0 group-hover:w-3/4"}`}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Login Button (Desktop) */}
      {/* <div className="hidden md:flex items-center space-x-6">
        <Link
          to="/login"
          className="ml-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-4 py-1.5 rounded transition"
        >
          Login
        </Link>
      </div> */}


      {/* Hamburger Button */}
      <button
        ref={buttonRef}
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8"
      >
        <span
          className={`block h-1 w-6 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
        ></span>
        <span
          className={`block h-1 w-6 bg-white my-1 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block h-1 w-6 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
        ></span>
      </button>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[90%] bg-gray-500  rounded-xl shadow-lg transition-all duration-300 overflow-hidden ${menuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <ul className="flex flex-col py-4 px-4 space-y-4">
          {navItems.map(({ name, path }) => (
            <li key={path}>
              <Link
                to={path}
                onClick={() => setMenuOpen(false)}
                className="block text-white text-lg font-medium text-center hover:text-yellow-400 transition"
              >
                {name}
              </Link>
            </li>
          ))}

          {/* Login Button (Mobile) */}
          {/* <li>
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-gray-800 hover:bg-gray-700 text-white text-lg font-semibold text-center py-2 rounded transition"
            >
              Login
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/userAuth');
  };

  return (
    
    <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 px-6 md:px-24 py-8 gap-8">
        {/* Left Side: 60% on md+ */}
        <div className="w-full md:w-3/5 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl sm:text-4xl font-bold mb-4 leading-tight text-center md:text-left">
            Anti-Counterfeiting<br />Blockchain System
          </h1>
          <p className="text-lg text-gray-400 mb-8 text-center md:text-left">
            Transforming logistics into a trust-first ecosystem with verified, counterfeit-free movement.
          </p>
          <div className="flex justify-center md:justify-start mt-10 md:mt-6 lg:mt-6">
            <button 
              onClick={handleGetStarted}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-md text-lg font-semibold transition ">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Side: 40% on md+ */}
        <div className="w-full md:w-2/5 flex justify-center items-center">
          <img
            src="/Blockchain.png"
            alt="Blockchain"
            className="w-[80%] md:w-full max-w-full md:max-w-[80%] float rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
