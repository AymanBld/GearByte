import React, { useState } from "react";
import "./AccessoryListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import accessory from "./Accessory.webp"; 
import accessoryIcon from "./AccessoryIcon.png"; 

const accessories = [
  { id: 1, name: "Gaming Mouse", price: 50, oldPrice: 65, image: accessory },
  { id: 2, name: "Mechanical Keyboard", price: 120, oldPrice: 150, image: accessory },
  { id: 3, name: "Mouse Pad", price: 20, oldPrice: 30, image: accessory },
  { id: 4, name: "Gaming Headset", price: 80, oldPrice: 100, image: accessory },
  { id: 5, name: "Webcam", price: 70, oldPrice: 90, image: accessory },
  { id: 6, name: "Speakers", price: 60, oldPrice: 80, image: accessory },
  { id: 7, name: "USB Hub", price: 25, oldPrice: 35, image: accessory },
  { id: 8, name: "Cooling Pad", price: 40, oldPrice: 50, image: accessory },
  { id: 9, name: "Monitor Stand", price: 75, oldPrice: 90, image: accessory },
  { id: 10, name: "VR Accessories", price: 150, oldPrice: 170, image: accessory },
  { id: 11, name: "External Hard Drive", price: 100, oldPrice: 120, image: accessory },
  { id: 12, name: "Gaming Controller", price: 65, oldPrice: 80, image: accessory },
  { id: 13, name: "Desk Organizer", price: 30, oldPrice: 40, image: accessory },
  { id: 14, name: "Cable Management Kit", price: 25, oldPrice: 35, image: accessory },
  { id: 15, name: "Power Bank", price: 45, oldPrice: 55, image: accessory },
  { id: 16, name: "Portable Speaker", price: 80, oldPrice: 95, image: accessory },
  { id: 17, name: "Laptop Sleeve", price: 35, oldPrice: 45, image: accessory },
  { id: 18, name: "Smartphone Stand", price: 15, oldPrice: 20, image: accessory },
  { id: 19, name: "HDMI Cable", price: 10, oldPrice: 15, image: accessory },
  { id: 20, name: "Wireless Charger", price: 25, oldPrice: 35, image: accessory },
];

const AccessoryListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const accessoriesPerPage = 16;

  const indexOfLastAccessory = currentPage * accessoriesPerPage;
  const indexOfFirstAccessory = indexOfLastAccessory - accessoriesPerPage;
  const currentAccessories = accessories.slice(indexOfFirstAccessory, indexOfLastAccessory);

  const nextPage = () => {
    if (indexOfLastAccessory < accessories.length) {
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
      <section className="accessory-list" id="accessories">
        <h2 className="section-title">
          Accessories <img src={accessoryIcon} alt="Accessory Icon" className="accessory-icon" />
        </h2>

        <div className="grid-container">
          {currentAccessories.map((item) => (
            <div key={item.id} className="accessory-card">
              <img src={item.image} alt={item.name} className="accessory-image" />
              <h3 className="accessory-name">{item.name}</h3>
              <p className="accessory-price">
                ${item.price} <span className="old-price">${item.oldPrice}</span>
              </p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-btn">«</button>
          <span className="page-number">{currentPage}</span>
          <button onClick={nextPage} disabled={indexOfLastAccessory >= accessories.length} className="page-btn">»</button>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default AccessoryListing;
