import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
        <a href="#Hero" className="logo">
          <span>Gear</span>Byte
        </a>

        <div className={`navx ${menuOpen ? "show" : ""}`}>
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>
              <a href="#Hero">Home</a>
            </li>
            <li>
              <a href="#Rent">RentPcs</a>
            </li>
            <li className="dropdown">
              <a href="#buy">
                OurProducts<i className="bx bx-chevron-down"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="#cpu">Monitors</a>
                </li>
                <li>
                  <a href="#Accessoires">Accessories</a>
                </li>
                <li>
                  <a href="#monitors">Desktop</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#Reviews">Reviews</a>
            </li>
            <li>
              <a href="#Contactus">Contactus</a>
            </li>
          </ul>
        </div>

        <i className="bx bx-cart"></i>
        <i
          className={`bx bx-menu ${menuOpen ? "active" : ""}`}
          id="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>
        <Link to="/login">
          <button className="btn" id="login">
            Login
          </button>
        </Link>
        <i className="bx bx-user"></i>
      </nav>

      <input type="text" placeholder="Search" className="input" />
    </header>
  );
};

export default Nav;
