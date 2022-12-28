import express  from "express";
import RABAdminController from "../controllers/RABAdminController";


const router = express.Router();


router.post("/",RABAdminController.createAdmin);
router.post("/login",RABAdminController.adminLogin);
router.get("/",RABAdminController.getAllAdmins);
router.patch("/:id",RABAdminController.UpdateAdmin);

export default router;