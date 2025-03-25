
import React, { useState } from "react";
import "./ComputerListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import computer from "./Computer.avif"; 
import computerIcon from "./ComputerIcon.jpg"; 

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
          Computers <img src={computerIcon} alt="Computer Icon" className="computer-icon" />
        </h2>

        <div className="grid-container">
          {currentComputers.map((comp) => (
            <div key={comp.id} className="computer-card">
              <img src={comp.image} alt={comp.name} className="computer-image" />
              <h3 className="computer-name">{comp.name}</h3>
              <p className="computer-price">
                ${comp.price} <span className="old-price">${comp.oldPrice}</span>
              </p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-btn">«</button>
          <span className="page-number">{currentPage}</span>
          <button onClick={nextPage} disabled={indexOfLastComputer >= computers.length} className="page-btn">»</button>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default ComputerListing;
