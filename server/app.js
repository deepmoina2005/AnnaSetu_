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

// ✅ Load environment variables
dotenv.config({ path: "./config/config.env" });

// ✅ Initialize Express app
const app = express();

// ✅ Connect Cloudinary
await connectCloudinary();

// ✅ Connect MongoDB
dbConnection();

// ✅ Enable CORS for frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "https://anna-setu-lk1e.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Core middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Handle file uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Static files (optional local fallback)
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/profile", farmerRouter);

// ✅ Root Route
app.get("/", (req, res) => res.send("Server is Live"));

// ✅ Error Middleware (should be last)
app.use(errorMiddleware);

export default app;
