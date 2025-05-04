import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchApi } from "../utils/fetchWithAuth";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal";
import signup from "../../Sign_up.png";
import google from "../../Google.webp";

function SignupPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  });

  const [isValid, setIsValid] = useState({
    email: null,
    phone: null,
    password: null
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;  // Basic validation for 10-digit phone number

  const validateEmail = (value) => {
    const trimmedValue = value.trim().toLowerCase();
    const isEmailValid = emailRegex.test(trimmedValue);

    setIsValid(prev => ({
      ...prev,
      email: trimmedValue.length > 0 ? isEmailValid : null
    }));
  };

  const validatePhone = (value) => {
    const trimmedValue = value.trim();
    const isPhoneValid = phoneRegex.test(trimmedValue);

    setIsValid(prev => ({
      ...prev,
      phone: trimmedValue.length > 0 ? isPhoneValid : null
    }));
  };

  const validatePasswords = (password1, password2) => {
    if (password1 && password2) {
      setIsValid(prev => ({
        ...prev,
        password: password1 === password2
      }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    if (id === 'email') {
      validateEmail(value);
    }

    if (id === 'phone') {
      validatePhone(value);
    }

    if (id === 'password1' || id === 'password2') {
      validatePasswords(
        id === 'password1' ? value : formData.password1,
        id === 'password2' ? value : formData.password2
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const trimmedPhone = formData.phone.trim();
    const isEmailValid = emailRegex.test(trimmedEmail);
    const isPhoneValid = phoneRegex.test(trimmedPhone);

    // Validate form data
    if (!formData.username.trim()) {
      setAlertMessage("Please enter your username");
      setAlertOpen(true);
      return;
    }

    if (!isEmailValid) {
      setAlertMessage("Please enter a valid email address");
      setAlertOpen(true);
      return;
    }

    if (!isPhoneValid) {
      setAlertMessage("Please enter a valid 10-digit phone number");
      setAlertOpen(true);
      return;
    }

    if (!formData.password1) {
      setAlertMessage("Please enter a password");
      setAlertOpen(true);
      return;
    }

    if (formData.password1.length < 6) {
      setAlertMessage("Password must be at least 6 characters long");
      setAlertOpen(true);
      return;
    }

    if (formData.password1 !== formData.password2) {
      setAlertMessage("Passwords do not match");
      setAlertOpen(true);
      return;
    }

    try {
      setIsLoading(true);
      
      // Prepare the data for API - now including phone
      const signupData = {
        username: formData.username.trim(),
        email: trimmedEmail,
        phone: trimmedPhone,
        password1: formData.password1,
        password2: formData.password2
      };

      // Make API call here
      const response = await fetchApi('auth/registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.username || 'Signup failed');
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.key);
      
      // Redirect to login page or dashboard
      navigate('/login');

    } catch (error) {
      console.error("Signup error:", error);
      setAlertMessage(error.message || "Failed to create account. Please try again.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google signup logic here
    console.log("Google signup clicked");
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <Link to="/">
          <img src={signup} alt="Signup Visual" className="signup-image" />
        </Link>
      </div>

      <div className="signup-right">
        <h2>Create an account</h2>
        <p>Enter your details below</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              // placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                // placeholder="Enter your email address"
                value={formData.email}
                className={
                  isValid.email === true
                    ? "input-valid"
                    : isValid.email === false
                    ? "input-error"
                    : ""
                }
                onChange={handleChange}
              />
              {formData.email.trim().length > 0 && !isValid.email && (
                <span className="icon icon-error">✖</span>
              )}
              {formData.email.trim().length > 0 && isValid.email && (
                <span className="icon icon-valid">&#10003;</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-container">
              <input
                type="tel"
                id="phone"
                // placeholder="Enter your phone number"
                value={formData.phone}
                className={
                  isValid.phone === true
                    ? "input-valid"
                    : isValid.phone === false
                    ? "input-error"
                    : ""
                }
                onChange={handleChange}
              />
              {formData.phone.trim().length > 0 && !isValid.phone && (
                <span className="icon icon-error">✖</span>
              )}
              {formData.phone.trim().length > 0 && isValid.phone && (
                <span className="icon icon-valid">&#10003;</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              id="password1"
              // placeholder="Enter your password"
              value={formData.password1}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <div className="input-container">
              <input
                type="password"
                id="password2"
                // placeholder="Confirm your password"
                value={formData.password2}
                className={
                  formData.password2 && isValid.password === true
                    ? "input-valid"
                    : formData.password2 && isValid.password === false
                    ? "input-error"
                    : ""
                }
                onChange={handleChange}
              />
              {formData.password2 && !isValid.password && (
                <span className="icon icon-error">✖</span>
              )}
              {formData.password2 && isValid.password && (
                <span className="icon icon-valid">&#10003;</span>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
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

export default SignupPage;
