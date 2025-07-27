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

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      quantity,
      image: imageUrl,
    });

    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
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
