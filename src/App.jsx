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
import Copyright from "./assets/components/copyright";
import Contactus from "./assets/components/Contactus";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";

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
