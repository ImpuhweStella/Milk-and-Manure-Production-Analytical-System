import express from "express";
import FarmerController from "../controllers/FarmerController";



const router = express.Router();


router.post("/",FarmerController.createFarmer);
router.get("/",FarmerController.getAllFarmers);
router.patch("/:id",FarmerController.UpdateFarmer);
router.delete("/:id",FarmerController.DeleteOneById);

export default router;