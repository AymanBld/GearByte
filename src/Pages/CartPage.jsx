import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('/Store/cart/');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      setError('Failed to load cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      const response = await fetchWithAuth(`/Store/cart/${cartItemId}/`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity: Math.max(1, newQuantity) }),
      });
      
      if (!response.ok) throw new Error('Failed to update quantity');
      await fetchCart(); // Refresh cart data
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await fetchWithAuth(`/Store/cart/${cartItemId}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove item');
      await fetchCart(); // Refresh cart data
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetchWithAuth('/Store/cart/clear/', {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to clear cart');
      await fetchCart(); // Refresh cart data
      setShowClearConfirm(false);
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toFixed(2);
  };

  if (loading) return <div className="cart-section">Loading...</div>;
  if (error) return <div className="cart-section">Error: {error}</div>;

  return (
    <>
      <section className="cart-section">
        <h2 className="cart-title">Cart</h2>
        <div className="cart-container">
          <div className="cart-left">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th style={{ width: "140px" }}>Quantity</th>
                  <th>Subtotal</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="product-cell">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="cart-product-image"
                        />
                        <span>{item.product.name}</span>
                      </div>
                    </td>
                    <td>{item.product.price} DA</td>
                    <td>
                      <input
                        className="qty-input"
                        type="number"
                        min="1"
                        max={item.product.stock}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>{item.subtotal} DA</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-buttons">
              <Link to="/ourproducts">
                <button className="return-btn">Return to Shop</button>
              </Link>
              {cartItems.length > 0 && (
                <button 
                  className="clear-cart-btn"
                  onClick={() => setShowClearConfirm(true)}
                >
                  <i className='bx bx-trash-alt'></i> Clear Cart
                </button>
              )}
            </div>
          </div>

          <div className="cart-right">
            <h3 className="summary-title">Cart Total</h3>
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{calculateTotal()} DA</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>{calculateTotal()} DA</span>
              </div>
            </div>
            <Link to="/checkout">
              <button className="checkout-btn" disabled={cartItems.length === 0}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clear Cart Confirmation Dialog */}
      {showClearConfirm && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-header">
              <i className='bx bx-error-circle'></i>
              <h3>Clear Cart</h3>
            </div>
            <p>Are you sure you want to remove all items from your cart? This action cannot be undone.</p>
            <div className="dialog-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowClearConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="clear-btn"
                onClick={handleClearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
      <Copyright />
    </>
  );
};

export default CartPage;
