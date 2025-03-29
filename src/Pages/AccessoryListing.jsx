import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext"; 
import accessory from "./Accessory.webp"; 
import accessory2 from "./Accessory2.webp"; 
import accessory3 from "./Accessory3.jpg"; 
import accessory4 from "./Accessory4.webp"; 
import accessoryIcon from "./AccessoryIcon.png"; 

import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./AccessoryListing.css";

const accessories = [
  {
    id: 221,
    name: "Gaming Mouse",
    price: 50,
    image: accessory,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "High precision gaming mouse with customizable DPI settings.",
  },
  {
    id: 222,
    name: "Mechanical Keyboard",
    price: 120,
    image: accessory2,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Mechanical keyboard with RGB lighting for an immersive experience.",
  },
  {
    id: 223,
    name: "Mouse Pad",
    price: 20,
    image: accessory3,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Smooth and durable mouse pad for seamless tracking.",
  },
  {
    id: 224,
    name: "Gaming Headset",
    price: 80,
    image: accessory4,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Immersive headset with noise-cancelling mic for clear communication.",
  },
  {
    id: 225,
    name: "Webcam",
    price: 70,
    image: accessory,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "HD webcam with built-in microphone for video conferencing.",
  },
  {
    id: 226,
    name: "Speakers",
    price: 60,
    image: accessory2,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "High-quality speakers delivering crisp and clear sound.",
  },
  {
    id: 227,
    name: "USB Hub",
    price: 25,
    image: accessory3,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Multi-port USB hub for connecting multiple devices.",
  },
  {
    id: 228,
    name: "Cooling Pad",
    price: 40,
    image: accessory4,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Cooling pad designed to reduce laptop temperature during heavy use.",
  },
  {
    id: 229,
    name: "Monitor Stand",
    price: 75,
    image: accessory,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Ergonomic monitor stand to enhance your workspace.",
  },
  {
    id: 2210,
    name: "VR Accessories",
    price: 150,
    image: accessory2,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Essential accessories to enhance your VR experience.",
  },
  {
    id: 2211,
    name: "External Hard Drive",
    price: 100,
    image: accessory3,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Portable external hard drive for fast and secure data storage.",
  },
  {
    id: 2212,
    name: "Gaming Controller",
    price: 65,
    image: accessory4,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Responsive controller designed for a seamless gaming experience.",
  },
  {
    id: 2213,
    name: "Desk Organizer",
    price: 30,
    image: accessory,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Sleek desk organizer to keep your workspace tidy.",
  },
  {
    id: 2214,
    name: "Cable Management Kit",
    price: 25,
    image: accessory2,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Cable management kit to organize and hide unsightly cables.",
  },
  {
    id: 2215,
    name: "Power Bank",
    price: 45,
    image: accessory3,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "High capacity power bank for charging devices on the go.",
  },
  {
    id: 2216,
    name: "Portable Speaker",
    price: 80,
    image: accessory4,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Portable speaker with excellent sound quality for outdoor use.",
  },
  {
    id: 2217,
    name: "Laptop Sleeve",
    price: 35,
    image: accessory,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Protective laptop sleeve to keep your device safe.",
  },
  {
    id: 2218,
    name: "Smartphone Stand",
    price: 15,
    image: accessory2,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Compact smartphone stand for hands-free use.",
  },
  {
    id: 2219,
    name: "HDMI Cable",
    price: 10,
    image: accessory3,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "High-speed HDMI cable for clear video and audio.",
  },
  {
    id: 2220,
    name: "Wireless Charger",
    price: 25,
    image: accessory4,
    images: [accessory, accessory2, accessory3, accessory4],
    description: "Fast wireless charger for cable-free charging.",
  },
];

const AccessoryListing = () => {
  const { addToCart } = useContext(CartContext);
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
          Accessories{" "}
          <img src={accessoryIcon} alt="Accessory Icon" className="accessory-icon" />
        </h2>

        <div className="grid-container">
          {currentAccessories.map((item) => (
            <div key={item.id} className="accessory-card">
              <Link
                to={`/product/${item.id}`}
                state={{ product: item }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={item.image} alt={item.name} className="accessory-image" />
                <h3 className="accessory-name">{item.name}</h3>
                <p className="accessory-price">${item.price}</p>
              </Link>
              <button className="add-to-cart" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-btn">
            «
          </button>
          <span className="page-number">{currentPage}</span>
          <button
            onClick={nextPage}
            disabled={indexOfLastAccessory >= accessories.length}
            className="page-btn"
          >
            »
          </button>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default AccessoryListing;





/*
import React, { useState, useContext } from "react";
import "./AccessoryListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import { CartContext } from "../Context/CartContext";
import accessory from "./Accessory.webp"; 
import accessory2 from "./Accessory2.webp"; 
import accessory3 from "./Accessory3.jpg"; 
import accessory4 from "./Accessory4.webp"; 
import accessoryIcon from "./AccessoryIcon.png"; 

const accessories = [
  { id: 221, name: "Gaming Mouse", price: 50, oldPrice: 65, image: accessory },
  { id: 222, name: "Mechanical Keyboard", price: 120, oldPrice: 150, image: accessory },
  { id: 223, name: "Mouse Pad", price: 20, oldPrice: 30, image: accessory },
  { id: 224, name: "Gaming Headset", price: 80, oldPrice: 100, image: accessory },
  { id: 225, name: "Webcam", price: 70, oldPrice: 90, image: accessory },
  { id: 226, name: "Speakers", price: 60, oldPrice: 80, image: accessory },
  { id: 227, name: "USB Hub", price: 25, oldPrice: 35, image: accessory },
  { id: 228, name: "Cooling Pad", price: 40, oldPrice: 50, image: accessory },
  { id: 229, name: "Monitor Stand", price: 75, oldPrice: 90, image: accessory },
  { id: 2210, name: "VR Accessories", price: 150, oldPrice: 170, image: accessory },
  { id: 2211, name: "External Hard Drive", price: 100, oldPrice: 120, image: accessory },
  { id: 2212, name: "Gaming Controller", price: 65, oldPrice: 80, image: accessory },
  { id: 2213, name: "Desk Organizer", price: 30, oldPrice: 40, image: accessory },
  { id: 2214, name: "Cable Management Kit", price: 25, oldPrice: 35, image: accessory },
  { id: 2215, name: "Power Bank", price: 45, oldPrice: 55, image: accessory },
  { id: 2216, name: "Portable Speaker", price: 80, oldPrice: 95, image: accessory },
  { id: 2217, name: "Laptop Sleeve", price: 35, oldPrice: 45, image: accessory },
  { id: 2218, name: "Smartphone Stand", price: 15, oldPrice: 20, image: accessory },
  { id: 2219, name: "HDMI Cable", price: 10, oldPrice: 15, image: accessory },
  { id: 2220, name: "Wireless Charger", price: 25, oldPrice: 35, image: accessory },
];

const AccessoryListing = () => {
  const { addToCart } = useContext(CartContext);
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
              <button className="add-to-cart" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
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



*/