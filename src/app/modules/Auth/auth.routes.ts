import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { doctorValidationSchema } from "../Doctor/doctor.validate";

const router = Router();

router.post(
  "/register-doctor",
  validateRequest(doctorValidationSchema.registerDoctorValidationSchema),
  authControllers.registerDoctor
);

export const authRoutes = router;
