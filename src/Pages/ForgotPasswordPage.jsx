import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchApi } from "../utils/fetchWithAuth";
import AlertModal from "./AlertModal";
import signup from "../../Sign_up.png";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetchApi('auth/password/reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setAlertType('success');
      setAlertMessage('Password reset instructions have been sent to your email');
      setEmail('');
    } catch (error) {
      setAlertType('error');
      setAlertMessage(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setAlertOpen(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <Link to="/">
          <img src={signup} alt="Reset Password Visual" className="signup-image" />
        </Link>
      </div>

      <div className="signup-right">
        <h2>Forgot Password</h2>
        <p>Enter your email address below to reset your password</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              // placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        <p className="login-link">
          Remember your password? <Link to="/login">Log in</Link>
        </p>
      </div>

      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
        type={alertType}
      />
    </div>
  );
}

export default ForgotPasswordPage;