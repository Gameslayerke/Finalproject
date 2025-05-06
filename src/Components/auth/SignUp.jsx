import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import '../styles/AuthForms.css';
=======
import '../styles/AuthForms.css'; 
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
<<<<<<< HEAD
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms acceptance
=======
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
<<<<<<< HEAD
      [name]: value,
    }));
  };

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

=======
      [name]: value
    }));
  };

>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

<<<<<<< HEAD
    // Check if terms and conditions are accepted
    if (!termsAccepted) {
      setError('Please agree to the Terms and Conditions to sign up.');
      return;
    }

=======
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
    setIsLoading(true);

    try {
      const response = await fetch('https://alvins.pythonanywhere.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
<<<<<<< HEAD
          password: formData.password,
=======
          password: formData.password
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-form-header">
          <h2>Create Account</h2>
          <p>Join us today to start shopping</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. 0712345678"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Create a password"
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Confirm your password"
              required
              minLength="6"
            />
          </div>

          <div className="terms-agreement">
<<<<<<< HEAD
            <input
              type="checkbox"
              id="terms"
              required
              checked={termsAccepted} // Bind the checked state
              onChange={handleTermsChange} // Handle checkbox changes
            />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms and Conditions</a>
            </label>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading || !termsAccepted}>
=======
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to the <a href="/terms">Terms and Conditions</a></label>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="auth-footer">
            Already have an account? <a href="/signin">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;