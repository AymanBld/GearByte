import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./OurProducts.css";

const OurProducts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/Store/category/');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading categories...</p>
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
      <section className="products-section">
        <h2 className="section-title-main">Our Products</h2>
        <p className="section-subtitle">
          Discover our range of high-quality products tailored to your needs
        </p>

        <div className="products-grid">
          {categories.map(category => (
            <Link 
              to={`/${category.name}`} 
              className="product-card" 
              key={category.id}
            >
              <img 
                src={category.icon || `/default-${category.name}.png`} 
                alt={category.name} 
                className="product-icon" 
              />
              <h3 style={{ color: "#EA3C3C" }}>{category.name}</h3>
              <p>{category.description || `Explore our ${category.name} collection`}</p>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
      <Copyright />
    </>
  );
};

export default OurProducts;
