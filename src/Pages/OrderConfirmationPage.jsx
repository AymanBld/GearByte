import React from "react";
import { Link } from "react-router-dom";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./OrderConfirmationPage.css";

const OrderConfirmationPage = () => {
  // Generate a random order number
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString();

  return (
    <>
      <div className="confirmation-page">
        <div className="confirmation-container">
          <div className="confirmation-icon">
            <i className="bx bx-check-circle"></i>
          </div>
          <h1 className="confirmation-title">Order Confirmed!</h1>
          
          <div className="order-details">
            <div className="order-info">
              <div className="info-item">
                <span className="info-label">Order Number</span>
                <span className="info-value">{orderNumber}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">{orderDate}</span>
              </div>
            </div>

            <div className="message-box">
              <h3>What happens next?</h3>
              <p>
                We've received your order and are processing it now. You'll receive an email confirmation shortly.
              </p>
              <p>
                Your order will be shipped within 1-3 business days. You'll receive tracking information once your
                order ships.
              </p>
            </div>

            <div className="help-box">
              <h3>Need help?</h3>
              <p>
                If you have any questions about your order, please contact our customer support team at
                Gearbyte@gmial.com or call us at 0655143411.
              </p>
            </div>
          </div>

          <div className="confirmation-actions">
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