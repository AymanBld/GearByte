import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import Footer from "../assets/components/Footer";
import Copyright from "../assets/components/Copyright";
import { CreditCard, Truck, ShoppingBag } from 'lucide-react';
import emailjs from '@emailjs/browser';
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    wilaya: "",
    commune: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetchWithAuth('/Store/cart/');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
      navigate('/cart');
    }
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0.00 ; 
   
  const total = subtotal + shipping ;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^(0)(5|6|7)[0-9]{8}$/.test(formData.phone)) newErrors.phone = "Enter a valid Algerian phone number";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.wilaya.trim()) newErrors.wilaya = "Wilaya is required";
    if (!formData.commune.trim()) newErrors.commune = "Commune is required";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";

    // Dahabia card validation
    if (!formData.cardName.trim()) newErrors.cardName = "Name on card is required";
    if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, "")))
      newErrors.cardNumber = "Dahabia card number must be 16 digits";
    if (!formData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required";
    if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Use format MM/YY";
    if (!formData.cvv.trim()) newErrors.cvv = "CVV is required";
    if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = "CVV must be 3 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    navigate("/orderconfirmation");/////on atendant kn

    try {
      await emailjs.send(
        'service_essjjgp',    // Replace with your service ID
        'template_xuvr9od',   // Replace with your template ID
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          wilaya: formData.wilaya,
          commune: formData.commune,
          total: total.toFixed(2) + ' DZD',
        },
        'AIk-CyT_TeHvIr6_0'     // Replace with your public key
      );
  
      // In a real application, you would:
      // 1. Send the payment information to your payment processor for Dahabia
      // 2. Create an order in your database
      // 3. Clear the cart
      // 4. Redirect to a success page

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart after successful order
      setCartItems([]);

      // Redirect to success page
      navigate("/orderconfirmation");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format price to Algerian Dinar with thousands separator
  const formatPrice = (price) => {
    return new Intl.NumberFormat("fr-DZ", {
      style: "currency",
      currency: "DZD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // List of all 58 wilayas in Algeria
  const wilayas = [
    "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
    "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
    "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
    "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
    "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
    "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
    "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
    "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
    "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
    "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - El M'Ghair", "50 - El Meniaa",
    "51 - Ouled Djellal", "52 - Bordj Baji Mokhtar", "53 - Béni Abbès", "54 - Timimoun",
    "55 - Touggourt", "56 - Djanet", "57 - In Salah", "58 - In Guezzam"
  ];

  return (
    <>
      <div className="checkout-page">
        <div className="checkout-container">
          <h2 className="checkout-title">Checkout</h2>
          <div className="checkout-content">
            {/* Checkout Form */}
            <div className="checkout-form-container">
              <form onSubmit={handleSubmit} className="checkout-form">
                {/* Shipping Information */}
                <div className="form-section">
                  <div className="section-header">
                    <Truck className="section-icon" />
                    <h3 className="section-title">Shipping Information</h3>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "input-error" : ""}
                      />
                      {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "input-error" : ""}
                      />
                      {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "input-error" : ""}
                      />
                      {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="05XXXXXXXX or 06XXXXXXXX"
                        className={errors.phone ? "input-error" : ""}
                      />
                      {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? "input-error" : ""}
                      />
                      {errors.address && <p className="error-message">{errors.address}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="wilaya">Wilaya</label>
                      <select
                        id="wilaya"
                        name="wilaya"
                        value={formData.wilaya}
                        onChange={handleChange}
                        className={errors.wilaya ? "input-error" : ""}
                      >
                        <option value="">Select Wilaya</option>
                        {wilayas.map((wilaya) => (
                          <option key={wilaya} value={wilaya}>
                            {wilaya}
                          </option>
                        ))}
                      </select>
                      {errors.wilaya && <p className="error-message">{errors.wilaya}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="commune">Commune</label>
                      <input
                        type="text"
                        id="commune"
                        name="commune"
                        value={formData.commune}
                        onChange={handleChange}
                        className={errors.commune ? "input-error" : ""}
                      />
                      {errors.commune && <p className="error-message">{errors.commune}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="postalCode">Postal Code</label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={errors.postalCode ? "input-error" : ""}
                      />
                      {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Payment Information - Dahabia Card */}
                <div className="form-section">
                  <div className="section-header">
                    <CreditCard className="section-icon" />
                    <h3 className="section-title">Payment with Dahabia Card</h3>
                  </div>

                  <div className="info-box">
                    <p>
                      Please enter your Dahabia card details issued by Algérie Poste. Your payment will be processed
                      securely.
                    </p>
                  </div>

                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label htmlFor="cardName">Name on Card</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        className={errors.cardName ? "input-error" : ""}
                        required />
                      {errors.cardName && <p className="error-message">{errors.cardName}</p>}
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="cardNumber">Dahabia Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="XXXX XXXX XXXX XXXX"
                        className={errors.cardNumber ? "input-error" : ""}
                        />
                      {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={errors.expiryDate ? "input-error" : ""}
                      />
                      {errors.expiryDate && <p className="error-message">{errors.expiryDate}</p>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        placeholder="XXX"
                        className={errors.cvv ? "input-error" : ""}
                      />
                      {errors.cvv && <p className="error-message">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <div className="summary-header">
                <ShoppingBag className="section-icon" />
                <h3 className="section-title">Order Summary</h3>
              </div>

              <div className="summary-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="item-info">
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="summary-details">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            
              
              
               <button
                type="submit"
                onClick={handleSubmit}
               
                disabled={isSubmitting}
                className="complete-order-btn"
               >
                 {isSubmitting ? "Processing..." : "Complete Order"} 
                
               </button>
             
              

              <div className="payment-info">
                <img
                  src={Poste}
                  alt="Algérie Poste"
                  className="payment-logo"
                />
                <span>Secured by Algérie Poste</span>
              </div>

              <p className="terms-notice">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Copyright />
    </>
  );
};

export default CheckoutPage;
