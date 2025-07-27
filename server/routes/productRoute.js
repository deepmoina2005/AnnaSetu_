import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  productById,
} from "../controllers/productController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

// Add new product (protected)
router.post("/add", isAuthorized, addProduct);

// Get all products
router.get("/all", getAllProducts);

// Get single product by ID (public or protected as needed)
router.get("/:id", productById); // ✅ NEW ROUTE

// Delete product by ID (protected)
router.delete("/delete/:id", isAuthorized, deleteProduct);

export default router;
