import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink for active styling
import '../styles/Navbar.css';
import clubLogo from '../assets/logo.png'; // Import your club logo image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to close menu when a link is clicked (important for mobile)
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
       <div className="navbar-brand">
        <Link to="/" className="logo" onClick={closeMenu}>
          {/* --- NEW: Add your logo image here --- */}
          <img src={clubLogo} alt="Club Logo" className="club-logo" />
          The Blockchain Hub
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Use NavLink for active class and ensure menu closes on click */}
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/about" className="nav-link-item" activeclassname="active" onClick={closeMenu}>About Us</NavLink></li>
        <li><NavLink to="/events" className="nav-link-item" activeclassname="active" onClick={closeMenu}>Events</NavLink></li>
        <li><NavLink to="/team" className="nav-link-item" activeclassname="active" onClick={closeMenu}>Team</NavLink></li>
        <li><NavLink to="/gallery" className="nav-link-item" activeclassname="active" onClick={closeMenu}>Gallery</NavLink></li>
        <li><NavLink to="/contact" className="nav-link-item" activeclassname="active" onClick={closeMenu}>Contact Us</NavLink></li> {/* Changed 'Contact' to 'Contact Us' for consistency */}
        {/* NEW: Admin Login Link */}
      </ul>
    </nav>
  );
};

export default Navbar;