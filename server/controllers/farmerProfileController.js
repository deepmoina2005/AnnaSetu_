import Farmer from "../models/farmerProfileSchema.js";
import uploadImage from "../utils/uploadImage.js";

export const saveOrUpdateFarmerProfile = async (req, res) => {
  try {
    const {
      name, shopName, phone, email, country,
      state, district, location, deliveryTime,
      deliveryDuration, deliveryAreas, description,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    let avatar = "";
    if (req.files?.avatar) {
      avatar = await uploadImage(req.files.avatar);
    }

    let farmer = await Farmer.findOne({ email });
    if (farmer) {
      Object.assign(farmer, {
        name, shopName, phone, country, state,
        district, location, deliveryTime,
        deliveryDuration, deliveryAreas, description
      });
      if (avatar) farmer.avatar = avatar;
      await farmer.save();
      return res.status(200).json({ message: "Updated", farmer });
    } else {
      const newFarmer = new Farmer({
        name, shopName, phone, email, country, state, district,
        location, deliveryTime, deliveryDuration, deliveryAreas,
        description, avatar
      });
      await newFarmer.save();
      return res.status(201).json({ message: "Created", farmer: newFarmer });
    }
  } catch (err) {
    console.error("Save Farmer Error", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getFarmerProfile = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email required" });
    const farmer = await Farmer.findOne({ email });
    if (!farmer) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ farmer });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add this to your farmerProfileController.js

export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json({ success: true, farmers });
  } catch (err) {
    console.error("Get All Farmers Error:", err);
    res.status(500).json({ success: false, message: "Server error while fetching farmers." });
  }
};

