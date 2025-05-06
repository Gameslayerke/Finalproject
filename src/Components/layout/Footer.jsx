import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-top">
        <div className="footer-section">
          <h4>QuickCart</h4>
          <p>Your one-stop shop for all your needs. Quality products, fast delivery, and excellent customer service.</p>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="/deals">Featured Items</a></li>
            <li><a href="/deals">New Arrivals</a></li>
            <li><a href="/deals">Sale Items</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="/faqs">FAQs</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Sell to Us</a></li>

          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/help">About Us</a></li>
            <li><a href="/help">Blog</a></li>
            <li><a href="/help">Careers</a></li>
            <li><a href="/help">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="payment-methods">
          <span>We accept:</span>
          <FaCcVisa className="payment-icon" />
          <FaCcMastercard className="payment-icon" />
          <FaCcPaypal className="payment-icon" />
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} QuickCart. All rights reserved.</p>
          <p>Developed by Alvins Munene</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;