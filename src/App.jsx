import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
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
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
