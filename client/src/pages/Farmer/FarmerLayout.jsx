/* eslint-disable no-unused-vars */
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { PlusSquare, ListOrdered, LogOut, UserPlus, User, LayoutDashboard } from "lucide-react";
import { useContext } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const FarmerLayout = () => {
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

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/farmer",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "Product",
      path: "/farmer/products",
      icon: <PlusSquare className="w-5 h-5" />,
    },
    {
      name: "Orders",
      path: "/farmer/orders",
      icon: <ListOrdered className="w-5 h-5" />,
    },
    {
      name: "Subscriber",
      path: "/farmer/subscriber",
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      name: "Profile",
      path: "/farmer/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow">
        <Link to="/">
          <h2 className="text-xl font-bold text-indigo-600">Seller Dashboard</h2>
        </Link>
        <div className="flex items-center gap-5 text-gray-600">
          <p>Hi! Farmer</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border rounded-full text-sm px-4 py-1 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-screen text-base border-gray-300 pt-4 bg-white shadow-sm">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/farmer"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600 font-semibold border-r-4 border-indigo-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`
              }
            >
              {item.icon}
              <span className="hidden md:inline">{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default FarmerLayout;