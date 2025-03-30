import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <section className="footer" id="footer">
      <div className="footer-box">
        <h2>
          <span>Gear</span>Byte
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
          fugiat!
        </p>

        <div className="social">
          <i className="bx bxl-facebook"></i>
          <i className="bx bxl-twitter"></i>
          <i className="bx bxl-instagram"></i>
          <i className="bx bxl-tiktok"></i>
        </div>
      </div>

      <div className="footer-box">
        <h3>PcPower</h3>
        <li>
          <a href="">Buy</a>
        </li>
        <li>
          <a href="">Reviews</a>
        </li>
        <li>
          <a href="">site map</a>
        </li>
        <li>
          <a href="">How it does works</a>
        </li>
      </div>

      <div className="footer-box">
        <h3>Services</h3>
        <li>
          <a href="">Delivery</a>
        </li>
        <li>
          <a href="">Rent</a>
        </li>
        <li>
          <a href="">Garranty</a>
        </li>
        <li>
          <a href="">Financing</a>
        </li>
      </div>

      <div className="footer-box">
        <h3>Contact</h3>
        <div className="contact">
          <span>
            <i className="bx bxs-map"></i>Amizour béjaia
          </span>
          <span>
            <i className="bx bxs-phone"></i>+213 655 14 34 11
          </span>
          <span>
            <i className="bx bxs-envelope"></i>GearByte@gmail.com
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
