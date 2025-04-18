import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RentListing.css";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import rentIcon from "../assets/imges/rentIcon.webp";

const RentListing = () => {
  const [rentItems, setRentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });

  useEffect(() => {
    fetchPCs();
  }, []);

  const fetchPCs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/rental/pcs/');
      if (!response.ok) {
        throw new Error('Failed to fetch PCs');
      }
      const data = await response.json();
      
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous
      });
      setRentItems(data.results);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching PCs:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading available PCs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <section className="rent-list">
        <h2 className="section-title">
          Available for Rent{" "}
          <img src={rentIcon} alt="Rent Icon" className="rent-icon" />
        </h2>

        {rentItems.length === 0 ? (
          <div className="no-items">
            <p>No PCs available for rent at the moment.</p>
          </div>
        ) : (
          <div className="grid-container">
            {rentItems.map((item) => (
              <div key={item.id} className="rent-card">
                <Link
                  to={`/rentdetails/${item.id}`}
                  state={{ rentItem: {
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    images: item.images || [item.image],
                    processor: item.cpu,
                    ram: `${item.ram}GB`,
                    storage: `${item.storage}GB`,
                    graphics: item.graphics,
                    display: item.display,
                    connectivity: item.connectivity,
                    status: item.is_available ? 'Available' : 'Unavailable',
                    price: item.price_per_day,
                    description: item.description,
                    features: item.features || [],
                  }}}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img 
                    src={item.image || '/default-pc.jpg'} 
                    alt={item.name} 
                    className="rent-image" 
                  />
                  <h3 className="rent-name">{item.name}</h3>
                  <div className="rent-specs">
                    <p>CPU: {item.cpu}</p>
                    <p>RAM: {item.ram}GB</p>
                    <p>Storage: {item.storage}GB</p>
                  </div>
                  <p className="rent-price">${item.price_per_day}/day</p>
                </Link>
                <button 
                  className="rent-now-btn"
                  disabled={!item.is_available}
                >
                  {item.is_available ? 'Rent Now' : 'Currently Unavailable'}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          {pagination.previous && (
            <button
              onClick={() => fetchPCs(pagination.previous)}
              className="page-btn"
            >
              «
            </button>
          )}
          {pagination.next && (
            <button
              onClick={() => fetchPCs(pagination.next)}
              className="page-btn"
            >
              »
            </button>
          )}
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default RentListing;
