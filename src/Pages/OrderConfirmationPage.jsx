import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./OrderConfirmationPage.css";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { orderId, message } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="confirmation-page">
        <div className="confirmation-container">
          <div className="confirmation-header">
            <div className="confirmation-icon">
              <i className='bx bx-check-circle'></i>
            </div>
            <h1>Order Successful!</h1>
            <p>{message || "Your order has been placed successfully."}</p>
            {orderId && <p className="order-id">Order ID: #{orderId}</p>}
          </div>

          <div className="confirmation-content">
            <div className="confirmation-message">
              <p>
                Thank you for your purchase! We've received your order and are getting it ready.
                A confirmation email has been sent to your registered email address.
              </p>
              <p>
                You can track your order status in the "My Orders" section of your account.
              </p>
            </div>

            <div className="help-box">
              <h3>Need help?</h3>
              <p>
                If you have any questions about your order, please contact our customer support team at
                shop.gearbyte@gmail.com.
              </p>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/orders" className="track-btn">
              <i className='bx bx-package'></i> Track My Order
            </Link>
            <Link to="/" className="home-btn">
              <i className="bx bx-home"></i> Return to Home
            </Link>
            <Link to="/ourproducts" className="shop-btn">
              <i className="bx bx-shopping-bag"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default OrderConfirmationPage;
