import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { fetchApi } from "../../utils/fetchWithAuth";
import "./Nav.css";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [username, setUsername] = useState('');  // Add this state
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
    // Check authentication status and fetch username
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      fetchUsername();
    }

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Add this function to fetch username
  const fetchUsername = async () => {
    try {
      const response = await fetchApi('auth/user/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username || `${data.first_name} ${data.last_name}`.trim() || 'User');
      }
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleStorageChange = (e) => {
    if (e.key === 'token') {
      setIsLoggedIn(!!e.newValue);
      if (e.newValue) {
        fetchUsername();
      } else {
        setUsername('');
      }
    }
  };

  // Modify the handleLogout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserMenuOpen(false);
    setUsername('');
    navigate('/');
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchApi('Store/category/');
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
  const isRentActive = location.pathname === "/rentpcs" || 
    location.pathname === "/rentlisting" ||
    location.pathname.startsWith("/rentdetails");

  const isOurProductsActive =
    location.pathname === "/ourproducts" ||
    categories.some(cat => location.pathname === `/${cat.name}`) ||
    location.pathname.startsWith("/product/");

  const isCartActive = location.pathname === "/cart";

  const isProfileActive = location.pathname === "/profile";
  const isOrdersActive = location.pathname === "/orders";
  const isAddressesActive = location.pathname === "/addresses";
  const isNotificationsActive = location.pathname === "/notifications";

  useEffect(() => {
    // Close user menu when clicking outside
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add this function to handle dropdown item clicks
  const handleDropdownItemClick = () => {
    setUserMenuOpen(false);
  };

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
                to="/rentpcs"
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
        
        {isLoggedIn ? (
          <div className="user-avatar-container" ref={userMenuRef}>
            <div 
              className="user-avatar"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <i className="bx bx-user"></i>
            </div>
            
            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="dropdown-header">
                  <i className="bx bx-user-circle"></i>
                  <span>{username}</span>
                </div>
                <div className="dropdown-divider"></div>
                <Link 
                  to="/profile" 
                  className="dropdown-item"
                  style={{ 
                    backgroundColor: isProfileActive ? '#f8f9fa' : 'transparent',
                    color: isProfileActive ? activeColor : 'inherit'
                  }}
                  onClick={handleDropdownItemClick}
                >
                  <i className="bx bx-user-pin" style={{ 
                    color: isProfileActive ? activeColor : 'inherit'
                  }}></i>
                  <span>Profile Settings</span>
                </Link>
                <Link 
                  to="/orders" 
                  className="dropdown-item"
                  style={{ 
                    backgroundColor: isOrdersActive ? '#f8f9fa' : 'transparent',
                    color: isOrdersActive ? activeColor : 'inherit'
                  }}
                  onClick={handleDropdownItemClick}
                >
                  <i className="bx bx-package" style={{ 
                    color: isOrdersActive ? activeColor : 'inherit'
                  }}></i>
                  <span>My Orders</span>
                </Link>
                <Link 
                  to="/addresses" 
                  className="dropdown-item"
                  style={{ 
                    backgroundColor: isAddressesActive ? '#f8f9fa' : 'transparent',
                    color: isAddressesActive ? activeColor : 'inherit'
                  }}
                  onClick={handleDropdownItemClick}
                >
                  <i className="bx bx-map" style={{ 
                    color: isAddressesActive ? activeColor : 'inherit'
                  }}></i>
                  <span>Saved Addresses</span>
                </Link>
                <Link 
                  to="/notifications" 
                  className="dropdown-item"
                  style={{ 
                    backgroundColor: isNotificationsActive ? '#f8f9fa' : 'transparent',
                    color: isNotificationsActive ? activeColor : 'inherit'
                  }}
                  onClick={handleDropdownItemClick}
                >
                  <i className="bx bx-bell" style={{ 
                    color: isNotificationsActive ? activeColor : 'inherit'
                  }}></i>
                  <span>Notifications</span>
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout-item">
                  <i className="bx bx-log-out"></i>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">
              <button className="btn" id="login">
                Login
              </button>
            </Link>
            <Link to="/login">
              <i className="bx bx-user"></i>
            </Link>
          </>
        )}
      </nav>
      <input type="text" placeholder="Search" className="input" />
    </header>
  );
};

export default Nav;
