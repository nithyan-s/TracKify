import React, { useState, useEffect } from 'react';
import { FaBell, FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import './BuyerDashboard.css';
import Header from '../../components/Header';
import axios from 'axios';

const BuyerDashboard = () => {
  const [sortBy, setSortBy] = useState('recent');
  const [filter, setFilter] = useState('all');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyerId, setBuyerId] = useState('6803af2dbffd5bdcee8fa872'); // Initial value but can be updated

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const productsResponse = await axios.get('http://localhost:8080/buyer/products');
        setProducts(productsResponse.data.products);
        
        // Fetch buyer ID
        try {
          const buyerResponse = await axios.get('http://localhost:8080/buyer/me');
          if (buyerResponse.data && buyerResponse.data.buyerId) {
            setBuyerId(buyerResponse.data.buyerId);
          }
        } catch (buyerErr) {
          console.warn('Could not fetch buyer ID, using default:', buyerErr);
          // Continue with default buyerId if fetch fails
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sample notifications - in a real app, these would come from the backend
  const notifications = [
    'Your order #123 has shipped',
    'New products from your favorite sellers',
    'Special discount available'
  ];

  // Handle buy button click
  const handleBuyProduct = async (productId) => {
    try {
      // Create payload according to your API requirements
      const payload = {
        quantity: 1
      };

      console.log(`Sending buy request for product ${productId} by buyer ${buyerId}`);
      
      const response = await axios.post(
        `http://localhost:8080/buyer/${buyerId}/product/${productId}/buy`,
        payload
      );
      
      // Show success message
      alert(`Order placed successfully! Status: ${response.data.order.status}`);
      console.log('Order response:', response.data);
      
    } catch (err) {
      console.error('Error buying product:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="buyer-dashboard">
      <Header/>
      {/* Main Content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search products..." />
          </div>
          
          <div className="sidebar-section">
            <h3><FaSortAmountDown /> Sort By</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="recent">Most Recent</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Seller Rating</option>
            </select>
          </div>
          
          <div className="sidebar-section">
            <h3><FaFilter /> Filter</h3>
            <div className="filter-group">
              <label>Category</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                <option value="sports">Sports</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Kitchen</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Price Range</label>
              <div className="price-range">
                <span>$0</span>
                <input 
                  type="range" 
                  min="0" 
                  max="500" 
                  className="price-slider"
                />
                <span>$500+</span>
              </div>
            </div>
            
            <button className="apply-filters">Apply Filters</button>
          </div>
        </aside>

        {/* Product Display */}
        <main className="product-display">
          {loading ? (
            <div className="loading-message">Loading products...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <div className="product-grid-header">
                <span className="grid-header-item">Product</span>
                <span className="grid-header-item">Price</span>
                <span className="grid-header-item">Quantity</span>
                <span className="grid-header-item">Seller</span>
                <span className="grid-header-item">Action</span>
              </div>
              
              {products.length > 0 ? (
                products.map(product => (
                  <div key={product._id} className="product-grid-row">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">${product.cost ? product.cost.toFixed(2) : 'N/A'}</span>
                    <span className="product-quantity">{product.qty || 'N/A'} available</span>
                    <span className="product-seller">
                      {product.sellerId ? product.sellerId.name : 'No Seller'}
                    </span>
                    <button 
                      className="buy-button" 
                      onClick={() => handleBuyProduct(product._id)}
                      disabled={!product.sellerId} // Disable button if no seller
                    >
                      BUY NOW
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-products-message">No products available</div>
              )}
            </>
          )}
        </main>

        {/* Notifications Dropdown Toggle */}
        <div className="notification-bell" onClick={() => setNotificationsOpen(!notificationsOpen)}>
          <FaBell />
        </div>

        {/* Notifications Dropdown */}
        {notificationsOpen && (
          <div className="notifications-dropdown-overlay">
            <div className="notifications-dropdown">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                <button 
                  onClick={() => setNotificationsOpen(false)}
                  className="close-dropdown"
                >
                  ×
                </button>
              </div>
              <div className="notifications-list">
                {notifications.map((note, index) => (
                  <div key={index} className="notification-item">
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;