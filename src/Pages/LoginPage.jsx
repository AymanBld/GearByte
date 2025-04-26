import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/fetchWithAuth";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal";
import signup from "../../Sign_up.png";

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",  // This will store either email or username
    password: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateInput = (value) => {
    const trimmedValue = value.trim().toLowerCase();
    const isEmailValid = emailRegex.test(trimmedValue);
    const isUsernameValid = trimmedValue.length >= 3; // Minimum username length

    if (trimmedValue.length > 0) {
      setIsValid(isEmailValid || isUsernameValid);
    } else {
      setIsValid(null);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'email') {
      validateInput(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedInput = formData.email.trim();

    if (!trimmedInput) {
      setAlertMessage("Please enter your email or username");
      setAlertOpen(true);
      return;
    }

    if (!formData.password) {
      setAlertMessage("Please enter your password");
      setAlertOpen(true);
      return;
    }

    try {
      setIsLoading(true);
      // Prepare the data for API
      const loginData = {
        email: emailRegex.test(trimmedInput) ? trimmedInput : '',  
        username: !emailRegex.test(trimmedInput) ? trimmedInput : '',  
        password: formData.password
      };

      // Make API call here
      const response = await fetchApi('auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and dispatch storage event
      localStorage.setItem('token', data.key);
      
      // Dispatch a custom event for immediate state update
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'token',
        newValue: data.key,
        oldValue: null,
        storageArea: localStorage
      }));
      
      // Redirect to dashboard or home page
      navigate('/');

    } catch (error) {
      console.error("Login error:", error);
      setAlertMessage(error.message || "Invalid credentials. Please try again.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <Link to="/">
          <img src={signup} alt="Login Visual" className="signup-image" />
        </Link>
      </div>

      <div className="signup-right">
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <div className="input-container">
              <input
                type="text"
                id="email"
                placeholder="Enter your email or username"
                value={formData.email}
                className={
                  isValid === true
                    ? "input-valid"
                    : isValid === false
                    ? "input-error"
                    : ""
                }
                onChange={handleChange}
              />
              {formData.email.trim().length > 0 && !isValid && (
                <span className="icon icon-error">✖</span>
              )}
              {formData.email.trim().length > 0 && isValid && (
                <span className="icon icon-valid">&#10003;</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                className="" // Add empty class to ensure consistent handling
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </button>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>

        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      <AlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        message={alertMessage}
      />
    </div>
  );
}

export default LoginPage;
