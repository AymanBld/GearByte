import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import monitor from "./Product.jpg";
import monitor2 from "./Monitor2.jpg";
import monitor3 from "./Monitor3.webp";
import monitor4 from "./Monitor4.jpg";
import monitorIcon from "./Monitor.webp";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./MonitorListing.css";

const monitors = [
  {
    id: 101,
    name: "27\" IPS Gaming Monitor",
    price: 370,
    image: monitor,
    images: [monitor, monitor2, monitor3, monitor4],
    description:
      "Experience vivid colors and smooth gameplay with a 27-inch IPS gaming monitor featuring a 144Hz refresh rate.",
  },
  {
    id: 102,
    name: "32\" Curved LED Monitor",
    price: 450,
    image: monitor2,
    images: [monitor2, monitor, monitor3, monitor4],
    description:
      "Enjoy immersive viewing on a 32-inch curved LED monitor designed for gaming and entertainment.",
  },
  {
    id: 103,
    name: "24\" Full HD Monitor",
    price: 250,
    image: monitor3,
    images: [monitor3, monitor2, monitor, monitor4],
    description:
      "A sleek 24-inch Full HD monitor that offers crisp visuals and a fast response time for everyday gaming.",
  },
  {
    id: 104,
    name: "4K Ultra HD Monitor",
    price: 700,
    image: monitor4,
    images: [monitor4, monitor, monitor2, monitor3],
    description:
      "Upgrade your setup with a 4K Ultra HD monitor that delivers stunning clarity and color accuracy for high-end gaming.",
  },
  {
    id: 105,
    name: "27\" TN Gaming Monitor",
    price: 320,
    image: monitor,
    images: [monitor, monitor2, monitor3, monitor4],
    description:
      "Designed for competitive gaming, this 27-inch TN panel monitor boasts a 240Hz refresh rate and low response time.",
  },
  {
    id: 106,
    name: "Curved Gaming Monitor",
    price: 480,
    image: monitor2,
    images: [monitor2, monitor3, monitor4, monitor],
    description:
      "Immerse yourself in the action with a curved gaming monitor offering enhanced depth and an ergonomic design.",
  },
  {
    id: 107,
    name: "Ultra-Slim Monitor",
    price: 300,
    image: monitor3,
    images: [monitor3, monitor4, monitor, monitor2],
    description:
      "A modern ultra-slim monitor that blends style and performance, perfect for both gaming and productivity.",
  },
  {
    id: 108,
    name: "High Refresh Rate Monitor",
    price: 420,
    image: monitor4,
    images: [monitor4, monitor3, monitor2, monitor],
    description:
      "Enjoy smooth, tear-free gaming with a high refresh rate monitor that keeps up with fast-paced action.",
  },
];

const MonitorListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const monitorsPerPage = 16;
  const { addToCart } = useContext(CartContext);

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
          Monitors{" "}
          <img src={monitorIcon} alt="Monitor Icon" className="monitor-icon" />
        </h2>

        <div className="grid-container">
          {currentMonitors.map((mon) => (
            <div key={mon.id} className="monitor-card">
              <Link
                to={`/product/${mon.id}`}
                state={{ product: mon }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={mon.image} alt={mon.name} className="monitor-image" />
                <h3 className="monitor-name">{mon.name}</h3>
                <p className="monitor-price">${mon.price}</p>
              </Link>
              <button className="add-to-cart" onClick={() => addToCart(mon)}>
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
            disabled={indexOfLastMonitor >= monitors.length}
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

export default MonitorListing;








/*
import React, { useState, useContext } from "react";
import "./MonitorListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import { CartContext } from "../Context/CartContext";
import monitor from "./Product.jpg";
import monitor2 from "./Monitor2.jpg";
import monitor3 from "./Monitor3.webp";
import monitor4 from "./Monitor4.jpg";
import monitorIcon from "./Monitor.webp";

const monitors = [
  { id: 111, name: "IPS LCD Gaming Monitor", price: 370, oldPrice: 460, image: monitor },
  { id: 112, name: "RGB Liquid CPU Cooler", price: 1960, image: monitor },
  { id: 113, name: "Mechanical Gaming Keyboard", price: 150, oldPrice: 200, image: monitor },
  { id: 114, name: "Wireless Gaming Mouse", price: 75, oldPrice: 100, image: monitor },
  { id: 115, name: "Gaming Headset", price: 120, oldPrice: 150, image: monitor },
  { id: 116, name: "Gaming Chair", price: 300, oldPrice: 350, image: monitor },
  { id: 117, name: "144Hz Curved Monitor", price: 450, oldPrice: 500, image: monitor },
  { id: 118, name: "Gaming Laptop", price: 1200, oldPrice: 1300, image: monitor },
  { id: 119, name: "Custom Gaming PC", price: 2000, oldPrice: 2200, image: monitor },
  { id: 1110, name: "RGB PC Fans (3 Pack)", price: 50, oldPrice: 65, image: monitor },
  { id: 1111, name: "NVMe SSD 1TB", price: 110, oldPrice: 140, image: monitor },
  { id: 1112, name: "Gaming Desk", price: 250, oldPrice: 300, image: monitor },
  { id: 1113, name: "Elgato Stream Deck", price: 150, oldPrice: 180, image: monitor },
  { id: 1114, name: "Wireless Gaming Controller", price: 60, oldPrice: 80, image: monitor },
  { id: 1115, name: "RGB Mouse Pad", price: 30, oldPrice: 40, image: monitor },
  { id: 1116, name: "Gaming Microphone", price: 100, oldPrice: 130, image: monitor },
  { id: 1117, name: "4K Gaming Monitor", price: 700, oldPrice: 750, image: monitor },
  { id: 1118, name: "VR Headset", price: 500, oldPrice: 550, image: monitor },
  { id: 1119, name: "Portable Gaming Console", price: 400, oldPrice: 450, image: monitor },
  { id: 1120, name: "Gaming Router", price: 180, oldPrice: 220, image: monitor },
];

const MonitorListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const monitorsPerPage = 16;
  const { addToCart } = useContext(CartContext);

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
              <button className="add-to-cart" onClick={() => addToCart(monitor)}>
                Add to Cart
              </button>
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
*/