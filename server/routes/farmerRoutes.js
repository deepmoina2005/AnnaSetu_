import express from "express";
import { saveOrUpdateFarmerProfile, getFarmerProfile, getAllFarmers } from "../controllers/farmerProfileController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/farmer-profile", isAuthorized, saveOrUpdateFarmerProfile);
router.get("/get-profile", getFarmerProfile);
router.get("/all-farmer", getAllFarmers);

export default router;
