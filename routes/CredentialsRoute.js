import express  from "express";
import CredentialsController from "../controllers/CredentialsController";


const router = express.Router();


router.post("/",CredentialsController.createCredential);
router.post("/login",CredentialsController.credLogin);
router.patch("/:id",CredentialsController.UpdateCredential);
router.delete("/:id",CredentialsController.DeleteOneById);

export default router;