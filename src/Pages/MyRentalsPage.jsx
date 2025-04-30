import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./MyRentalsPage.css";

const MyRentalsPage = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('rental/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch rentals');
      }
      
      const data = await response.json();
      setRentals(data.results || data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusClass = (isActive) => {
    return isActive ? "status-active" : "status-completed";
  };

  const getStatusText = (isActive) => {
    return isActive ? "Active" : "Completed";
  };

  const calculateDaysLeft = (returnDate) => {
    const today = new Date();
    const end = new Date(returnDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="rentals-page">
        <div className="rentals-container">
          <div className="rentals-loading">Loading rentals...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rentals-page">
        <div className="rentals-container">
          <div className="rentals-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rentals-page">
        <div className="rentals-container">
          <h2>My Rentals</h2>
          
          {!rentals || rentals.length === 0 ? (
            <div className="no-rentals">
              <i className='bx bx-laptop'></i>
              <p>You haven't rented any PCs yet</p>
              <Link to="/rentpcs" className="rent-now-btn">Rent Now</Link>
            </div>
          ) : (
            <div className="rentals-list">
              {rentals.map((rental) => (
                <div key={rental.id} className="rental-card">
                  <div className="rental-main">
                    <div className="rental-left">
                      <div className="rental-id">Rental #{rental.id}</div>
                      <div className="rental-date">
                        <i className='bx bx-calendar'></i>
                        {formatDate(rental.rental_date)} - {formatDate(rental.return_date)}
                      </div>
                      <div className="rental-amount">
                        <i className='bx bx-money'></i>
                        {rental.total_price} DA
                      </div>
                    </div>
                    <div className="rental-right">
                      <span className={`rental-status ${getStatusClass(rental.is_active)}`}>
                        <i className='bx bx-laptop'></i>
                        {getStatusText(rental.is_active)}
                      </span>
                    </div>
                  </div>
                  <div className="rental-summary">
                    <div className="rental-pc-info">
                      <span className="rental-pc-name">{rental.pc}</span>
                      {rental.is_active && (
                        <span className="rental-days-left">
                          <i className='bx bx-time'></i>
                          {calculateDaysLeft(rental.return_date)} days left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default MyRentalsPage;







