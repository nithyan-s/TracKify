import { motion } from 'framer-motion';
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


// Removed: import { SparklesIcon, ShieldCheckIcon, QrCodeIcon, GlobeAltIcon, ChartBarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const FeaturesPage = () => {
    const features = [
        {
            icon: '🔗',
            title: "Blockchain Verification",
            description: "Every product movement recorded on an immutable blockchain ledger"
        },
        {
            icon: '🛡️',
            title: "Anti-Tampering",
            description: "Military-grade encryption ensures supply chain integrity"
        },
        {
            icon: '📱',
            title: "Smart QR Codes",
            description: "Unique, dynamically generated codes for each product batch"
        },
        {
            icon: '🌍',
            title: "Global Tracking",
            description: "Real-time location tracking across the entire supply chain"
        },
        {
            icon: '📊',
            title: "Analytics Dashboard",
            description: "Comprehensive insights into product movement patterns"
        },
        {
            icon: '💰',
            title: "Cost Efficiency",
            description: "Reduce losses from counterfeits by up to 90%"
        }
    ];

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

    return (
        <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col">
            {/* Navbar - Reuse your existing Navbar component */}
            <Navbar />


            {/* Main Content */}
            <div className="flex-1 px-6 md:px-24 py-16">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Enterprise-Grade Protection
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Transform your supply chain with blockchain-powered security features designed for modern enterprises
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-gray-900 rounded-2xl p-8 transition-all hover:bg-gray-800 hover:transform hover:-translate-y-2"
                        >
                            <div className="mb-6">
                                <div className="w-14 h-14 bg-gray-800 rounded-xl flex items-center justify-center text-2xl group-hover:bg-gray-700 transition">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Secure Your Supply Chain?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join industry leaders who've already reduced counterfeit incidents by an average of 87%
                        </p>
                        <button
                            onClick={() => window.location = '/userAuth'}
                            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105"
                        >
                            Start Free Trial
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturesPage;
