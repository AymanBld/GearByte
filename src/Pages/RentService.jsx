import React from "react";
import { useNavigate } from "react-router-dom";

import "./RentService.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import rentLaptop from "./Rent.png";

const RentService = () => {
  const navigate = useNavigate();

  const handleTakeALook = () => {
    navigate("/rentlisting");
  };

  return (
    <>
      <section className="rent-service-intro">
        <div className="rent-service-content">
          <div className="rent-service-text">
            <h2>Unlock the Power of Premium PCs—No Commitment Required!</h2>
            <p>
              Affordable. Reliable. And tailored to your needs. Choose your
              specs, and rent the perfect PC for gaming, work, or beyond.
            </p>
            <button className="rent-service-btn" onClick={handleTakeALook}>
              Take a Look
            </button>
          </div>

          <div className="rent-service-image">
            <img src={rentLaptop} alt="Rent Service" />
          </div>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default RentService;
