
import React from 'react';
import '../css/contact.css'; // Import your custom CSS for the footer

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h3>About Us</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className='footer-section'>
          <h3>Contact Us</h3>
          <p>123 Example Street</p>
          <p>Email: info@example.com</p>
        </div>
        <div className='footer-section'>
          <h3>Social Media</h3>
          <p>Follow us on:</p>
          <p>Facebook, Twitter, Instagram</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
