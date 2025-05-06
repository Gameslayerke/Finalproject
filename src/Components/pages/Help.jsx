import React from 'react';
import '../styles/HelpPage.css';

const HelpPage = () => {
  return (
    <div className="help-container">
      <header className="help-header">
        <h1>Customer Support</h1>
        <p>How can we help you today?</p>
      </header>

      <div className="help-search">
        <input type="text" placeholder="Search help articles..." />
        <button>Search</button>
      </div>

      <div className="help-sections">
        <section className="help-category">
          <h2>Order Assistance</h2>
          <ul>
            <li><a href="#">Track your order</a></li>
            <li><a href="#">Cancel or change order</a></li>
            <li><a href="#">Returns & refunds</a></li>
          </ul>
        </section>

        <section className="help-category">
          <h2>Payment Issues</h2>
          <ul>
            <li><a href="#">Payment methods</a></li>
            <li><a href="#">Failed payments</a></li>
            <li><a href="#">Refund status</a></li>
          </ul>
        </section>

        <section className="help-category">
          <h2>Account Help</h2>
          <ul>
            <li><a href="/resetpassword">Reset password</a></li>
            <li><a href="/account">Update account details</a></li>
            <li><a href="#">Delete account</a></li>
          </ul>
        </section>
      </div>

      <div className="contact-section">
        <h2>Still need help?</h2>
        <div className="contact-methods">
          <div className="contact-card">
            <h3>Live Chat</h3>
            <p>Available 24/7</p>
            <button>Start Chat</button>
          </div>
          <div className="contact-card">
            <h3>Email Us</h3>
            <p>Response within 24 hours</p>
            <button>Send Email</button>
          </div>
          <div className="contact-card">
            <h3>Call Support</h3>
            <p>+1 (254) 110447217</p>
            <p>Mon-Fri, 9am-5pm EAT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;