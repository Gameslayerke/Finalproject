import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // For styling

const WelcomeScreen = () => {
  const navigate = useNavigate();

  // Auto-redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);

  return (
    <div className="welcome-screen">
      {/* Your logo or app name */}
      <div className="welcome-logo">
        <h1>quick cart</h1>
      </div>

      {/* Welcome message */}
      <div className="welcome-message">
        <p>Discover amazing products at unbeatable prices</p>
      </div>

      {/* Optional skip button */}
      <button 
        className="skip-button" 
        onClick={() => navigate("/home")}
      >
        Skip
      </button>
    </div>
  );
};

export default WelcomeScreen;
=======
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"; // For styling

const WelcomeScreen = () => {
  const navigate = useNavigate();

  // Auto-redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);

  return (
    <div className="welcome-screen">
      {/* Your logo or app name */}
      <div className="welcome-logo">
        <h1>quick cart</h1>
      </div>

      {/* Welcome message */}
      <div className="welcome-message">
        <p>Discover amazing products at unbeatable prices</p>
      </div>

      {/* Optional skip button */}
      <button 
        className="skip-button" 
        onClick={() => navigate("/home")}
      >
        Skip
      </button>
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
    </div>
  );
};

export default WelcomeScreen;