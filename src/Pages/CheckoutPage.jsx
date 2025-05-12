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
    setIsSubmitting(true);
    setErrors({});
    
    const newErrors = {};
    
    if (!userInfo.phone) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!selectedAddressId) {
      newErrors.address = "Please select a delivery address";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const orderData = {
        address: selectedAddressId,
        payment_method: selectedPayment,
        phone: userInfo.phone
      };
      
      const response = await fetchWithAuth('Store/order/checkout/', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create order');
      }
      
      const data = await response.json();
      
      if (selectedPayment === 'cash') {
        navigate('/orderconfirmation', { 
          state: { 
            orderId: data.id,
            message: data.message || 'Order created successfully'
          } 
        });
      } else {
        if (data.payment_response && data.payment_response.checkout_url) {
          window.location.href = data.payment_response.checkout_url;
        } else {
          throw new Error('Payment URL not available. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setErrors({
        submit: error.message || 'Failed to create order. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-header">
            <h1>Checkout</h1>
          </div>

          <div className="checkout-content">
            <div className="checkout-form-column">
              <form onSubmit={handleSubmit}>
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

            <div className="checkout-summary-column">
              <div className="checkout-section summary">
                <h2>Order Summary</h2>
                <div className="summary-content">
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
