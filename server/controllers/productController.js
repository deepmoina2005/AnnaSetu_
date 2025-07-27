import Product from "../models/Product.js"; // make sure path & case match exactly
import uploadImage from "../utils/uploadImage.js";

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


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};

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
