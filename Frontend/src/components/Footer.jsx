import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white text-center py-6 mt-10">
      <p>&copy; 2025 TracKify Admin Dashboard | All Rights Reserved</p>
      <div className="social-links mt-4">
        <a href="#" className="mx-4 hover:text-cyan-400 transition duration-300">Facebook</a>
        <a href="#" className="mx-4 hover:text-cyan-400 transition duration-300">Twitter</a>
        <a href="#" className="mx-4 hover:text-cyan-400 transition duration-300">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;
