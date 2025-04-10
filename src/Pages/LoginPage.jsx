import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal";
import signup from "../../Sign_up.png";

function LoginPage() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isValid, setIsValid] = useState(null);

  const algerianPhoneRegex = /^(05|06|07)\d{8}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateContact = (value) => {
    const trimmedValue = value.trim().toLowerCase();
    const isEmailValid = emailRegex.test(trimmedValue);
    const isPhoneValid = algerianPhoneRegex.test(trimmedValue);

    if (trimmedValue.length > 0) {
      setIsValid(isEmailValid || isPhoneValid);
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedContact = contact.trim().toLowerCase();
    const isEmailValid = emailRegex.test(trimmedContact);
    const isPhoneValid = algerianPhoneRegex.test(trimmedContact);

    if (!isEmailValid && !isPhoneValid) {
      setAlertMessage(
        `Please enter a valid email (e.g., user@example.com) or a valid Algerian phone number (10 digits starting with 05, 06, or 07).`
      );
      setAlertOpen(true);
      return;
    }

    console.log(
      "Logging in with contact:",
      trimmedContact,
      "and password:",
      password
    );
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <Link to="/">
          <img
            src={signup}
            alt="Intel Core i7 10th Gen"
            className="signup-image"
          />
        </Link>
      </div>

      <div className="signup-right">
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email or Phone Number</label>
            <div className="input-container">
              <input
                type="text"
                id="email"
                placeholder="Enter your email or phone number"
                value={contact}
                className={
                  isValid === true
                    ? "input-valid"
                    : isValid === false
                    ? "input-error"
                    : ""
                }
                onChange={(e) => {
                  setContact(e.target.value);
                  validateContact(e.target.value);
                }}
              />
              {contact.trim().length > 0 && isValid === false && (
                <span className="icon icon-error">✖</span>
              )}
              {contact.trim().length > 0 && isValid === true && (
                <span className="icon icon-valid">&#10003;</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary2">
              Log In
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
