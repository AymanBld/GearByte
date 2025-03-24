import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import RentPage from "./Pages/RentPage";
import ServicesPage from "./Pages/ServicesPage";
import ContactPage from "./Pages/ContactPage";


function App() {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/signup"];

  return (
    <div>
   
      {!noLayoutRoutes.includes(location.pathname) && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
       
      </Routes>
      
      
      {!noLayoutRoutes.includes(location.pathname) && (
        <>
          <Footer />
          <Copyright />
        </>
      )}
    </div>
  );
}

export default App;




/*
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Copyright from "./components/Copyright";
import HomePage from "./Pages/HomePage";     
import LoginPage from "./Pages/LoginPage";
import ServicesPage from "./Pages/ServicesPage";
import BuyPage from "./Pages/BuyPage";
import RentPage from "./Pages/RentPage";
import ContactPage from "./Pages/ContactPage";

function App() {
  return (
    <div>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <Footer />
      <Copyright />
    </div>
  );
}

export default App;


/*
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage"; 
import HomePage from "./Pages/HomePage";   
import ServicesPage from "./Pages/ServicesPage"; 
import BuyPage from "./Pages/BuyPage";   
import RentPage from "./Pages/RentPage";        
import ContactPage from "./Pages/ContactPage";   

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/buy" element={<BuyPage />} />  
        <Route path="/rent" element={<RentPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;





/*
import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
*/