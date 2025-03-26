import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false }); 
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100); 
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <nav className="navbar">
        <a onClick={() => handleScroll("Hero")} className="logo" style={{ cursor: "pointer" }}>
          <span>Gear</span>Byte
        </a>

        <div className={`navx ${menuOpen ? "show" : ""}`}>
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rentservice">RentPcs</Link>
            </li>
            <li className="dropdown">
              <Link to="/ourproducts">
                OurProducts <i className="bx bx-chevron-down"></i>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/computerlisting">Computers</Link>
                </li>
                <li>
                  <Link to="/monitorlisting">Monitors</Link>
                </li>
                <li>
                  <Link to="/accessorylisting">Accessories</Link>
                </li>
              </ul>
            </li>
            <li>
              <a onClick={() => handleScroll("Reviews")} style={{ cursor: "pointer" }}>
                Reviews
              </a>
            </li>
            <li>
              <a onClick={() => handleScroll("Contactus")} style={{ cursor: "pointer" }}>
                Contactus
              </a>
            </li>
          </ul>
        </div>

        <Link to="/cart">
          <i className="bx bx-cart"></i>
        </Link>
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
        <Link to="/login">
          <i className="bx bx-user"></i>
        </Link>
      </nav>

      <input type="text" placeholder="Search" className="input" />
    </header>
  );
};

export default Nav;

