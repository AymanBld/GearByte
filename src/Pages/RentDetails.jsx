import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchApi, fetchWithAuth} from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./RentDetails.css";

const RentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [rentItem, setRentItem] = useState(null);
  const [imagesArray, setImagesArray] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [showRentForm, setShowRentForm] = useState(false);
  const [formData, setFormData] = useState({
    rental_date: "",
    return_date: "",
    payment_method: "cash"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorToast, setErrorToast] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const today = new Date().toISOString().split('T')[0];
  
  const calculateMinReturnDate = (rentalDate) => {
    if (!rentalDate) return "";
    const minReturn = new Date(rentalDate);
    minReturn.setDate(minReturn.getDate() + 15);
    return minReturn.toISOString().split('T')[0];
  };

  useEffect(() => {
    fetchPCDetails();
  }, [id]);

  const fetchPCDetails = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(`rental/pcs/${id}/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch PC details');
      }
      
      const data = await response.json();
      
      // Transform the data to match the expected format
      const transformedData = {
        id: data.id,
        name: data.name,
        brand: data.brand,
        image: data.image,
        images: [data.image], 
        processor: data.cpu,
        ram: `${data.ram}GB`,
        storage: `${data.storage}GB`,
        graphics: data.gpu,
        display: `${data.display_size}"`,
        operating_system: data.operating_system,
        status: data.is_available ? 'Available' : 'Unavailable',
        price: data.price_per_day,
        description: data.description,
        aviability_date: data.aviability_date 
      };
      
      setRentItem(transformedData);
      setImagesArray([data.image]);
      setMainImage(data.image);
      
    } catch (err) {
      setError(err.message);
      console.error("Error fetching PC details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorToast(""); // Clear any previous error toast

      if (!formData.rental_date || !formData.return_date) {
        throw new Error("Please select both rental and return dates");
      }

      const rentalDate = new Date(formData.rental_date);
      const returnDate = new Date(formData.return_date);
      const daysDifference = Math.ceil((returnDate - rentalDate) / (1000 * 60 * 60 * 24));

      if (daysDifference < 15) {
        throw new Error("Rental period must be at least 15 days");
      }

      // Format dates as YYYY-MM-DD
      const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // Returns format: YYYY-MM-DD
      };

      const response = await fetchWithAuth('rental/', {
        method: 'POST',
        body: JSON.stringify({
          pc: rentItem.id,
          rental_date: formatDate(rentalDate),
          return_date: formatDate(returnDate),
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
        rental_date: "",
        return_date: "",
        payment_method: "cash"
      });
      
      // Show success message
      setSuccessMessage("Rental completed successfully!");
      
      // Refresh PC details to get updated availability
      fetchPCDetails();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (err) {
      // Show error toast instead of changing the page
      setErrorToast(err.message);
      
      // Hide error toast after 5 seconds
      setTimeout(() => {
        setErrorToast("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Go Back
        </button>
      </div>
    );
  }

  if (!rentItem) {
    return <h2 className="rent-details-not-found">Item not found.</h2>;
  }

  const paymentMethods = [
    { id: 'edahabia', label: 'Edahabia', icon: 'bx bx-credit-card' },
    { id: 'cib', label: 'CIB', icon: 'bx bx-credit-card' },
    { id: 'cash', label: 'Cash on Delivery', icon: 'bx bx-money' }
  ];

  const specifications = [
    { icon: 'bx bxs-microchip', label: 'Processor', value: rentItem.processor },
    { icon: 'bx bxs-chip', label: 'RAM', value: rentItem.ram },
    { icon: 'bx bxs-hdd', label: 'Storage', value: rentItem.storage },
    { icon: 'bx bxs-devices', label: 'Graphics Card', value: rentItem.graphics },
    { icon: 'bx bxs-window-alt', label: 'Display Size', value: rentItem.display },
    { icon: 'bx bx-laptop', label: 'Operating System', value: rentItem.operating_system }
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
        
        {errorToast && (
          <div className="error-toast">
            <i className='bx bx-error-circle'></i>
            {errorToast}
          </div>
        )}
        
        {/* Login Dialog */}
        {showLoginDialog && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <div className="dialog-header">
                <i className='bx bx-user-circle'></i>
                <h3>Login Required</h3>
              </div>
              <p>You need to be logged in to rent PCs and complete the rental process.</p>
              <div className="dialog-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowLoginDialog(false)}
                >
                  Cancel
                </button>
                <button 
                  className="login-btn"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </button>
              </div>
            </div>
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
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button 
                      className={`rent-now-btn ${rentItem.status.toLowerCase() === 'unavailable' ? 'unavailable' : ''}`}
                      disabled={rentItem.status.toLowerCase() === 'unavailable'}
                      onClick={() => {
                        if (!isLoggedIn) {
                          setShowLoginDialog(true);
                        } else {
                          setShowRentForm(true);
                        }
                      }}
                    >
                      <i className='bx bx-cart-add'></i>
                      {rentItem.status.toLowerCase() === 'unavailable' ? 'Currently Unavailable' : 'Rent Now'}
                    </button>
                    
                    {rentItem.status.toLowerCase() === 'unavailable' && (
                      <div className="availability-info">
                        <i className='bx bx-calendar-check'></i>
                        <span>
                          {rentItem.aviability_date ? 
                            `Available after: ${new Date(rentItem.aviability_date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}` : 
                            'Currently unavailable. Check back later for availability.'}
                        </span>
                      </div>
                    )}
                  </div>
                </>
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
                          setFormData({ rental_date: "", return_date: "", payment_method: "cash" });
                        }}
                      >
                        <i className='bx bx-x'></i>
                      </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="form-section">
                        <h4>Rental Period</h4>
                        <div className="date-inputs-container">
                          <div className="date-input-wrapper">
                            <label htmlFor="rental_date">Rental Date</label>
                            <div className="date-field">
                              <i className='bx bx-calendar-plus'></i>
                              <input
                                type="date"
                                id="rental_date"
                                min={today}
                                value={formData.rental_date}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  rental_date: e.target.value,
                                  return_date: "" // Reset return date when rental date changes
                                })}
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="date-input-wrapper">
                            <label htmlFor="return_date">Return Date</label>
                            <div className="date-field">
                              <i className='bx bx-calendar-check'></i>
                              <input
                                type="date"
                                id="return_date"
                                min={calculateMinReturnDate(formData.rental_date)}
                                value={formData.return_date}
                                onChange={(e) => setFormData({
                                  ...formData,
                                  return_date: e.target.value
                                })}
                                disabled={!formData.rental_date}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        {formData.rental_date && formData.return_date && (
                          <div className="rental-duration">
                            <i className='bx bx-time'></i>
                            <span>
                              {Math.ceil((new Date(formData.return_date) - new Date(formData.rental_date)) / (1000 * 60 * 60 * 24))} days
                            </span>
                          </div>
                        )}
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
