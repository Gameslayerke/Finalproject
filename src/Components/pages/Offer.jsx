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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://alvins.pythonanywhere.com/api/getOfferProducts?status=${statusFilter}`
        );
        
        if (!response.ok) throw new Error('Failed to fetch offers');
        
        const data = await response.json();
        setOffers(data.offers || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
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
    </div>
  );
};

export default OfferCards;