import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [localCartItems, setLocalCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

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

  const handleQuantityChange = (cartItemId, newQuantity) => {
    setLocalCartItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId
          ? {
              ...item,
              quantity: Math.max(1, Math.min(newQuantity, item.product.stock)),
              subtotal: (Math.max(1, Math.min(newQuantity, item.product.stock)) * item.product.price).toFixed(2)
            }
          : item
      )
    );
    setHasChanges(true);
  };

  const updateCart = async () => {
    try {
      const updates = localCartItems.map(item => ({
        cartItemId: item.id,
        quantity: item.quantity
      }));

      const updatePromises = updates.map(({ cartItemId, quantity }) =>
        fetchWithAuth(`/Store/cart/${cartItemId}/`, {
          method: 'PATCH',
          body: JSON.stringify({ quantity })
        })
      );

      const results = await Promise.all(updatePromises);
      const hasError = results.some(response => !response.ok);

      if (hasError) {
        throw new Error('Failed to update some items');
      }

      await fetchCart(); // Refresh cart data
      setHasChanges(false);
    } catch (err) {
      console.error('Failed to update cart:', err);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await fetchWithAuth(`/Store/cart/${cartItemId}/`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove item');
      await fetchCart();
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
    return localCartItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0).toFixed(2);
  };

  if (loading) return <div className="cart-section">Loading...</div>;
  if (error) return <div className="cart-section">Error: {error}</div>;

  return (
    <>
      <section className="cart-section">
        <div className="cart-header">
          <h2 className="cart-title">Cart</h2>
          <Link to="/ourproducts">
            <button className="return-btn">
              <i className='bx bx-arrow-back'></i> Return to Shop
            </button>
          </Link>
        </div>
        
        {!isLoggedIn ? (
          <div className="not-logged-in-container">
            <div className="not-logged-in-message">
              <i className='bx bx-user-circle'></i>
              <h3>Login Required</h3>
              <p>You need to be logged in to view your cart and make purchases.</p>
              <div className="login-actions">
                <button 
                  className="login-btn"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        ) : (
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
                  {localCartItems.map((item) => (
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
                {localCartItems.length > 0 && (
                  <button 
                    className="clear-cart-btn"
                    onClick={() => setShowClearConfirm(true)}
                  >
                    <i className='bx bx-trash-alt'></i> Clear Cart
                  </button>
                )}
                {hasChanges && (
                  <button 
                    className="update-cart-btn"
                    onClick={updateCart}
                  >
                    <i className='bx bx-refresh'></i> Update Cart
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
                <button className="checkout-btn" disabled={localCartItems.length === 0}>
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
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
