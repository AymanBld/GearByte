import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./RentDetails.css";

const RentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rentItem = location.state?.rentItem;
  const imagesArray = rentItem?.images || [rentItem?.image];
  const [mainImage, setMainImage] = useState(imagesArray[0]);
  const [showRentForm, setShowRentForm] = useState(false);
  const [formData, setFormData] = useState({
    return_date: "",
    payment_method: "cash"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Calculate minimum return date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minReturnDate = tomorrow.toISOString().split('T')[0];

  if (!rentItem) {
    return <h2 className="rent-details-not-found">Item not found.</h2>;
  }

  const paymentMethods = [
    { id: 'edahabia', label: 'Edahabia', icon: 'bx bx-credit-card' },
    { id: 'cib', label: 'CIB', icon: 'bx bx-credit-card' },
    { id: 'cash', label: 'Cash on Delivery', icon: 'bx bx-money' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      if (!formData.return_date) {
        throw new Error("Please select a return date");
      }

      // Convert the date to the required format
      const formattedDate = new Date(formData.return_date).toISOString();

      const response = await fetchWithAuth('/rental/rent/', {
        method: 'POST',
        body: JSON.stringify({
          pc: rentItem.id,
          return_date: formattedDate,
          payment_method: formData.payment_method
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to rent PC');
      }

      // Close the form and reset it
      setShowRentForm(false);
      setFormData({
        return_date: "",
        payment_method: "cash"
      });
      
      // Show success message (you'll need to add this state)
      setSuccessMessage("Rental completed successfully!");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const specifications = [
    { icon: 'bx bxs-microchip', label: 'Processor', value: rentItem.processor },
    { icon: 'bx bxs-chip', label: 'RAM', value: rentItem.ram },
    { icon: 'bx bxs-hdd', label: 'Storage', value: rentItem.storage },
    { icon: 'bx bxs-devices', label: 'Graphics Card', value: rentItem.graphics },
    { icon: 'bx bxs-window-alt', label: 'Display Size', value: rentItem.display },
    { icon: 'bx bxs-network-chart', label: 'Connectivity', value: rentItem.connectivity }
  ];

  return (
    <>
      <div className="rent-details-page">
        {successMessage && (
          <div className="success-message">
            <i className='bx bx-check-circle'></i>
            {successMessage}
          </div>
        )}
        <button onClick={() => navigate(-1)} className="rent-details-back-button">
          &larr; Back
        </button>

        <div className="rent-details-container">
          <div className="rent-details-left">
            <div className="rent-details-images">
              <img
                src={mainImage}
                alt={rentItem.name}
                className="rent-details-main-image"
              />
              <div className="rent-details-thumbnail-row">
                {imagesArray.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`rent-details-thumbnail ${mainImage === img ? "selected" : ""}`}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rent-details-right">
            <div className="rent-details-header">
              <h1 className="rent-details-name">{rentItem.name}</h1>
              <div className="rent-details-status">
                <span className={`status-badge ${rentItem.status.toLowerCase()}`}>
                  {rentItem.status}
                </span>
              </div>
            </div>

            <div className="rent-details-pricing">
              <div className="price-tag">
                <span className="amount">{rentItem.price}</span>
                <span className="currency">DA</span>
                <span className="period">/day</span>
              </div>
              {rentItem.original_price && (
                <span className="original-price">{rentItem.original_price} DA/day</span>
              )}
            </div>

            <div className="rent-details-description">
              <h3>Description</h3>
              <p>{rentItem.description}</p>
            </div>

            <div className="rent-details-specs">
              <h3>Specifications</h3>
              <div className="specs-grid">
                {specifications.map((spec, index) => (
                  spec.value && (
                    <div key={index} className="spec-item">
                      <i className={spec.icon}></i>
                      <div className="spec-content">
                        <span className="spec-label">{spec.label}</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            <div className="rent-details-actions">
              {!showRentForm ? (
                <button 
                  className={`rent-now-btn ${rentItem.status.toLowerCase() === 'unavailable' ? 'unavailable' : ''}`}
                  disabled={rentItem.status.toLowerCase() === 'unavailable'}
                  onClick={() => setShowRentForm(true)}
                >
                  <i className='bx bx-cart-add'></i>
                  {rentItem.status.toLowerCase() === 'unavailable' ? 'Currently Unavailable' : 'Rent Now'}
                </button>
              ) : (
                <div className="rent-form-overlay">
                  <div className="rent-form">
                    <div className="rent-form-header">
                      <h3>Complete Your Rental</h3>
                      <button 
                        className="close-button"
                        onClick={() => {
                          setShowRentForm(false);
                          setError("");
                          setFormData({ return_date: "", payment_method: "cash" });
                        }}
                      >
                        <i className='bx bx-x'></i>
                      </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="form-section">
                        <h4>Return Date</h4>
                        <div className="date-input-wrapper">
                          <i className='bx bx-calendar'></i>
                          <input
                            type="date"
                            id="return_date"
                            min={minReturnDate}
                            value={formData.return_date}
                            onChange={(e) => setFormData({
                              ...formData,
                              return_date: e.target.value
                            })}
                            required
                          />
                        </div>
                      </div>

                      <div className="form-section">
                        <h4>Payment Method</h4>
                        <div className="payment-methods-grid">
                          {paymentMethods.map(method => (
                            <div 
                              key={method.id}
                              className={`payment-method-card ${formData.payment_method === method.id ? 'selected' : ''}`}
                              onClick={() => setFormData({
                                ...formData,
                                payment_method: method.id
                              })}
                            >
                              <div className="payment-method-icon">
                                <i className={method.icon}></i>
                              </div>
                              <span className="payment-method-label">{method.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {error && <div className="error-message">{error}</div>}

                      <div className="form-actions">
                        <button 
                          type="submit" 
                          className="confirm-btn"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="loading">
                              <i className='bx bx-loader-alt bx-spin'></i>
                              Processing...
                            </span>
                          ) : (
                            <>
                              Confirm Rental
                              <i className='bx bx-right-arrow-alt'></i>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Copyright />
    </>
  );
};

export default RentDetails;
