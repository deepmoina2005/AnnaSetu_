import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom"; // ✅ useNavigate
import { UserRound, Pencil, Mail, Phone, Lock } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { setIsAuthorized } = useContext(Context);
  const navigate = useNavigate(); // ✅ initialize navigate

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role || !phone) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://anna-setu-1fal.vercel.app/api/v1/user/register",
        { name, email, password, phone, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message || "Registered Successfully");
      setIsAuthorized(true);

      // ✅ Redirect based on role
      if (role === "Farmer") {
        navigate("/farmer");
      } else if (role === "Vendor") {
        navigate("/vendor");
      } else {
        navigate("/"); // fallback
      }

      // Clear form (optional)
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-violet-500 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <img
            src="/profile_icon.png"
            alt="Profile"
            className="w-16 h-16 mx-auto mb-2"
          />
          <h3 className="text-2xl font-semibold text-gray-800">
            Register Account
          </h3>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Register As
            </label>
            <div className="relative">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md outline-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="Vendor">Vendor</option>
                <option value="Farmer">Farmer</option>
              </select>
              <UserRound className="absolute top-2.5 left-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 border rounded-md outline-indigo-500"
              />
              <Pencil className="absolute top-2.5 left-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                className="w-full pl-10 pr-4 py-2 border rounded-md outline-indigo-500"
              />
              <Mail className="absolute top-2.5 left-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="1234567890"
                className="w-full pl-10 pr-4 py-2 border rounded-md outline-indigo-500"
              />
              <Phone className="absolute top-2.5 left-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border rounded-md outline-indigo-500"
              />
              <Lock className="absolute top-2.5 left-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Register
          </button>

          {/* Redirect */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 hover:underline">
              Login Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;