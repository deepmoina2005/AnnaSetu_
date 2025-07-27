import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

// ✅ Register User
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;

  if (!name || !email || !phone || !role || !password) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists!", 400));
  }

  const user = await User.create({ name, email, phone, role, password });
  sendToken(user, 201, res, "User registered successfully");
});

// ✅ Login User
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  // ✅ Role Check (case-insensitive)
  if (user.role.toLowerCase() !== role.toLowerCase()) {
    return next(new ErrorHandler("Role mismatch for this user", 403));
  }

  sendToken(user, 200, res, "User logged in successfully");
});

// ✅ Logout User
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expires immediately
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // set secure in prod
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

// ✅ Get Logged In User
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
