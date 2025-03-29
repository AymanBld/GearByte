import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext"; 
import computer from "./Computer.avif";
import computer2 from "./Computer2.jpg";
import computer3 from "./Computer3.jpg";
import computer4 from "./Computer4.jpg";
import computer5 from "./Computer5.jpg";
import computerIcon from "./ComputerIcon.jpg";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./ComputerListing.css";

const computers = [
  {
    id: 1,
    name: "Gaming Desktop",
    price: 1200,
    image: computer, 
    images: [computer, computer2, computer3, computer4, computer5], 
    description:
      "Features an AMD Ryzen 7, 16GB RAM, and NVIDIA RTX 3070 GPU for high-performance gaming.",
  },
  {
    id: 2,
    name: "Workstation PC",
    price: 1500,
    image: computer2,
    images: [computer, computer2, computer3, computer4],
    description:
      "Equipped with Intel Core i9, 32GB RAM, and professional-grade graphics for demanding workloads.",
  },
  {
    id: 3,
    name: "All-in-One Computer",
    price: 900,
    image: computer3,
    images: [computer, computer2, computer3, computer4],
    description:
      "A sleek, space-saving design ideal for home offices and everyday tasks.",
  },
  {
    id: 4,
    name: "Mini PC",
    price: 500,
    image: computer4,
    images: [computer, computer2, computer3, computer4],
    description:
      "Compact and energy-efficient, perfect for media streaming and light computing.",
  },
  {
    id: 5,
    name: "Gaming Laptop",
    price: 1300,
    image: computer5,
    images: [computer, computer2, computer3, computer4],
    description:
      "Portable gaming powerhouse with high refresh rate display and dedicated graphics.",
  },
  {
    id: 6,
    name: "Ultrabook",
    price: 1000,
    image: computer,
    images: [computer, computer2, computer3, computer4],
    description:
      "Slim and lightweight ultrabook offering excellent battery life and fast performance.",
  },
  {
    id: 7,
    name: "2-in-1 Convertible",
    price: 800,
    image: computer2,
    images: [computer, computer2, computer3, computer4],
    description:
      "Versatile convertible that functions as both a laptop and a tablet.",
  },
  {
    id: 8,
    name: "Budget PC",
    price: 400,
    image: computer3,
    images: [computer, computer2, computer3, computer4],
    description:
      "An affordable option for everyday tasks, web browsing, and multimedia consumption.",
  },
  {
    id: 9,
    name: "VR Ready PC",
    price: 1800,
    image: computer4,
    images: [computer, computer2, computer3, computer4],
    description:
      "High-end system optimized for virtual reality gaming and immersive experiences.",
  },
  {
    id: 10,
    name: "Professional Desktop",
    price: 1600,
    image: computer5,
    images: [computer, computer2, computer3, computer4],
    description:
      "Robust desktop built for professionals needing intensive multitasking and processing power.",
  },
  {
    id: 11,
    name: "Compact Office PC",
    price: 700,
    image: computer,
    images: [computer, computer2, computer3, computer4],
    description:
      "Perfect for home offices with efficient performance and a compact design.",
  },
  {
    id: 12,
    name: "Custom-Built PC",
    price: 2000,
    image: computer2,
    images: [computer, computer2, computer3, computer4],
    description:
      "Fully customizable desktop built to your specifications for maximum performance.",
  },
  {
    id: 13,
    name: "High-End Gaming Desktop",
    price: 2500,
    image: computer3,
    images: [computer, computer2, computer3, computer4],
    description:
      "Top-of-the-line gaming desktop with premium components for the ultimate gaming experience.",
  },
  {
    id: 14,
    name: "Portable Gaming PC",
    price: 1400,
    image: computer4,
    images: [computer, computer2, computer3, computer4],
    description:
      "A balanced machine that offers both portability and powerful gaming performance.",
  },
  {
    id: 15,
    name: "Business Laptop",
    price: 1100,
    image: computer5,
    images: [computer, computer2, computer3, computer4],
    description:
      "Reliable and efficient laptop designed for business professionals on the go.",
  },
];

const ComputerListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const computersPerPage = 16;
  const { addToCart } = useContext(CartContext); 

  const indexOfLastComputer = currentPage * computersPerPage;
  const indexOfFirstComputer = indexOfLastComputer - computersPerPage;
  const currentComputers = computers.slice(
    indexOfFirstComputer,
    indexOfLastComputer
  );

  const nextPage = () => {
    if (indexOfLastComputer < computers.length) {
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
    <section className="computer-list" id="computers">
      <h2 className="section-title">
        Computers{" "}
        <img src={computerIcon} alt="Computer Icon" className="computer-icon" />
      </h2>

      <div className="grid-container">
        {currentComputers.map((comp) => (
          <div key={comp.id} className="computer-card">
            <Link
              to={`/product/${comp.id}`}
              state={{ product: comp }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img src={comp.image} alt={comp.name} className="computer-image" />
              <h3 className="computer-name">{comp.name}</h3>
              <p className="computer-price">${comp.price}</p>
            </Link>
            <button className="add-to-cart" onClick={() => addToCart(comp)}>
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
          disabled={indexOfLastComputer >= computers.length}
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

export default ComputerListing;






/*
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import computer from "./Computer.avif";
import computerIcon from "./ComputerIcon.jpg";
import "./ComputerListing.css"; 

const computers = [
  { id: 1, name: "Gaming Desktop", price: 1200, oldPrice: 1400, image: computer },
  { id: 2, name: "Workstation PC", price: 1500, oldPrice: 1700, image: computer },
  { id: 3, name: "All-in-One Computer", price: 900, oldPrice: 1100, image: computer },
  { id: 4, name: "Mini PC", price: 500, oldPrice: 650, image: computer },
  { id: 5, name: "Gaming Laptop", price: 1300, oldPrice: 1500, image: computer },
  { id: 6, name: "Ultrabook", price: 1000, oldPrice: 1200, image: computer },
  { id: 7, name: "2-in-1 Convertible", price: 800, oldPrice: 950, image: computer },
  { id: 8, name: "Budget PC", price: 400, oldPrice: 500, image: computer },
  { id: 9, name: "VR Ready PC", price: 1800, oldPrice: 2000, image: computer },
  { id: 10, name: "Professional Desktop", price: 1600, oldPrice: 1800, image: computer },
  { id: 11, name: "Compact PC", price: 600, oldPrice: 700, image: computer },
  { id: 12, name: "Home Office PC", price: 700, oldPrice: 850, image: computer },
  { id: 13, name: "Custom-Built PC", price: 2000, oldPrice: 2200, image: computer },
  { id: 14, name: "High-End Gaming Desktop", price: 2500, oldPrice: 2700, image: computer },
  { id: 15, name: "Portable Gaming PC", price: 1400, oldPrice: 1600, image: computer },
  { id: 16, name: "Business Laptop", price: 1100, oldPrice: 1300, image: computer },
  { id: 17, name: "Convertible Laptop", price: 950, oldPrice: 1100, image: computer },
  { id: 18, name: "Desktop Replacement Laptop", price: 1200, oldPrice: 1350, image: computer },
  { id: 19, name: "Chromebook", price: 300, oldPrice: 400, image: computer },
  { id: 20, name: "2-in-1 Laptop", price: 850, oldPrice: 1000, image: computer },
];

const ComputerListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const computersPerPage = 16;
  const { addToCart } = useContext(CartContext);

  const indexOfLastComputer = currentPage * computersPerPage;
  const indexOfFirstComputer = indexOfLastComputer - computersPerPage;
  const currentComputers = computers.slice(indexOfFirstComputer, indexOfLastComputer);

  const nextPage = () => {
    if (indexOfLastComputer < computers.length) {
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
      <section className="computer-list" id="computers">
        <h2 className="section-title">
          Computers{" "}
          <img src={computerIcon} alt="Computer Icon" className="computer-icon" />
        </h2>
        <div className="grid-container">
          {currentComputers.map((comp) => (
            <div key={comp.id} className="computer-card">
              <Link
                to={`/product/${comp.id}`}
                state={{ product: comp }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={comp.image} alt={comp.name} className="computer-image" />
                <h3 className="computer-name">{comp.name}</h3>
                <p className="computer-price">
                  ${comp.price} <span className="old-price">${comp.oldPrice}</span>
                </p>
              </Link>
              <button className="add-to-cart" onClick={() => addToCart(comp)}>
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
          <button onClick={nextPage} disabled={indexOfLastComputer >= computers.length} className="page-btn">
            »
          </button>
        </div>
      </section>
    </>
  );
};

export default ComputerListing;
*/