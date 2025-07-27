/* eslint-disable react-hooks/exhaustive-deps */
// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Public/Home";
import FarmerDashboard from "./pages/Farmer/FarmerDashboard";
import FarmerProducts from "./pages/Farmer/FarmerProducts";
import FarmerOrders from "./pages/Farmer/FarmerOrders";
import FarmerProfile from "./pages/Farmer/FarmerProfile";
import FarmersList from "./pages/Vendor/FarmersList";
import ProductDetail from "./pages/Vendor/ProductDetail";
import { Context } from "./main";
import Cart from "./pages/Vendor/Cart";
import VendorOrders from "./pages/Vendor/VendorOrders";
import Subscribe from "./pages/Vendor/Subscribe";
import VendorProfile from "./pages/Vendor/VendorProfile";
import FarmerLayout from "./pages/Farmer/FarmerLayout";
import FarmerSubcriber from "./pages/Farmer/FarmerSubcriber";
import VendorLayout from "./pages/Vendor/VendorLayout";
import VendorHome from "./pages/Vendor/VendorHome";
import AllProducts from "./pages/Vendor/AllProducts";
import PublicLayout from "./pages/Public/PublicLayout";
import AboutUs from "./pages/Public/AboutUs";
import Contact from "./pages/Public/Contact";
import Register from "./pages/Public/Register";
import Login from "./pages/Public/Login";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          { withCredentials: true }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      {/* Toaster moved outside Routes */}
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Farmer Routes with layout */}
        <Route path="/farmer" element={<FarmerLayout />}>
          <Route index element={<FarmerDashboard />} />
          <Route path="products" element={<FarmerProducts />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route path="subscriber" element={<FarmerSubcriber />} />
        </Route>

        {/* Vendor Routes with layout */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route index element={<VendorHome />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="farmers" element={<FarmersList />} />
          <Route path="product/:id" element={<ProductDetail />} />{" "}
          {/* ✅ FIXED (no leading /) */}
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<VendorOrders />} />
          <Route path="subscription" element={<Subscribe />} />
          <Route path="profile" element={<VendorProfile />} />
        </Route>
      </Routes>
    </>
  );
}
