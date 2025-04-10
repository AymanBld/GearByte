import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import { CartContext } from "../Context/CartContext";
import "./CartPage.css";



const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);

  const setExactQuantity = (id, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
 

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
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <td>
                      <input
                        className="qty-input"
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          setExactQuantity(item.id, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => removeItem(item.id)}
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
              <button className="update-btn">Update Cart</button>
            </div>
          </div>

          <div className="cart-right">
            <h3 className="summary-title">Cart Total</h3>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-line total-line">
              <strong>Total</strong>
              <strong>${total}</strong>
            </div>
            <Link to="/checkout" >
               <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <Copyright />
    </>
  );
};

export default CartPage;
