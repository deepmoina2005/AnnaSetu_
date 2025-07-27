import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: String,
  shopName: String,
  phone: String,
  email: { type: String, required: true, unique: true },
  country: String,
  state: String,
  district: String,
  location: String,
  deliveryTime: String,
  deliveryDuration: String,
  deliveryAreas: String,
  description: String,
  avatar: String,
}, { timestamps: true });

export default mongoose.model("Farmer", farmerSchema);