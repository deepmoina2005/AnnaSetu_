import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const PublicLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-[70px] relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between bg-gradient-to-r from-indigo-700 to-violet-500">
        <Link to="/" className="text-white font-bold text-lg">Anna Setu</Link>
        <ul className="text-white md:flex hidden items-center gap-10">
          <li><Link className="hover:text-white/70" to="/">Home</Link></li>
          <li><Link className="hover:text-white/70" to="/about-us">About</Link></li>
          <li><Link className="hover:text-white/70" to="/contact">Contact</Link></li>
        </ul>
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="text-white px-4 py-2 border rounded"
          >
            Register
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-white px-4 py-2 border rounded"
          >
            Login
          </button>
        </div>
        <button
          onClick={() => navigate("/menu")} // you can change this path if needed
          className="md:hidden text-white"
        >
          ☰
        </button>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;