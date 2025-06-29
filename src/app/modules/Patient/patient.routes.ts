import { Router } from "express";
import { patientControllers } from "./patient.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { patientValidationSchema } from "./patient.validation";

const router = Router();

// get all doctors by filter
router.get("/doctors", patientControllers.getAllDoctors);

// get doctor profile with services and availability
router.get("/doctors/:id", patientControllers.getDoctorProfile);

// create appointment
router.post(
  "/appointments",
  auth("patient"),
  validateRequest(patientValidationSchema.createAppointmentValidationSchema),
  patientControllers.createAppointment
);

// get my appointments
router.get(
  "/appointments",
  auth("patient"),
  patientControllers.getMyAppointments
);

export const patientRoutes = router;
