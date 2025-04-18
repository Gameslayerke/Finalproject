import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../../index.css";

const ProductCard = () => {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Product state
  const [product, setProduct] = useState(location.state?.product);
  const [loading, setLoading] = useState(!location.state?.product);
  const [error, setError] = useState("");

  // Review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [errorReviews, setErrorReviews] = useState("");

  // Product options
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Payment state
  const [phone, setPhone] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
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
      return;
    }

    if (!phone) {
      alert("Please enter your phone number.");
      return;
    }

    if (!validatePhoneNumber(phone)) {
      alert("Please enter a valid Kenyan phone number starting with 254.");
      return;
    }

    setPaymentLoading(true);
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
      );

      if (response.data.success) {
        setPaymentSuccess(true);
        alert("Payment initiated successfully! Check your phone to complete the payment.");
      } else {
        setPaymentError(response.data.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError("An error occurred. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

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

  if (!product) {
    navigate("/");
    return null;
  }

  return (
    <div className="product-card-container">
      <div className="product-image-section">
        <img
          src={product.product_photo}
          alt={product.product_name}
          className="product-card-image"
          onError={(e) => {
            e.target.src = "https://alvins.pythonanywhere.com/static/images/placeholder.jpg";
          }}
        />
      </div>

      <div className="product-details-section">
        <h1 className="product-card-name">{product.product_name}</h1>
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
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          
          <div className="size-options">
            <p>Size:</p>
            <div className="size-buttons">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

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
          >
            {paymentLoading ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              "Buy Now"
            )}
          </button>
        </div>

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
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default ProductCard;