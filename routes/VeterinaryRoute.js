import express from "express";
import VeterinaryController from "../controllers/VeterinaryController";



const router = express.Router();


router.post("/",VeterinaryController.createVeterinary);
router.post("/login",VeterinaryController.veterinaryLogin)
router.get("/",VeterinaryController.getAllVeterinaries);
router.patch("/:id",VeterinaryController.UpdateVeterinary);
router.delete("/:id",VeterinaryController.DeleteOneById);

export default router;