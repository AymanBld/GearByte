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
  const [mainImage, setMainImage] = useState(imagesArray ? imagesArray[0] : "");

  if (!rentItem) {
    return <h2 className="rent-details-not-found">Item not found.</h2>;
  }

  return (
    <>
      <div className="rent-details-page">
        <button onClick={() => navigate(-1)} className="rent-details-back-button">
          &larr; Back
        </button>

        <div className="rent-details-top">
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

          <div className="rent-details-info">
            <h1 className="rent-details-name">{rentItem.name}</h1>
            <p className="rent-details-price">${rentItem.price}/month</p>
            <p className="rent-details-description">{rentItem.description}</p>

            <button className="rent-details-rent-now-btn">Rent Now</button>
          </div>
        </div>
      </div>

      <Footer />
      <Copyright />
    </>
  );
};

export default RentDetails;


