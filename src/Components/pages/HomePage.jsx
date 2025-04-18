import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "../common/Carousel";
import "../../index.css"; 
const Homepage = () => {
  // State for products
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState("");

  const navigate = useNavigate();
  const { categoryId } = useParams();
  const img_url = "https://alvins.pythonanywhere.com/static/images/";

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError("");
    try {
      let url = categoryId 
        ? `https://alvins.pythonanywhere.com/api/getproducts?category_id=${categoryId}`
        : "https://alvins.pythonanywhere.com/api/getproducts";

      const { data } = await axios.get(url);
      const formattedProducts = data.map((product) => ({
        ...product,
        product_photo: product.product_photo
          ? `${img_url}${product.product_photo}`
          : `${img_url}placeholder.jpg`,
      }));
      setProducts(formattedProducts);
    } catch (err) {
      console.error("Products fetch error:", err);
      setProductsError("Failed to load products. Please refresh.");
    } finally {
      setProductsLoading(false);
    }
  }, [categoryId]);

  // Initial data fetch
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handlers
  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, { state: { product } });
  };
  const handleAddToCart = async (product) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      await axios.post("https://alvins.pythonanywhere.com/api/orders", {
        user_id,
        product_id: product.id,
        quantity: 1,
        total_price: product.product_cost * 1,
        order_status: "pending",
      });
      alert("Added to cart!");
    } catch (err) {
      console.error("Cart error:", err);
      alert(err.response?.data?.error || "Failed to add to cart");
    }
  };

  return (
    <div className="homepage-container">
      {/* Carousel Section */}
      <div className="carousel-section">
        <Carousel />
      </div>

      {/* Loading/Error States */}
      {productsLoading && <div className="loading-message">Loading products...</div>}
      {productsError && <div className="error-message">{productsError}</div>}

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.product_photo}
              className="product-img"
              alt={product.product_name}
              onError={(e) => (e.target.src = `${img_url}placeholder.jpg`)}
            />
            <div className="product-card-body">
              <h5 className="product-name">{product.product_name}</h5>
              <div className="product-price">KSh {product.product_cost}</div>
              <div className="product-actions">
                <button onClick={(e) => e.stopPropagation()}>❤️</button>
                <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                  🛒
                </button>
                <button onClick={(e) => e.stopPropagation()}>⭐</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;