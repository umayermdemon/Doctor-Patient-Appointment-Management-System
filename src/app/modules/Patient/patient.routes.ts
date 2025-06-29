import { Router } from "express";
import { patientControllers } from "./patient.controller";

const router = Router();

// get all doctors by filter
router.get("/doctors", patientControllers.getAllDoctors);

// get doctor profile with services and availability
router.get("/doctors/:id", patientControllers.getDoctorProfile);

export const patientRoutes = router;
