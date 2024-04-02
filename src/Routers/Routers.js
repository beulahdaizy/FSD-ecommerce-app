import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Cart";
import ProductDetails from "../Pages/ProductDetails";
import Checkout from "../Pages/Checkout";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../Pages/Profile";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
};

export default Routers;
