import React, { useState } from "react";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal";

function SignupPage() {
  const [contact, setContact] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const allowedDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
  const algerianPhoneRegex = /^(05|06|07)\d{8}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedContact = contact.trim().toLowerCase();
    const isEmailValid = allowedDomains.some((domain) => trimmedContact.endsWith(domain));
    const isPhoneValid = algerianPhoneRegex.test(trimmedContact);

    if (!isEmailValid && !isPhoneValid) {
      setAlertMessage(
        `Enter a valid email (ending with: ${allowedDomains.join(", ")}) or a valid Algerian phone number (10 digits starting with 05, 06, or 07).`
      );
      setAlertOpen(true);
      return;
    }
    // Proceed with signup logic
    console.log("Form submitted with contact:", trimmedContact);
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src="/Sign_up.png" alt="Intel Core i7 10th Gen" className="signup-image" />
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
            <input
              type="text"
              id="contact"
              placeholder="Enter your email or phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          <div className="separator">OR</div>
          <button type="button" className="btn-google">
            <img src="/Google.webp" alt="Google" className="google-icon" /> Sign up with Google
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>

      <AlertModal isOpen={alertOpen} onClose={() => setAlertOpen(false)} message={alertMessage} />
    </div>
  );
}

export default SignupPage;



/*
import React, { useState } from "react";
import "./SignupPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal"; 

function SignupPage() {
  const [contact, setContact] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const allowedDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@hotmail.com"
  ];

  const algerianPhoneRegex = /^(05|06|07)\d{8}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedContact = contact.trim().toLowerCase();

    const isEmailValid = allowedDomains.some((domain) =>
      trimmedContact.endsWith(domain)
    );

    const isPhoneValid = algerianPhoneRegex.test(trimmedContact);

    if (!isEmailValid && !isPhoneValid) {
      setAlertMessage(
        `Enter a valid email (ending with: ${allowedDomains.join(
          ", "
        )}) or a valid Algerian phone number (10 digits starting with 05, 06, or 07).`
      );
      setAlertOpen(true);
      return;
    }
    console.log("Form submitted with contact:", trimmedContact);
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="/Sign_up.png"
          alt="Intel Core i7 10th Gen"
          className="signup-image"
        />
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
            <input
              type="text"
              id="contact"
              placeholder="Enter your email or phone number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
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
          <button type="button" className="btn btn-google">
            <img src="/Google.webp" alt="Google" className="google-icon" />
            Sign up with Google
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






/*
import React from "react";
import "./SignupPage.css";
import { Link } from "react-router-dom"; 

function SignupPage() {
  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="/Sign_up.png"
          alt="Intel Core i7 10th Gen"
          className="signup-image"
        />
      </div>

      <div className="signup-right">
        <h2>Create an account</h2>
        <p>Enter your details below</p>

        <form className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email or Phone Number</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email or phone number"
            />
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
          <button className="btn btn-google">
            <img src="/Google.webp" alt="Google" className="google-icon" />
            Sign up with Google
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
*/