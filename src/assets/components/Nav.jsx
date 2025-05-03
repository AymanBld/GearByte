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
  const [isAdmin, setIsAdmin] = useState(false);  // Add this state
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
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
        setIsAdmin(data.is_staff); // Set admin status
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
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
    setUserMenuOpen(false); // Close the dropdown
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    setShowLogoutConfirm(false);
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
  const isDashboardActive = location.pathname === "/dashboard";

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
    <>
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
                  className="nav-item"
                  style={{ color: isHomeActive ? activeColor : defaultColor }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/rentpcs"
                  className="nav-item"
                  style={{ color: isRentActive ? activeColor : defaultColor }}
                >
                  RentPcs
                </Link>
              </li>
              <li className="dropdown">
                <Link
                  to="/ourproducts"
                  className="nav-item"
                  style={{
                    color: isOurProductsActive ? activeColor : defaultColor,
                  }}
                >
                  OurProducts<i className="bx bx-chevron-down"></i>
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
                  className='bold'
                >
                Reviews
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleScroll("Contactus")}
                  style={{ cursor: "pointer" }}
                  className='bold'

                >
                  ContactUs
                </a>
              </li>
            </ul>
          </div>
          <Link to="/cart" className="nav-item cart-container">
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
                  
                  {isAdmin && (
                    <Link 
                      to="/dashboard" 
                      className="dropdown-item dashboard-item"
                      onClick={handleDropdownItemClick}
                    >
                      <i className="bx bxs-dashboard"></i>
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  
                  <div className="dropdown-divider"></div>
                  
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    <i className="bx bx-user-pin"></i>
                    <span>Profile Settings</span>
                  </Link>
                  
                  <Link 
                    to="/orders" 
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    <i className="bx bx-package"></i>
                    <span>My Orders</span>
                  </Link>
                  
                  <Link 
                    to="/rentals" 
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    <i className="bx bx-laptop"></i>
                    <span>My Rentals</span>
                  </Link>
                  
                  <Link 
                    to="/addresses" 
                    className="dropdown-item"
                    onClick={handleDropdownItemClick}
                  >
                    <i className="bx bx-map"></i>
                    <span>Saved Addresses</span>
                  </Link>
                  
                  <div className="dropdown-divider"></div>
                  
                  <button 
                    onClick={handleLogoutClick} 
                    className="dropdown-item logout-item"
                  >
                    <i className="bx bx-log-out"></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="btn" id="login">
                Login
              </button>
            </Link>
          )}
        </nav>
        <input type="text" placeholder="Search" className="input" />
      </header>

      {/* Add the logout confirmation dialog */}
      {showLogoutConfirm && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-header">
              <i className='bx bx-log-out'></i>
              <h3>Confirm Logout</h3>
            </div>
            <p>Are you sure you want to logout?</p>
            <div className="dialog-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="logout-btn"
                onClick={handleLogoutConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
