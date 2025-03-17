import React from "react";

const Footer = () => {
  return (
    
    <footer className="bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-400 text-gray-800 py-8 mt-15 shadow-lg transform rotate-[-2deg] relative max-w-[95%] mx-auto">
      <div className="tape-section"></div>
      <div className="max-w-4xl mx-auto text-center p-4">
        <p className="text-lg mb-2 font-marker">
          My Kanban's Board - A project management tool inspired by Kanban.
        </p>
        <p className="text-sm mb-4 font-semibold">Developed by Flavien GUILLON</p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/aldebarian-git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition duration-300"
          >
            <i className="fab fa-github text-2xl"></i>
          </a>
          <a
            href="https://aldebarian-git.github.io/Portefolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition duration-300"
          >
            <i className="fas fa-briefcase text-2xl"></i>
          </a>
        </div>
        <p className="text-sm mt-4">&copy; 2025 My Kanban's Board. All rights reserved.</p>
        <div className="tape-section"></div>
      </div>
      
    </footer>
  );
};

export default Footer;

