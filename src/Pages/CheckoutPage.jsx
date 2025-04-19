import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [cartItems, setCartItems] = useState([]);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { id: 'edahabia', label: 'Edahabia', icon: 'bx bx-credit-card' },
    { id: 'cib', label: 'CIB', icon: 'bx bx-credit-card' },
    { id: 'cash', label: 'Cash on Delivery', icon: 'bx bx-money' }
  ];

  useEffect(() => {
    fetchUserAddresses();
    fetchUserInfo();
    fetchCartItems();
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const response = await fetchWithAuth('Store/address/');
      if (!response.ok) throw new Error('Failed to fetch addresses');
      const data = await response.json();
      setUserAddresses(data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetchWithAuth('auth/user/');
      if (!response.ok) throw new Error('Failed to fetch user info');
      const data = await response.json();
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await fetchWithAuth('Store/cart/');
      if (!response.ok) throw new Error('Failed to fetch cart items');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your submit logic here
  };

  return (
    <>
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-header">
            <h1>Checkout</h1>
          </div>

          <div className="checkout-content">
            {/* Left Column - Form */}
            <div className="checkout-form-column">
              <form onSubmit={handleSubmit}>
                {/* Phone Section */}
                <div className="checkout-section">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
                      <i className='bx bx-phone'></i>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userInfo.phone || ''}
                        onChange={(e) => setUserInfo(prev => ({...prev, phone: e.target.value}))}
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                  </div>
                </div>

                {/* Delivery Section */}
                <div className="checkout-section">
                  <div className="section-header">
                    <h2>Delivery Address</h2>
                    <Link to="/addresses" className="add-address-link">
                      <i className='bx bx-plus'></i> Add New Address
                    </Link>
                  </div>
                  <div className="form-group">
                    <div className="select-wrapper">
                      <i className='bx bx-map'></i>
                      <select
                        value={selectedAddressId}
                        onChange={(e) => setSelectedAddressId(e.target.value)}
                        required
                      >
                        <option value="">Select delivery address</option>
                        {userAddresses.map(address => (
                          <option key={address.id} value={address.id}>
                            {address.street}, {address.city}, {address.country}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.address && <p className="error-message">{errors.address}</p>}
                  </div>
                </div>

                {/* Payment Section */}
                <div className="checkout-section">
                  <h2>Payment Method</h2>
                  <div className="payment-methods-grid">
                    {paymentMethods.map(method => (
                      <div 
                        key={method.id}
                        className={`payment-method-card ${selectedPayment === method.id ? 'selected' : ''}`}
                        onClick={() => setSelectedPayment(method.id)}
                      >
                        <div className="payment-method-icon">
                          <i className={method.icon}></i>
                        </div>
                        <span className="payment-method-label">{method.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="checkout-summary-column">
              <div className="checkout-section summary">
                <h2>Order Summary</h2>
                <div className="summary-content">
                  {/* Products List */}
                  <div className="products-list">
                    {cartItems.map(item => (
                      <div key={item.id} className="product-summary-row">
                        <div className="product-summary-info">
                          <span className="product-quantity">×{item.quantity}</span>
                          <span className="product-name">{item.product.name}</span>
                          <span className="product-price">
                            {(item.product.price * item.quantity).toFixed(2)} DA
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="order-summary">
                    <div className="summary-item">
                      <span>Subtotal</span>
                      <span>{calculateTotal().toFixed(2)} DA</span>
                    </div>
                    <div className="summary-item">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="summary-item total">
                      <span>Total</span>
                      <span>{calculateTotal().toFixed(2)} DA</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="checkout-button"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <span className="loading">
                      <i className='bx bx-loader-alt bx-spin'></i>
                      Processing...
                    </span>
                  ) : (
                    <>
                      Complete Order
                      <i className='bx bx-right-arrow-alt'></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default CheckoutPage;
