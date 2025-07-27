/* eslint-disable no-unused-vars */
import axios from "axios";
import { Bus, LogOut, User } from "lucide-react";
import React, { useState } from "react";
import { Context } from "../../main";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full bg-white mt-10">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10 py-10 border-b border-gray-500/30">
        <div className="max-w-96">
          <Link to="/" className="text-indigo-600 text-xl font-bold">
            VendorPanel
          </Link>
          <p className="mt-6 text-sm text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <a href="#" aria-label="Twitter">
              {/* Twitter Icon */}
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-gray-500 hover:text-indigo-600"
                viewBox="0 0 24 24"
              >
                <path d="M22.46 6c-.77.35-1.5.59-2.28.7a4.18 4.18 0 001.8-2.31 8.36 8.36 0 01-2.64 1 4.16 4.16 0 00-7.08 3.8A11.8 11.8 0 013 5.1a4.15 4.15 0 001.28 5.54 4.2 4.2 0 01-1.88-.52v.05a4.17 4.17 0 003.33 4.09 4.1 4.1 0 01-1.88.07 4.17 4.17 0 003.89 2.89A8.36 8.36 0 012 19.54a11.78 11.78 0 006.29 1.84c7.55 0 11.68-6.25 11.68-11.67v-.53A8.18 8.18 0 0024 5.15a8.3 8.3 0 01-2.54.7z" />
              </svg>
            </a>
            <a href="#" aria-label="GitHub">
              {/* GitHub Icon */}
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-gray-500 hover:text-indigo-600"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.85 10.92.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.19.7-3.87-1.39-3.87-1.39-.52-1.31-1.28-1.65-1.28-1.65-1.05-.72.08-.71.08-.71 1.17.08 1.79 1.21 1.79 1.21 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.09 11.09 0 012.92-.39 11 11 0 012.92.39c2.2-1.49 3.18-1.18 3.18-1.18.64 1.59.24 2.76.12 3.05.75.81 1.2 1.84 1.2 3.1 0 4.45-2.69 5.42-5.25 5.7.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.22 0 .3.21.65.8.54A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              {/* LinkedIn Icon */}
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="text-gray-500 hover:text-indigo-600"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5A2.5 2.5 0 002.5 6a2.5 2.5 0 002.48 2.5A2.5 2.5 0 007.5 6 2.5 2.5 0 004.98 3.5zM3 8.98h3.96v12H3zM10.5 9H14v1.56h.06c.5-.94 1.74-1.93 3.57-1.93 3.82 0 4.52 2.5 4.52 5.76v6.59h-4V15.1c0-1.42-.02-3.24-1.97-3.24-1.98 0-2.28 1.55-2.28 3.13v6.01h-4z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">RESOURCES</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Community</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">COMPANY</h2>
            <ul className="text-sm text-gray-500 space-y-2">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="py-4 text-center text-xs md:text-sm text-gray-500">
        Copyright 2024 © <a href="https://prebuiltui.com">PrebuiltUI</a>. All
        Rights Reserved.
      </p>
    </footer>
  );
};

const VendorLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isAuthorized, setIsAuthorized} = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get("https://anna-setu-5sz2.vercel.app/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative pt-[70px]">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between bg-gradient-to-r from-indigo-700 to-violet-500">
        <Link to="/" className="text-white font-bold text-lg">
          VendorPanel
        </Link>

        <ul className="text-white md:flex hidden items-center gap-10">
          <li>
            <Link className="hover:text-white/70 transition" to="/vendor">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-white/70 transition" to="/vendor/products">
              All Products
            </Link>
          </li>
          <li>
            <Link className="hover:text-white/70 transition" to="/vendor/farmers">
              Farmers
            </Link>
          </li>
          <li>
            <Link className="hover:text-white/70 transition" to="/vendor/subscription">
              Subscription
            </Link>
          </li>
        </ul>

        {/* Right section - Profile & Logout */}
        <div className="hidden md:flex items-center gap-4">

          <div className="relative cursor-pointer">
<Bus/>          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
           5
          </button>
        </div>
          <div className="relative group">
            <button className="bg-white text-gray-700 text-sm p-2 rounded-full hover:opacity-90">
              <User />
            </button>
            <div className="absolute top-12 right-0 bg-white shadow-md rounded-md p-2 w-40 hidden group-hover:block z-50">
              <Link
                to="/vendor/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Profile
              </Link>
              <Link
                to="/vendor/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
              >
                Orders
              </Link>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-gray-700 text-sm p-2 rounded-full hover:opacity-90"
          >
            <LogOut />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          aria-label="menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden active:scale-90 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="#fff"
            viewBox="0 0 30 30"
          >
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-gradient-to-r from-indigo-700 to-violet-500 p-6 md:hidden">
          <ul className="flex flex-col space-y-4 text-white text-lg">
            <li>
              <Link to="/vendor" className="text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/vendor/products" className="text-sm">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/vendor/farmers" className="text-sm">
                Farmers
              </Link>
            </li>
            <li>
              <Link to="/vendor/subscription" className="text-sm">
                Subscription
              </Link>
            </li>
          </ul>
          <div className="flex gap-4 mt-6">
            <Link to="/vendor/profile" className="bg-white text-gray-700 text-sm p-2 rounded-full">
              <User />
            </Link>
            <button onClick={handleLogout} className="bg-white text-gray-700 text-sm p-2 rounded-full">
              <LogOut />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorLayout;
