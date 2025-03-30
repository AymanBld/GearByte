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
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeColor = "#EA3C3C";
  const defaultColor = "var(--text-color)";

  const isHomeActive = location.pathname === "/";
  const isRentActive =
    location.pathname === "/rentservice" ||
    location.pathname === "/rentlisting" ||
    location.pathname.startsWith("/rentdetails");

  const isComputerActive = location.pathname === "/computerlisting";
  const isMonitorActive = location.pathname === "/monitorlisting";
  const isAccessoryActive = location.pathname === "/accessorylisting";

  const isOurProductsActive =
    location.pathname === "/ourproducts" ||
    isComputerActive ||
    isMonitorActive ||
    isAccessoryActive ||
    location.pathname.startsWith("/product/");

  const isCartActive = location.pathname === "/cart";

  return (
    <header className="header">
      <nav className="navbar">
        <a
          onClick={() => handleScroll("Hero")}
          className="logo"
          style={{ cursor: "pointer" }}
        >
          <span>Gear</span>Byte
        </a>
        <div className={`navx ${menuOpen ? "show" : ""}`}>
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>
              <Link
                to="/"
                style={{ color: isHomeActive ? activeColor : defaultColor }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/rentservice"
                style={{ color: isRentActive ? activeColor : defaultColor }}
              >
                RentPcs
              </Link>
            </li>
            <li className="dropdown">
              <Link
                to="/ourproducts"
                style={{
                  color: isOurProductsActive ? activeColor : defaultColor,
                }}
              >
                OurProducts <i className="bx bx-chevron-down"></i>
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to="/computerlisting"
                    style={{
                      color: isComputerActive ? activeColor : defaultColor,
                    }}
                  >
                    Computers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/monitorlisting"
                    style={{
                      color: isMonitorActive ? activeColor : defaultColor,
                    }}
                  >
                    Monitors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/accessorylisting"
                    style={{
                      color: isAccessoryActive ? activeColor : defaultColor,
                    }}
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <a
                onClick={() => handleScroll("Reviews")}
                style={{ cursor: "pointer" }}
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                onClick={() => handleScroll("Contactus")}
                style={{ cursor: "pointer" }}
              >
                ContactUs
              </a>
            </li>
          </ul>
        </div>
        <Link to="/cart">
          <i
            className="bx bx-cart"
            style={{ color: isCartActive ? activeColor : defaultColor }}
          ></i>
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
