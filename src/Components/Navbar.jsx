import React, { useState } from 'react';
import { Link } from 'react-router-dom';  
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navbar">
       
        <Link to="/" className="logo">
          <span>Gear</span>Byte
        </Link>

       
        <nav className={`navx ${menuOpen ? "show" : ""}`}>
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rent">RentPcs</Link>
            </li>
            <li className="dropdown">
            
              <span>
                OurProducts<i className="bx bx-chevron-down"></i>
              </span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/monitors">Monitors</Link>
                </li>
                <li>
                  <Link to="/accessories">Accessories</Link>
                </li>
                <li>
                  <Link to="/desktop">Desktop</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link to="/contactus">ContactUs</Link>
            </li>
          </ul>
        </nav>

      
        <Link to="/cart" className="bx bx-cart"></Link>
        
        <i 
          className={`bx bx-menu ${menuOpen ? "active" : ""}`} 
          id="menu-icon" 
          onClick={() => setMenuOpen(!menuOpen)}
        ></i>

       
        <Link to="/login" className="btn" id="login">
          Login
        </Link>

        <Link to="/profile" className="bx bx-user"></Link>
      </nav>

    
      <input type="text" placeholder="Recherche" className="input"/>
    </header>
  );
};

export default Navbar;
