import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import monitorIcon from "./Monitor.webp";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./MonitorListing.css";

const MonitorListing = () => {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchMonitors();
  }, []);

  const fetchMonitors = async () => {
    try {
      const response = await fetch('http://localhost:8000/store/product/');
      if (!response.ok) {
        throw new Error('Failed to fetch monitors');
      }
      const data = await response.json();
      
      // Set pagination data
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous
      });

      // Filter only monitors from the results
      // const monitorProducts = data.results.filter(product => 
      //   product.category === "Monitores"
      // );
      setMonitors(data.results);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching monitors:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPage = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch page');
      }
      const data = await response.json();
      
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous
      });

      const monitorProducts = data.results.filter(product => 
        product.category === "Monitores"
      );
      setMonitors(monitorProducts);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching page:", err);
    } finally {
      setLoading(false);
    }
  };

  // Default image if product image is null
  const getProductImage = (imageUrl) => {
    return imageUrl || '/default-monitor.jpg'; // Add your default image path
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading monitors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={fetchMonitors} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="monitor-list" id="monitors">
        <h2 className="section-title">
          Monitors{" "}
          <img src={monitorIcon} alt="Monitor Icon" className="monitor-icon" />
        </h2>

        {monitors.length === 0 ? (
          <div className="no-monitors">
            <p>No monitors available at the moment.</p>
          </div>
        ) : (
          <div className="grid-container">
            {monitors.map((mon) => (
              <div key={mon.id} className="monitor-card">
                <Link
                  to={`/product/${mon.id}`}
                  state={{ product: mon }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img 
                    src={getProductImage(mon.image)} 
                    alt={mon.name} 
                    className="monitor-image" 
                  />
                  <h3 className="monitor-name">{mon.name}</h3>
                  <p className="monitor-price">${mon.price}</p>
                  <p className="monitor-stock">In Stock: {mon.stock}</p>
                </Link>
                <button 
                  className="add-to-cart" 
                  onClick={() => addToCart(mon)}
                  disabled={mon.stock === 0}
                >
                  {mon.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        )}

        {(pagination.previous || pagination.next) && (
          <div className="pagination">
            <button
              onClick={() => pagination.previous && fetchPage(pagination.previous)}
              disabled={!pagination.previous}
              className="page-btn"
            >
              «
            </button>
            <span className="page-info">
              Showing {monitors.length} of {pagination.count} items
            </span>
            <button
              onClick={() => pagination.next && fetchPage(pagination.next)}
              disabled={!pagination.next}
              className="page-btn"
            >
              »
            </button>
          </div>
        )}
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default MonitorListing;
