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

  const allowedDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@hotmail.com",
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
            <input
              type="text"
              id="email"
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

/*
import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal";

function LoginPage() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
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

    console.log("Logging in with contact:", trimmedContact, "and password:", password);
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src="/Sign_up.png" alt="Intel Core i7 10th Gen" className="signup-image" />
      </div>

      <div className="signup-right">
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email or Phone Number</label>
            <input
              type="text"
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
       
          
  

        <p className="login-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      <AlertModal isOpen={alertOpen} onClose={() => setAlertOpen(false)} message={alertMessage} />
    </div>
  );
};

export default LoginPage;



/*
import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import AlertModal from "./AlertModal";

function LoginPage() {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const allowedDomains = [
    "@gmail.com",
    "@yahoo.com",
    "@outlook.com",
    "@hotmail.com",
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
        <img
          src="/Sign_up.png"
          alt="Intel Core i7 10th Gen"
          className="signup-image"
        />
      </div>

      <div className="signup-right">
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email or Phone Number</label>
            <input
              type="text"
              id="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button type="submit" className="btn btn-primary2">
              Log In
            </button>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>

        <p className="login-link">
          Don't you have an account? <Link to="/signup">Sign up</Link>
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
*/
/*
import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
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
        <h2>Log in to Exclusive</h2>
        <p>Enter your details below</p>

        <form className="signup-form">
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

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button type="submit" className="btn btn-primary2">
              Log In
            </button>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
        </form>

        <p className="login-link">
          Don't you have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
*/
