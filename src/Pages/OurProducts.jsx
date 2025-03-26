import React from "react";
import { Link } from "react-router-dom";
import "./OurProducts.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import monitorIcon from "./Monitor.webp";
import desktopIcon from "./ComputerIcon.jpg";
import accessoryIcon from "./AccessoryIcon.png";

const OurProducts = () => {
  return (
    <>
      <section className="products-section">
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">
          Discover our range of high-quality products tailored to your needs
        </p>

        <div className="products-grid">
          <Link to="/monitorlisting" className="product-card">
            <img src={monitorIcon} alt="Monitors" className="product-icon" />
            <h3 style={{ color: "#EA3C3C" }}>Monitors</h3>
            <p>High-resolution displays for gaming, work, and entertainment.</p>
          </Link>

          <Link to="/computerlisting" className="product-card">
            <img src={desktopIcon} alt="Computers" className="product-icon" />
            <h3 style={{ color: "#EA3C3C" }}>Computers</h3>
            <p>Powerful PCs built for performance and reliability.</p>
          </Link>

          <Link to="/accessorylisting" className="product-card">
            <img
              src={accessoryIcon}
              alt="Accessories"
              className="product-icon"
            />
            <h3 style={{ color: "#EA3C3C" }}>Accessories</h3>
            <p>Enhance your setup with our top-notch peripherals.</p>
          </Link>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default OurProducts;
