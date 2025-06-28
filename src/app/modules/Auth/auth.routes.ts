import { Router } from "express";
import { authControllers } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { doctorValidationSchema } from "../Doctor/doctor.validate";
import { patientValidationSchema } from "../Patient/patient.validate";

const router = Router();

router.post(
  "/register-doctor",
  validateRequest(doctorValidationSchema.registerDoctorValidationSchema),
  authControllers.registerDoctor
);
router.post(
  "/register-patient",
  validateRequest(patientValidationSchema.registerPatientValidationSchema),
  authControllers.registerPatient
);

export const authRoutes = router;
