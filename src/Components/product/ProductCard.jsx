<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "../styles/ProductCard.css";
import PropTypes from "prop-types";

// Constants for better maintainability
const API_BASE_URL = "https://alvins.pythonanywhere.com";
const DEFAULT_PRODUCT_IMAGE = "https://alvins.pythonanywhere.com/static/images/placeholder.jpg";
const PHONE_REGEX = /^254\d{9}$/;
const STOCK_RANGE = { min: 10, max: 50 };
const COLORS = ["Red", "Blue", "Green", "Black"];
const SIZES = ["S", "M", "L", "XL"];
=======
import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../index.css";
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66

const ProductCard = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
<<<<<<< HEAD
  const { isAuthenticated, currentUser } = useAuth();
  
  // Product state
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState(null);
=======
  
  // Product state
  const [product, setProduct] = useState(location.state?.product);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState("");
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66

  // Review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
<<<<<<< HEAD
  const [errorReviews, setErrorReviews] = useState(null);

  // Product options
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
=======
  const [errorReviews, setErrorReviews] = useState("");

  // Product options
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66

  // Payment state
  const [phone, setPhone] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
<<<<<<< HEAD
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Generate random stock (memoized to prevent re-renders)
  const stock = React.useMemo(() => (
    Math.floor(Math.random() * (STOCK_RANGE.max - STOCK_RANGE.min + 1)) + STOCK_RANGE.min
  ), []);

  // Fetch product with error handling and cancellation
  const fetchProduct = useCallback(async () => {
    if (!productId) return;

    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/getproduct/${productId}`,
        { cancelToken: source.token }
      );
      setProduct(response.data);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError(err.response?.data?.message || "Failed to load product details");
        console.error("Product fetch error:", err);
      }
    } finally {
      if (!source.token.reason) {
        setLoading(false);
      }
    }

    return () => source.cancel("Component unmounted, request canceled");
  }, [productId]);

  // Fetch reviews with error handling
  const fetchReviews = useCallback(async () => {
    if (!productId) return;

    const source = axios.CancelToken.source();
    setLoadingReviews(true);
    setErrorReviews(null);

    try {
      const response = await axios.get(
        `${API_BASE_URL}/reviews/${productId}`,
        { cancelToken: source.token }
      );
      setReviews(response.data || []);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setErrorReviews(err.response?.data?.message || "Failed to load reviews");
        console.error("Review fetch error:", err);
      }
    } finally {
      if (!source.token.reason) {
        setLoadingReviews(false);
      }
    }

    return () => source.cancel("Component unmounted, request canceled");
  }, [productId]);

  // Fetch data on mount or when productId changes
  useEffect(() => {
    if (!product && productId) {
      fetchProduct();
    }
  }, [product, productId, fetchProduct]);

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId, fetchReviews]);

  // Review submission handler
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!review.trim() || rating === 0) {
      setErrorReviews("Please provide both a review and a rating");
      return;
    }

    const newReview = {
      id: Date.now(), // Better unique ID generation
      user: currentUser?.username || "Anonymous",
      rating,
      comment: review,
      date: new Date().toLocaleDateString(),
    };

    try {
      // In a real app, you would POST to your API here
      setReviews(prev => [newReview, ...prev]);
      setShowReviewForm(false);
      setReview("");
      setRating(0);
      setErrorReviews(null);
    } catch (err) {
      setErrorReviews("Failed to submit review. Please try again.");
      console.error("Review submission error:", err);
    }
  };

  // Payment handler with validation
  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!selectedColor || !selectedSize) {
      setPaymentError("Please select both color and size");
=======
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Generate random stock
  const stock = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  const colors = ["Red", "Blue", "Green", "Black"];
  const sizes = ["S", "M", "L", "XL"];

  // Fetch product if not passed via state
  useEffect(() => {
    if (!product && productId) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://alvins.pythonanywhere.com/api/getproduct/${productId}`
          );
          setProduct(response.data);
        } catch (err) {
          setError("Failed to load product details");
          console.error("Product fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId, product]);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      setLoadingReviews(true);
      setErrorReviews("");
      try {
        const response = await axios.get(
          `https://alvins.pythonanywhere.com/reviews/${productId || 158}`
        );
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setErrorReviews("No reviews yet. Be the first to leave a review.");
      } finally {
        setLoadingReviews(false);
      }
    };

    if (product) {
      fetchReviews();
    }
  }, [product, productId]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      user: "Current User",
      rating: rating,
      comment: review,
      date: new Date().toISOString().split("T")[0],
    };
    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
    setReview("");
    setRating(0);
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^254\d{9}$/;
    return regex.test(phone);
  };

  const handleBuyNow = async () => {
    const user_id = localStorage.getItem("user_id");

    if (!user_id) {
      alert("You must be logged in to proceed with payment.");
      navigate("/login");
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
      return;
    }

    if (!phone) {
<<<<<<< HEAD
      setPaymentError("Please enter your phone number");
      return;
    }

    if (!PHONE_REGEX.test(phone)) {
      setPaymentError("Please enter a valid Kenyan phone number (format: 254XXXXXXXXX)");
=======
      alert("Please enter your phone number.");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert("Please enter a valid Kenyan phone number starting with 254.");
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
      return;
    }

    setPaymentLoading(true);
<<<<<<< HEAD
    setPaymentError(null);
    setPaymentSuccess(false);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/mpesa_payment`,
        new URLSearchParams({
          amount: product.product_cost,
          phone,
          product_id: productId,
          color: selectedColor,
          size: selectedSize,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          timeout: 10000, // 10 second timeout
        }
=======
    setPaymentError("");
    setPaymentSuccess(false);

    try {
      const formData = new URLSearchParams();
      formData.append("amount", product.product_cost);
      formData.append("phone", phone);

      const response = await axios.post(
        "https://alvins.pythonanywhere.com/api/mpesa_payment",
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
      );

      if (response.data.success) {
        setPaymentSuccess(true);
<<<<<<< HEAD
      } else {
        throw new Error(response.data.message || "Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError(err.response?.data?.message || err.message || "Payment failed. Please try again.");
=======
        alert("Payment initiated successfully! Check your phone to complete the payment.");
      } else {
        setPaymentError(response.data.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError("An error occurred. Please try again.");
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
    } finally {
      setPaymentLoading(false);
    }
  };

<<<<<<< HEAD
  // Loading state
=======
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

<<<<<<< HEAD
  // Error state
=======
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

<<<<<<< HEAD
  // Product not found
  if (!product) {
    return (
      <div className="error-container">
        <p className="error-message">Product not found</p>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  // Calculate average rating
const averageRating = reviews.length > 0 
  ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) 
  : 0;

=======
  if (!product) {
    navigate("/");
    return null;
  }

>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
  return (
    <div className="product-card-container">
      <div className="product-image-section">
        <img
          src={product.product_photo}
          alt={product.product_name}
          className="product-card-image"
          onError={(e) => {
<<<<<<< HEAD
            e.target.src = DEFAULT_PRODUCT_IMAGE;
            e.target.onerror = null; // Prevent infinite loop
          }}
          loading="lazy"
        />
        {product.discount && (
          <div className="discount-badge">
            -{product.discount}%
          </div>
        )}
=======
            e.target.src = "https://alvins.pythonanywhere.com/static/images/placeholder.jpg";
          }}
        />
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
      </div>

      <div className="product-details-section">
        <h1 className="product-card-name">{product.product_name}</h1>
<<<<<<< HEAD
        
        <div className="price-container">
          <p className="product-card-price">
            KSh {product.product_cost.toLocaleString()}
          </p>
          {product.original_price && (
            <p className="original-price">
              KSh {product.original_price.toLocaleString()}
            </p>
          )}
        </div>
        
        <div className="product-card-ratings">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.round(averageRating) ? "filled" : ""}`}>
                ★
              </span>
            ))}
          </div>
          <span>({reviews.length} {reviews.length === 1 ? "review" : "reviews"})</span>
          {reviews.length > 0 && (
            <span className="average-rating">{averageRating.toFixed(1)}/5</span>
          )}
        </div>
        
        <div className="stock-status">
          {stock > 10 ? (
            <span className="in-stock">In Stock ({stock} available)</span>
          ) : stock > 0 ? (
            <span className="low-stock">Only {stock} left!</span>
          ) : (
            <span className="out-of-stock">Out of Stock</span>
          )}
        </div>

        <div className="product-options">
          <div className="option-group">
            <h3>Color:</h3>
            <div className="option-buttons">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`option-btn ${selectedColor === color ? "active" : ""}`}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
=======
        <p className="product-card-price">KSh {product.product_cost}</p>
        
        <div className="product-card-ratings">
          <span>★★★★☆</span>
          <span>({reviews.length} reviews)</span>
        </div>
        
        <p className="product-availability">In Stock ({stock} left!)</p>

        <div className="product-options">
          <div className="color-options">
            <p>Color:</p>
            <div className="color-buttons">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`color-btn ${selectedColor === color ? "active" : ""}`}
                  onClick={() => setSelectedColor(color)}
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
<<<<<<< HEAD
          <div className="option-group">
            <h3>Size:</h3>
            <div className="option-buttons">
              {SIZES.map((size) => (
                <button
                  key={size}
                  className={`option-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                  aria-label={`Select ${size} size`}
=======
          <div className="size-options">
            <p>Size:</p>
            <div className="size-buttons">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="product-description">
          <h3>Description</h3>
          <p>{product.product_description || "No description available."}</p>
        </div>

        <div className="product-actions">
          <button className="secondary-btn">
            <i className="icon-cart"></i> Add to Cart
          </button>
          <button
            className="primary-btn"
            onClick={handleBuyNow}
            disabled={paymentLoading || !isAuthenticated || stock === 0}
=======
        <div className="payment-section">
          {!localStorage.getItem("user_id") ? (
            <p className="login-prompt">
              You must be <Link to="/login">logged in</Link> to proceed with payment.
            </p>
          ) : (
            <>
              <p>Enter your phone number to complete the payment:</p>
              <input
                type="text"
                placeholder="e.g 254712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="phone-input"
              />
              {paymentError && <p className="error-message">{paymentError}</p>}
              {paymentSuccess && (
                <p className="success-message">
                  Payment initiated successfully! Check your phone to complete the payment.
                </p>
              )}
            </>
          )}
        </div>

        <div className="product-card-actions">
          <button className="add-to-cart-btn">Add to Cart</button>
          <button
            className="buy-now-btn"
            onClick={handleBuyNow}
            disabled={paymentLoading || !localStorage.getItem("user_id")}
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
          >
            {paymentLoading ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
<<<<<<< HEAD
              <>
                <i className="icon-bolt"></i> Buy Now
              </>
=======
              "Buy Now"
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
            )}
          </button>
        </div>

<<<<<<< HEAD
        {!isAuthenticated && (
          <div className="auth-prompt">
            <Link to="/login" className="auth-link">Log in</Link> or{" "}
            <Link to="/register" className="auth-link">register</Link> to make a purchase.
          </div>
        )}

        {isAuthenticated && (
          <div className="payment-section">
            <div className="form-group">
              <label htmlFor="phone">M-Pesa Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder="254712345678"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 12));
                  setPaymentError(null);
                }}
                className={`form-input ${paymentError ? "error" : ""}`}
                disabled={paymentLoading}
              />
              <small>Format: 254 followed by 9 digits (e.g., 254712345678)</small>
            </div>
            
            {paymentError && (
              <div className="alert error">
                <i className="icon-warning"></i> {paymentError}
              </div>
            )}
            
            {paymentSuccess && (
              <div className="alert success">
                <i className="icon-check"></i> Payment initiated! Check your phone to complete the transaction.
              </div>
            )}
          </div>
        )}

        <div className="reviews-section">
          <div className="section-header">
            <h2>Customer Reviews</h2>
            <button
              className="text-btn"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              {showReviewForm ? "Cancel" : "Write a Review"}
            </button>
          </div>

          {showReviewForm && (
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Your Rating</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${star <= rating ? "active" : ""}`}
                      onClick={() => setRating(star)}
                      aria-label={`${star} star`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="review">Your Review</label>
                <textarea
                  id="review"
                  placeholder="Share your thoughts about this product..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="4"
                  required
                />
              </div>
              
              <button type="submit" className="submit-btn" disabled={!review.trim() || rating === 0}>
                Submit Review
              </button>
            </form>
          )}

          {loadingReviews ? (
            <div className="loading-reviews">
              <div className="spinner small"></div>
              <p>Loading reviews...</p>
            </div>
          ) : errorReviews ? (
            <div className="alert info">
              <i className="icon-info"></i> {errorReviews}
            </div>
=======
        <p className="product-card-description">
          {product.product_description || "No description available."}
        </p>

        <button
          className="leave-review-btn"
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? "Cancel Review" : "Leave a Review"}
        </button>

        {showReviewForm && (
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <textarea
              placeholder="Write your review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= rating ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        )}

        <div className="reviews-section">
          <h2>Customer Reviews</h2>
          {loadingReviews ? (
            <p>Loading reviews...</p>
          ) : errorReviews ? (
            <p className="error-message">{errorReviews}</p>
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
          ) : reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="review-user">{review.user}</span>
                    <span className="review-rating">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </span>
                    <span className="review-date">{review.date}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
<<<<<<< HEAD
            <div className="alert info">
              <i className="icon-info"></i> No reviews yet. Be the first to review this product!
            </div>
          )}
        </div>

        <div className="product-meta">
          <div className="meta-item">
            <i className="icon-tag"></i>
            <span>SKU: {product.sku || "N/A"}</span>
          </div>
          <div className="meta-item">
            <i className="icon-category"></i>
            <span>Category: {product.category || "N/A"}</span>
          </div>
          <div className="meta-item">
            <i className="icon-truck"></i>
            <span>Delivery: Free shipping on orders over KSh 2000</span>
          </div>
        </div>
=======
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back to Previous Page
        </button>
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
      </div>
    </div>
  );
};

<<<<<<< HEAD
ProductCard.propTypes = {
  productId: PropTypes.string,
};

=======
>>>>>>> 1925eb20dab2b19de1a47f68a1d1327212d72e66
export default ProductCard;