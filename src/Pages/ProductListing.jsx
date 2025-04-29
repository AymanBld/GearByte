import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchApi, fetchWithAuth } from "../utils/fetchWithAuth";
import Toast from "../components/Toast";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./ProductListing.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const { category } = useParams();

  useEffect(() => {
    fetchProducts();
    console.log("Category:", category);
  }, [category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(`Store/product/?category=${category}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      
      setPagination({
        count: data.count,
        next: data.next, 
        previous: data.previous
      });

      setProducts(data.results);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const response = await fetchWithAuth(`Store/cart/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      setToast({
        show: true,
        message: 'Product added to cart successfully!',
        type: 'success'
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      setToast({
        show: true,
        message: 'Failed to add product to cart',
        type: 'error'
      });
    }
  };

  const fetchPage = async (url) => {
    try {
      setLoading(true);
      // Ensure we're using the search endpoint for pagination as well
      const modifiedUrl = url.replace('/Store/product/', '/Store/product/search/');
      const response = await fetchApi(modifiedUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch page');
      }
      const data = await response.json();
      
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous
      });

      setProducts(data.results);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching page:", err);
    } finally {
      setLoading(false);
    }
  };

  const getProductImage = (imageUrl) => {
    return imageUrl || '/default-product.jpg';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
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
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <section className="product-list" id="products">
        <h2 className="section-title">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid-container">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <Link
                  to={`/product/${product.id}`}
                  state={{ product }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img 
                    src={getProductImage(product.image)} 
                    alt={product.name} 
                    className="product-image" 
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">{product.price}</p>
                  </div>
                </Link>
                <button 
                  className="add-to-cart" 
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="pagination">
          {pagination.previous && (
            <button onClick={() => fetchPage(pagination.previous)}>Previous</button>
          )}
          {pagination.next && (
            <button onClick={() => fetchPage(pagination.next)}>Next</button>
          )}
        </div>
      </section>
      <Footer />
      <Copyright />
    </>
  );
};

export default ProductListing;






