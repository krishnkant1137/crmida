import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-100 to-blue-400 fixed w-full h-20 z-10 top-0 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <img 
            src="https://res.cloudinary.com/dpwcvgpt3/image/upload/v1729425912/r62nuxdofks8dr16jj8v.png" 
            alt="Logo" 
            className="h-16 w-auto mr-3 border-none" 
          />
        </div>

        {/* Right Side: Social Media Links */}
        <div className="flex items-center space-x-4">
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/instadotanalytics/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-black hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 mr-2" />
            {/* <span>Instagram</span> */}
          </a>

          {/* Facebook */}
          <a 
            href="https://www.facebook.com/instadotanalytics/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-black hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faFacebook} className="h-6 w-6 mr-2" />
            {/* <span>Facebook</span> */}
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/company/instadotanalytics/posts/?feedView=all" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-black hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faLinkedin} className="h-6 w-6 mr-2" />
            {/* <span>LinkedIn</span> */}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
