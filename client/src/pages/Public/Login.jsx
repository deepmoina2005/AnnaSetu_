/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { UserRound, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://anna-setu-5sz2.vercel.app/api/v1/user/login",
        {
          email: email.trim(),
          password: password.trim(),
          role: role.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setIsAuthorized(true);
      setUser(data.user);

      // Optional: immediate redirect here (or let below logic handle it)
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Role-based redirect after login
  if (isAuthorized && user?.role) {
    const role = user.role.toLowerCase();
    if (role === "vendor") return <Navigate to="/vendor" />;
    if (role === "farmer") return <Navigate to="/farmer" />;
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <img src="/profile_icon.png" alt="profile" className="w-16 h-16 mx-auto mb-2" />
          <h3 className="text-2xl font-semibold text-gray-800">Login Account</h3>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Login As</label>
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

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white py-2 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Redirect */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
