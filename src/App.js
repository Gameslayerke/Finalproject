import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import Footer from './Components/Footer';
import Carousel from './Components/Carousel';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar'; // Import Navbar
import Offer from './Components/Offer';
import ProductOfferCard from './Components/ProductOfferCard';
import ProductCard from './Components/ProductCard';

// Custom layout wrapper to use useLocation
function Layout() {
  const location = useLocation();

  // Paths where Navbar should be hidden
  const hideNavbarPaths = ['/login', '/register'];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div
      className="app-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Conditionally render Navbar */}
      {shouldShowNavbar && <Navbar />}

      {/* Main content area */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/navbar" element={<Carousel />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/deals" element={<Offer />} />
          <Route path="/productoffercard" element={<ProductOfferCard />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
          <Route path="/productcard" element={<ProductCard />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </Router>
  );
}

export default App;
