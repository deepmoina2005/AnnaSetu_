// =============================
// ✅ FULL CORRECTED: app.js (server.js)
// =============================
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRoute.js";
import farmerRouter from "./routes/farmerRoutes.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import connectCloudinary from "./config/cloudinary.js";

// ✅ Load environment variables early
dotenv.config({ path: "./config/config.env" });

// ✅ Initialize express app
const app = express();

// ✅ Connect to Cloudinary
await connectCloudinary();

// ✅ Connect to MongoDB
dbConnection();

// ✅ Enable CORS for frontend access
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Core Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Handle File Uploads (for Cloudinary/local)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Optional: Serve uploaded static files (local fallback)
app.use("/uploads", express.static("uploads"));

// ✅ API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/profile", farmerRouter);

// ✅ Global Error Handler (should come last)
app.use(errorMiddleware);

export default app;