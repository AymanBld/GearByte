import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RentListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import rentIcon from "./RentIcon.webp";
import rentPC from "./RentPC.jpg";
import rentPC2 from "./RentPC2.png";
import rentPC3 from "./RentPC3.png";
import rentPC4 from "./RentPC4.webp";

const rentItems = [
  {
    id: 301,
    name: "High-Performance Laptop",
    price: 80,
    image: rentPC,
    images: [rentPC, rentPC2, rentPC3, rentPC4],
    description:
      'This high-performance laptop comes with a powerful Intel Core i7 processor, 16GB RAM, 512GB SSD, dedicated NVIDIA graphics, and a full-HD display. Perfect for demanding tasks, gaming, and multimedia production. Detailed specs include: CPU: Intel Core i7-10750H, GPU: NVIDIA GTX 1660 Ti, Memory: 16GB DDR4, Storage: 512GB NVMe, Display: 15.6" Full HD, Connectivity: WiFi 6, Bluetooth 5.0, and multiple ports for peripherals.',
  },
  {
    id: 302,
    name: "Gaming Desktop",
    price: 120,
    image: rentPC2,
    images: [rentPC, rentPC2, rentPC3, rentPC4],
    description:
      "A powerful gaming desktop featuring an AMD Ryzen 7 processor, 32GB RAM, NVIDIA RTX 3060 graphics, and a 1TB HDD + 512GB SSD storage combo. It delivers excellent performance for the latest games and creative applications.",
  },
  {
    id: 303,
    name: "Workstation PC",
    price: 150,
    image: rentPC3,
    images: [rentPC, rentPC2, rentPC3, rentPC4],
    description:
      "This workstation PC is built for professionals. It offers an Intel Xeon processor, 64GB RAM, professional-grade graphics, and enterprise-level reliability. Ideal for 3D rendering, video editing, and heavy multitasking.",
  },
  {
    id: 304,
    name: "Mini PC",
    price: 60,
    image: rentPC4,
    images: [rentPC, rentPC2, rentPC3, rentPC4],
    description:
      "Compact and energy-efficient, this Mini PC is perfect for basic computing and streaming. Despite its small size, it offers sufficient performance for daily tasks and media consumption.",
  },
  {
    id: 305,
    name: "Video Editing PC",
    price: 200,
    image: rentPC,
    images: [rentPC, rentPC2, rentPC3, rentPC4],
    description:
      "Optimized for video editing, this PC comes with a powerful processor, high-end graphics, and ample memory. It features a 4K display output and multiple connectivity options to handle professional editing software.",
  },
  {
    id: 306,
    name: "Streaming Setup",
    price: 180,
    image: rentPC2,
    images: [rentPC, rentPC2, rentPC3, rentPC4],
    description:
      "A complete streaming setup including a high-performance PC, capture card, streaming software support, and ergonomic accessories. Everything is designed to deliver smooth live broadcasting.",
  },
];

const RentListing = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

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
          Available for Rent{" "}
          <img src={rentIcon} alt="Rent Icon" className="rent-icon" />
        </h2>

        <div className="grid-container">
          {currentItems.map((item) => (
            <div key={item.id} className="rent-card">
              <Link
                to={`/rentdetails/${item.id}`}
                state={{ rentItem: item }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img src={item.image} alt={item.name} className="rent-image" />
                <h3 className="rent-name">{item.name}</h3>
                <p className="rent-price">${item.price}/month</p>
              </Link>
              <button className="rent-now-btn">Rent Now</button>
            </div>
          ))}
        </div>

        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="page-btn"
          >
            «
          </button>
          <span className="page-number">{currentPage}</span>
          <button
            onClick={nextPage}
            disabled={indexOfLastItem >= rentItems.length}
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

export default RentListing;
