import { Router } from "express";
import upload from "../utils/multer.util";
import { AadharController } from "../controllers/implementation/aadhar.controller";
import { AadharServices } from "../services/implementation/aadhar.service";
import { validateImages } from "../middlewares/images-validation.middleware";

const aadharRouter = Router();

const aadharServices = new AadharServices()
const aadharController = new AadharController(aadharServices)

aadharRouter.post(
  "/parse",
  upload.fields([
    { name: "frontImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
  ]),
  validateImages,
  aadharController.parseAadhar.bind(aadharController)
);

export default aadharRouter;
