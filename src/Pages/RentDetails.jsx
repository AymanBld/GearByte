import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./RentDetails.css";

const RentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rentItem = location.state?.rentItem;
  const imagesArray = rentItem?.images || [rentItem?.image];
  const [mainImage, setMainImage] = useState(imagesArray[0]);

  if (!rentItem) {
    return <h2 className="rent-details-not-found">Item not found.</h2>;
  }

  const specifications = [
    { icon: 'bx bx-chip', label: 'Processor', value: rentItem.processor },
    { icon: 'bx bx-memory-card', label: 'RAM', value: rentItem.ram },
    { icon: 'bx bx-hdd', label: 'Storage', value: rentItem.storage },
    { icon: 'bx bx-desktop', label: 'Graphics', value: rentItem.graphics },
    { icon: 'bx bx-screen', label: 'Display', value: rentItem.display },
    { icon: 'bx bx-wifi', label: 'Connectivity', value: rentItem.connectivity }
  ];

  return (
    <>
      <div className="rent-details-page">
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
                <span className="currency">$</span>
                <span className="amount">{rentItem.price}</span>
                <span className="period">/day</span>
              </div>
              {rentItem.original_price && (
                <span className="original-price">${rentItem.original_price}/day</span>
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
              <button 
                className={`rent-now-btn ${rentItem.status.toLowerCase() === 'unavailable' ? 'unavailable' : ''}`}
                disabled={rentItem.status.toLowerCase() === 'unavailable'}
              >
                <i className='bx bx-cart-add'></i>
                {rentItem.status.toLowerCase() === 'unavailable' ? 'Currently Unavailable' : 'Rent Now'}
              </button>
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
