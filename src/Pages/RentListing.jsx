import React, { useState } from "react";
import "./RentListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import rentIcon from "./RentIcon.webp";
import rentPC from "./RentPC.jpg";

const rentItems = [
  { id: 301, name: "High-Performance Laptop", price: 80, image: rentPC },
  { id: 302, name: "Gaming Desktop", price: 120, image: rentPC },
  { id: 303, name: "Workstation PC", price: 150, image: rentPC },
  { id: 304, name: "Mini PC", price: 60, image: rentPC },
  { id: 305, name: "Video Editing PC", price: 200, image: rentPC },
  { id: 306, name: "Streaming Setup", price: 180, image: rentPC },
];

const RentListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rentItems.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (indexOfLastItem < rentItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <section className="rent-list">
        <h2 className="section-title">
          Available for Rent <img src={rentIcon} alt="Rent Icon" className="rent-icon" />
        </h2>

        <div className="grid-container">
          {currentItems.map((item) => (
            <div key={item.id} className="rent-card">
              <img src={item.image} alt={item.name} className="rent-image" />
              <h3 className="rent-name">{item.name}</h3>
              <p className="rent-price">${item.price}/month</p>
              <button className="rent-now">Rent Now</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-btn">«</button>
          <span className="page-number">{currentPage}</span>
          <button onClick={nextPage} disabled={indexOfLastItem >= rentItems.length} className="page-btn">»</button>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default RentListing;
