<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge, Button, Spinner, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Offer.css';

const OfferCards = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('active');
=======
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "../common/CountdownTimer";
import '../styles/Offer.css'; 

const Offer = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
<<<<<<< HEAD
          `https://alvins.pythonanywhere.com/api/getOfferProducts?status=${statusFilter}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch offers');
        
        const data = await response.json();
        setOffers(data.offers || []);
      } catch (err) {
        setError(err.message);
=======
          "https://alvins.pythonanywhere.com/api/getOfferProducts",
          {
            headers: {
              "Cache-Control": "no-cache",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched offers:", data);

        if (!data.offers || data.offers.length === 0) {
          const mockOffers = [
            {
              id: 1,
              title: "Gaming Laptop",
              current_price: 54270.0,
              original_price: 67000.0,
              items_left: 15,
              image_url: "/gaming-laptop.jpg",
            },
            {
              id: 2,
              title: "EMO Desktop",
              current_price: 93500.0,
              original_price: null,
              items_left: 20,
              image_url: "/emo-desktop.jpg",
            },
            {
              id: 3,
              title: "qwerty",
              current_price: 9500.0,
              original_price: null,
              items_left: 10,
              image_url: "/qwerty.jpg",
            },
            {
              id: 4,
              title: "Wi-Fi Pineapple",
              current_price: 84550.0,
              original_price: 89000.0,
              items_left: 5,
              image_url: "/wifi-pineapple.jpg",
            },
            {
              id: 5,
              title: "LG Ex-boom",
              current_price: 61600.0,
              original_price: 88000.0,
              items_left: 8,
              image_url: "/lg-exboom.jpg",
            },
            {
              id: 6,
              title: "Hisense-100\"\nHSense-100\"",
              current_price: 200100.0,
              original_price: 230000.0,
              items_left: 3,
              image_url: "/hisense-tv.jpg",
            },
          ];
          setOffers(mockOffers);
        } else {
          const offersWithStock = data.offers.map((offer) => ({
            ...offer,
            current_price: offer.current_price || 0,
            original_price: offer.original_price || null,
            items_left: Math.floor(Math.random() * 20) + 1,
          }));
          setOffers(offersWithStock);
        }
        setError(null);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
<<<<<<< HEAD
  }, [statusFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCardClick = (offer) => {
    navigate('/product-details', { state: { product: offer } });
  };

  const handleAddToCart = (e, offer) => {
    e.stopPropagation(); // Prevent card click when clicking the button
    // Add your cart logic here
    console.log('Added to cart:', offer);
  };

  if (error) return <div className="error-alert">Error: {error}</div>;

  return (
    <div className="offers-container">
      {/* Filter Buttons */}
      <div className="filter-buttons">
        <ButtonGroup>
          {['active', 'upcoming', 'expired', 'all'].map((filter) => (
            <Button
              key={filter}
              variant={statusFilter === filter ? 'primary' : 'outline-primary'}
              onClick={() => setStatusFilter(filter)}
              size="sm"
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-spinner">
          <Spinner animation="border" />
          <span>Loading offers...</span>
        </div>
      )}

      {/* Offers Grid */}
      <div className="offers-grid">
        {offers.map((offer) => (
          <Card 
            key={offer.id} 
            className="offer-card"
            onClick={() => handleCardClick(offer)}
            style={{ cursor: 'pointer' }}
          >
            {offer.image_url && (
              <Card.Img variant="top" src={offer.image_url} alt={offer.title} />
            )}
            
            <Badge bg="danger" className="discount-badge">
              {Math.round(offer.discount_percentage)}% OFF
            </Badge>
            
            <Card.Body>
              <Card.Title>{offer.title}</Card.Title>
              <Card.Text className="description">{offer.description}</Card.Text>
              
              <div className="price-section">
                <span className="discounted-price">Ksh{offer.discounted_price}</span>
                <span className="original-price">Ksh{offer.original_price}</span>
              </div>
              
              <div className="date-range">
                <span>
                  <i className="far fa-calendar-alt"></i> {formatDate(offer.start_date)}
                </span>
                <span>
                  <i className="far fa-calendar-times"></i> {formatDate(offer.end_date)}
                </span>
              </div>
              
              <div className="card-footer">
                <Badge bg={offer.stock_quantity > 0 ? 'success' : 'secondary'}>
                  {offer.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </Badge>
                <Button 
                  variant="primary" 
                  size="sm"
                  disabled={offer.stock_quantity <= 0}
                  onClick={(e) => handleAddToCart(e, offer)}
                >
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      {/* Empty State */}
      {!loading && offers.length === 0 && (
        <div className="empty-state">
          No offers available in this category
        </div>
      )}
=======

    const interval = setInterval(fetchOffers, 300000); // every 5 mins
    return () => clearInterval(interval);
  }, []);

  const handleOfferClick = (offer) => {
    navigate(`/productoffercard/${offer.id}`, {
      state: {
        product: offer,
      },
    });
  };

  if (loading) {
    return (
      <div className="offer-loading">
        <div className="spinner"></div>
        <p>Loading exciting offers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="offer-error">
        <div className="error-icon">⚠️</div>
        <h3>Unable to load offers</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flash-sales-container">
      <div className="flash-sales-header">
        <h1>Flash Sales | Live Now</h1>
        <div className="time-left">
          <span>Time Left: </span>
          <CountdownTimer
            endTime={new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()} // 3 hours from now
            showLabels={false}
          />
        </div>
      </div>

      <div className="flash-sales-grid">
        {offers.slice(0, 5).map((offer) => (
          <div key={offer.id} className="flash-sale-item" onClick={() => handleOfferClick(offer)}>
            <div className="product-image-container">
              <img
                src={offer.image_url || "/placeholder-product.jpg"}
                alt={offer.title}
                className="product-image"
                onError={(e) => {
                  e.target.src = "/placeholder-product.jpg";
                }}
              />
            </div>
            <h3 className="flash-sale-title">
              {offer.title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h3>
            <div className="flash-sale-prices">
              <span className="current-price">
                KSh {offer.current_price.toLocaleString()}
              </span>
              {offer.original_price !== null && (
                <span className="original-price">
                  KSh {offer.original_price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="items-left">{offer.items_left} items left</div>
          </div>
        ))}
      </div>

      {offers.length > 5 && (
        <div className="flash-sales-grid single-item">
          <div
            className="flash-sale-item"
            onClick={() => handleOfferClick(offers[5])}
          >
            <div className="product-image-container">
              <img
                src={offers[5].image_url || "/placeholder-product.jpg"}
                alt={offers[5].title}
                className="product-image"
                onError={(e) => {
                  e.target.src = "/placeholder-product.jpg";
                }}
              />
            </div>
            <h3 className="flash-sale-title">
              {offers[5].title.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h3>
            <div className="flash-sale-prices">
              <span className="current-price">
                KSh {offers[5].current_price.toLocaleString()}
              </span>
              {offers[5].original_price !== null && (
                <span className="original-price">
                  KSh {offers[5].original_price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="items-left">{offers[5].items_left} items left</div>
          </div>
        </div>
      )}

      <div className="see-all">
        <button onClick={() => navigate("/all-offers")}>See All &gt;</button>
      </div>
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
    </div>
  );
};

<<<<<<< HEAD
export default OfferCards;
=======
export default Offer;
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
