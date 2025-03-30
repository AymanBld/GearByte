import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./Context/CartContext";

import Nav from "./assets/components/Nav";
import Hero from "./assets/components/Hero";
import OurService from "./assets/components/OurService";
import Reviews from "./assets/components/Reviews";
import Footer from "./assets/components/Footer";
import Copyright from "./assets/components/Copyright";
import Contactus from "./assets/components/Contactus";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import MonitorListing from "./Pages/MonitorListing";
import ComputerListing from "./Pages/ComputerListing";
import AccessoryListing from "./Pages/AccessoryListing";
import CartPage from "./Pages/CartPage";
import OurProducts from "./Pages/OurProducts";
import RentService from "./Pages/RentService";
import RentListing from "./Pages/RentListing";
import ProductDetails from "./Pages/ProductDetails";
import RentDetails from "./Pages/RentDetails";

const Layout = () => {
  const location = useLocation();
  const hideNavOnRoutes = ["/login", "/signup"];

  return (
    <>
      {!hideNavOnRoutes.includes(location.pathname) && <Nav />}
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
        <Route path="/monitorlisting" element={<MonitorListing />} />
        <Route path="/computerlisting" element={<ComputerListing />} />
        <Route path="/accessorylisting" element={<AccessoryListing />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ourproducts" element={<OurProducts />} />
        <Route path="/rentservice" element={<RentService />} />
        <Route path="/rentlisting" element={<RentListing />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/rentdetails/:id" element={<RentDetails />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
};

export default App;
