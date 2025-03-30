import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import "./ProductDetails.css";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = location.state?.product;
  const imagesArray = product.images || [product.image];
  const [mainImage, setMainImage] = useState(imagesArray[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <h2 className="not-found">Product not found.</h2>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      <div className="product-detail-page">
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back
        </button>

        <div className="product-detail-top">
          <div className="product-detail-images">
            <img
              src={mainImage}
              alt={product.name}
              className="main-product-image"
            />
            <div className="thumbnail-row">
              {imagesArray.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`thumbnail ${mainImage === img ? "selected" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="product-detail-info">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>

            <div className="quantity-selector">
              <button onClick={decrementQuantity} className="quantity-btn">
                –
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="quantity-input"
              />
              <button onClick={incrementQuantity} className="quantity-btn">
                +
              </button>
            </div>

            <button onClick={handleAddToCart} className="add-to-cart">
              Add to Cart
            </button>

            <div className="delivery-info">
              <span className="delivery-icon">🚚</span>
              <span className="delivery-text">
                Free Delivery &amp; 30 Days Return
              </span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Copyright />
    </>
  );
};

export default ProductDetails;
