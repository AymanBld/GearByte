import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./assets/components/Nav";
import Hero from "./assets/components/Hero";
import OurService from "./assets/components/OurService";
import Reviews from "./assets/components/Reviews";
import Footer from "./assets/components/Footer";
import Copyright from "./assets/components/Copyright";
import Contactus from "./assets/components/Contactus";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProductListing from "./Pages/ProductListing";
import CartPage from "./Pages/CartPage";
import OurProducts from "./Pages/OurProducts";
import RentService from './Pages/RentService';
import RentListing from './Pages/RentListing';
import ProductDetails from "./Pages/ProductDetails";
import RentDetails from "./Pages/RentDetails";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import ProfilePage from "./Pages/ProfilePage";
import OrdersPage from "./Pages/OrdersPage";
import AddressesPage from "./Pages/AddressesPage";
import NotificationsPage from "./Pages/NotificationsPage";
import PasswordResetConfirmPage from './Pages/PasswordResetConfirmPage';

const App = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <OurService />
              <Reviews />
              <Contactus />
              <Footer />
              <Copyright />
            </>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/:category" element={<ProductListing />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ourproducts" element={<OurProducts />} />
        <Route path="/rentpcs" element={<RentService />} />
        <Route path="/rentlisting" element={<RentListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/rentdetails/:id" element={<RentDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orderconfirmation" element={<OrderConfirmationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/auth/password/reset/confirm/:uid/:token" element={<PasswordResetConfirmPage />} />
      </Routes>
    </Router>
  );
};

export default App;
