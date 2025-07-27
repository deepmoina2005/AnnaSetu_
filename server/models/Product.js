import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);