import Product from "../models/Product.js"; // Ensure case-sensitive correct path
import uploadImage from "../utils/uploadImage.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice, quantity } = req.body;

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    let imageUrl = "";
    if (req.files && req.files.image) {
      imageUrl = await uploadImage(req.files.image);
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      offerPrice,
      quantity,
      image: imageUrl,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// Get Product by ID
export const productById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product (Assuming this function is being worked on)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting product" });
  }
};
