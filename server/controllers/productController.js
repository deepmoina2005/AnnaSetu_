import productSchema from "../models/productSchema.js";
import uploadImage from "../utils/uploadImage.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      offerPrice,
      quantity,
      inStock
    } = req.body;

    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    let imageUrl = "";
    if (req.files && req.files.image) {
      imageUrl = await uploadImage(req.files.image);
    }

    const newProduct = new productSchema({
      name,
      description,
      category,
      price,
      offerPrice,
      quantity,
      inStock: inStock === "true" || inStock === true,
      image: imageUrl
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

// GET /api/v1/product/all
export const getAllProducts = async (req, res) => {
  try {
    const products = await productSchema.find().sort({ createdAt: -1 });
    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error while fetching products" });
  }
};

// DELETE /api/v1/product/delete/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await productSchema.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product: deleted });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error while deleting product" });
  }
};
