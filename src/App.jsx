import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";
import { useState } from "react";

// Dashboard imports
import Layout from "./Pages/dashboard/layout";
import Page from "./Pages/dashboard/page";
import AddProduct from "./Pages/dashboard/AddPro";
import Ord from "./Pages/dashboard/ord";
import Products from "./Pages/dashboard/Products";
import TaskManager from "./Pages/dashboard/Task";

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


const NavLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavLayout />,
      children: [
        {
          index: true,
          element: (
            <>
              <Hero />
              <OurService />
              <Reviews />
              <Contactus />
              <Footer />
              <Copyright />
            </>
          ),
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "signup",
          element: <SignupPage />,
        },
        {
          path: ":category",
          element: <ProductListing />,
        },
        {
          path: "cart",
          element: <CartPage />,
        },
        {
          path: "ourproducts",
          element: <OurProducts />,
        },
        {
          path: "rentpcs",
          element: <RentService />,
        },
        {
          path: "rentlisting",
          element: <RentListing />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "rentdetails/:id",
          element: <RentDetails />,
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          path: "orderconfirmation",
          element: <OrderConfirmationPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "orders",
          element: <OrdersPage />,
        },
        {
          path: "addresses",
          element: <AddressesPage />,
        },
        {
          path: "notifications",
          element: <NotificationsPage />,
        },
        {
          path: "auth/password/reset/confirm/:uid/:token",
          element: <PasswordResetConfirmPage />,
        },
      ],
    },
    
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Page />,
        },
        {
          path: "tasks",
          element: <TaskManager />,
        },
        {
          path: "orders",
          element: <Ord />,
        },
        {
          path: "products",
          element: <Products products={products} setProducts={setProducts} />,
        },
        {
          path: "new-product",
          element: <AddProduct addProduct={(newProduct) => setProducts((prev) => [...prev, newProduct])} />,
        },
        {
          path: "logout",
          element: <h1 className="title">Log Out</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
