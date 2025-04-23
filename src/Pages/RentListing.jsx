import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchApi } from "../utils/fetchWithAuth";
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
      const response = await fetchApi('rental/pcs/');
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
        <h2 className="section-title">Available PCs for Rent</h2>

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
                    graphics: item.gpu,
                    display: `${item.display_size}"`,
                    connectivity: item.connectivity,
                    status: item.is_available ? 'Available' : 'Unavailable',
                    price: item.price_per_day,
                    description: item.description,
                    features: item.features || [],
                  }}}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="rent-image-container">
                    <img 
                      src={item.image || '/default-pc.jpg'} 
                      alt={item.name} 
                      className="rent-image" 
                    />
                    <span className={`availability-indicator ${item.is_available ? 'available' : 'unavailable'}`}>
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <h3 className="rent-name">{item.name}</h3>
                  <p className="rent-description">{item.description}</p>
                  <p className="rent-price">{item.price_per_day} DA/day</p>
                </Link>
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
