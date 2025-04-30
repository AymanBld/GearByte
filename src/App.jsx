import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";
import { useState } from "react";

// Dashboard imports
import Layout from "./Pages/dashboard/layout";
import Page from "./Pages/dashboard/page";
import AddProduct from "./Pages/dashboard/AddPro";
import Orders from "./Pages/dashboard/orders";
import Products from "./Pages/dashboard/Products";
import RentalPCs from "./Pages/dashboard/RentalPCs";
import AddPC from "./Pages/dashboard/AddPC";
import RentalRequests from "./Pages/dashboard/RentalRequests";
import Categories from "./Pages/dashboard/Categories";

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
import MyRentalsPage from "./Pages/MyRentalsPage";
import AddressesPage from "./Pages/AddressesPage";
import PasswordResetConfirmPage from './Pages/PasswordResetConfirmPage';
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

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
          path: "rentals",
          element: <MyRentalsPage />,
        },
        {
          path: "addresses",
          element: <AddressesPage />,
        },
        {
          path: "auth/password/reset/confirm/:uid/:token",
          element: <PasswordResetConfirmPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPasswordPage />,
        },
      ],
    },
    
    {
      path: "/dashboard",
      element: <Layout />,
      children: [
        {index: true, element: <Page />},
        {path: "orders", element: <Orders />},
        {path: "products", element: <Products products={products} setProducts={setProducts} />},
        {path: "new-product", element: <AddProduct addProduct={(newProduct) => setProducts((prev) => [...prev, newProduct])} />},
        {path: "categories", element: <Categories />},
        {path: "rental-pcs", element: <RentalPCs />},
        {path: "add-pc", element: <AddPC />},
        {path: "rental-requests", element: <RentalRequests />},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
