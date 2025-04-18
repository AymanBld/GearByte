import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import "./Nav.css";

const Hero = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/ourproducts");
  };

  const handleRentNow = () => {
    navigate("/rentpcs");  // Updated to go to RentService page
  };

  return (
    <section className="Hero-sec" id="Hero">
      <div className="hero">
        <h1>
          <span>From Your Vision to Reality </span>- Custom PCs Done Right!
        </h1>
        <p>
          From vision to reality—choose your specs, and we'll build the perfect
          PC for gaming, work, and beyond. No stress, just pure performance.
        </p>

        <div className="buttons">
          <button className="btn" id="buy" onClick={handleBuyNow}>
            Buy Now
          </button>

          <button className="btn" id="rent" onClick={handleRentNow}>
            Rent Now
          </button>
        </div>
      </div>
      <div className="img"></div>
    </section>
  );
};

export default Hero;
