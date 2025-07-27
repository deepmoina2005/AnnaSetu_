import express from "express";
import { addProduct, deleteProduct, getAllProducts } from "../controllers/productController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthorized, addProduct);
router.get("/all", getAllProducts);
router.delete("/delete/:id", isAuthorized, deleteProduct);

export default router;