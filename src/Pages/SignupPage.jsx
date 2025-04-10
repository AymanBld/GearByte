import React, { useState } from "react";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal";
import signup from "../../Sign_up.png";
import google from "./Google.webp";

function SignupPage() {
  const [contact, setContact] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const algerianPhoneRegex = /^(05|06|07)\d{8}$/;

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
    console.log("Form submitted with contact:", trimmedContact);
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
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Email or Phone Number</label>
            <div className="input-container">
              <input
                type="text"
                id="contact"
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
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          <div className="separator">OR</div>
          <button type="button" className="btn-google">
            <img src={google} alt="Google" className="google-icon" /> Sign up
            with Google
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
