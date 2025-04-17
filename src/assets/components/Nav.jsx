import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/Store/category/');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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

  const isOurProductsActive =
    location.pathname === "/ourproducts" ||
    categories.some(cat => location.pathname === `/${cat.name}`) ||
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
                {categories.map(category => (
                  <li key={category.id}>
                    <Link
                      to={`/${category.name}`}
                      style={{
                        color: location.pathname === `/${category.name}` ? activeColor : defaultColor,
                      }}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
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
          <div style={{ position: "relative" }}>
            <i
              className="bx bx-cart"
              style={{ color: isCartActive ? activeColor : defaultColor }}
            ></i>
          </div>
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
