import { Router } from "express";

import FarmerController from "../controllers/FarmerController";
import CredentialsController from "../controllers/CredentialsController";
import RABAdminController from "../controllers/RABAdminController";

const route = Router();

//FarmerRoutes
route.post("/farmer",FarmerController.createFarmer);
route.get("/farmer",FarmerController.getAllFarmers);
route.patch("/farmer/:id",FarmerController.UpdateFarmer);
route.delete("/farmer/:id",FarmerController.DeleteOneById);

//CredentialsRoutes
route.post("/credential",CredentialsController.createCredential);
route.post("/credential/login",CredentialsController.credLogin);
route.patch("/credential/:id",CredentialsController.UpdateCredential);
route.delete("/credential/:id",CredentialsController.DeleteOneById);

//RABAdminRoutes

route.post("/admin",RABAdminController.createAdmin);
route.post("/admin/login",RABAdminController.adminLogin);
route.get("/admin",RABAdminController.getAllAdmins);
route.patch("/admin/:id",RABAdminController.UpdateAdmin);


export default route;