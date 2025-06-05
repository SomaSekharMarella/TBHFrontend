// Footer.jsx
import React from 'react';
import { FaLinkedin, FaInstagram, FaTelegramPlane } from "react-icons/fa";
// Import your club logo image here

import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">


        {/* Column 1 (Original footer-brand) */}
        <div className="footer-column footer-brand">
          <h3>The Blockchain Hub</h3>
          <p className="brand-mission">
            Empowering the next generation with decentralized knowledge and innovation.
          </p>
        </div>

        {/* Column 2 (Original footer-contact) */}
        <div className="footer-column footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:theblockchainhub.klu@gmail.com">theblockchainhub.klu@gmail.com</a></li>
            <li>KL University, Vijayawada</li>
          </ul>
        </div>

        {/* Column 3 (Original footer-social) */}
        <div className="footer-column footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/tbhklu/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon" /> LinkedIn
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/klu_tbh/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="social-icon" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://t.me/klu_tbh" target="_blank" rel="noopener noreferrer">
                <FaTelegramPlane className="social-icon" /> Telegram
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>Developed by Soma Sekhar with <span style={{ color: 'red' }}>❤️</span></p>
        <p>Copyright &copy; {currentYear} The Blockchain Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;