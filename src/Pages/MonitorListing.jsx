import React, { useState } from "react";
import "./MonitorListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import monitor from "./Product.jpg";
import monitorIcon from "./Monitor.webp";

const monitors = [
  { id: 1, name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 460, image: monitor },
  { id: 2, name: "RGB Liquid CPU Cooler", price: 1960, image: monitor },
  { id: 3, name: "Mechanical Gaming Keyboard", price: 150, oldPrice: 200, image: monitor },
  { id: 4, name: "Wireless Gaming Mouse", price: 75, oldPrice: 100, image: monitor },
  { id: 5, name: "Gaming Headset", price: 120, oldPrice: 150, image: monitor },
  { id: 6, name: "Gaming Chair", price: 300, oldPrice: 350, image: monitor },
  { id: 7, name: "144Hz Curved Monitor", price: 450, oldPrice: 500, image: monitor },
  { id: 8, name: "Gaming Laptop", price: 1200, oldPrice: 1300, image: monitor },
  { id: 9, name: "Custom Gaming PC", price: 2000, oldPrice: 2200, image: monitor },
  { id: 10, name: "RGB PC Fans (3 Pack)", price: 50, oldPrice: 65, image: monitor },
  { id: 11, name: "NVMe SSD 1TB", price: 110, oldPrice: 140, image: monitor },
  { id: 12, name: "Gaming Desk", price: 250, oldPrice: 300, image: monitor },
  { id: 13, name: "Elgato Stream Deck", price: 150, oldPrice: 180, image: monitor },
  { id: 14, name: "Wireless Gaming Controller", price: 60, oldPrice: 80, image: monitor },
  { id: 15, name: "RGB Mouse Pad", price: 30, oldPrice: 40, image: monitor },
  { id: 16, name: "Gaming Microphone", price: 100, oldPrice: 130, image: monitor },
  { id: 17, name: "4K Gaming Monitor", price: 700, oldPrice: 750, image: monitor },
  { id: 18, name: "VR Headset", price: 500, oldPrice: 550, image: monitor },
  { id: 19, name: "Portable Gaming Console", price: 400, oldPrice: 450, image: monitor },
  { id: 20, name: "Gaming Router", price: 180, oldPrice: 220, image: monitor },

];

const MonitorListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const monitorsPerPage = 16;

  const indexOfLastMonitor = currentPage * monitorsPerPage;
  const indexOfFirstMonitor = indexOfLastMonitor - monitorsPerPage;
  const currentMonitors = monitors.slice(indexOfFirstMonitor, indexOfLastMonitor);

  const nextPage = () => {
    if (indexOfLastMonitor < monitors.length) {
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
      <section className="monitor-list" id="monitors">
        <h2 className="section-title">
          Monitors <img src={monitorIcon} alt="Monitor Icon" className="monitor-icon" />
        </h2>

        <div className="grid-container">
          {currentMonitors.map((monitor) => (
            <div key={monitor.id} className="monitor-card">
              <img src={monitor.image} alt={monitor.name} className="monitor-image" />
              <h3 className="monitor-name">{monitor.name}</h3>
              <p className="monitor-price">
                ${monitor.price} <span className="old-price">${monitor.oldPrice}</span>
              </p>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1} className="page-btn">«</button>
          <span className="page-number">{currentPage}</span>
          <button onClick={nextPage} disabled={indexOfLastMonitor >= monitors.length} className="page-btn">»</button>
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default MonitorListing;



