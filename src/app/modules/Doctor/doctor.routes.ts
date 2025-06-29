import { Router } from "express";
import { doctorControllers } from "./doctor.controller";
import validateRequest from "../../middlewares/validateRequest";
import { doctorValidationSchema } from "./doctor.validation";
import auth from "../../middlewares/auth";

const router = Router();
// doctor service creation
router.post(
  "/services",
  auth("doctor"),
  validateRequest(doctorValidationSchema.doctorServiceValidationSchema),
  doctorControllers.doctorService
);
// doctor service update
router.patch(
  "/services/:id",
  auth("doctor"),
  doctorControllers.updateDoctorService
);
// doctor service delete
router.delete("/services/:id", auth("doctor"), doctorControllers.deleteService);

// doctor service availability creation
router.post(
  "/services/:id/availability",
  auth("doctor"),
  // validateRequest(doctorValidationSchema.createAvailabilityValidationSchema),
  doctorControllers.createAvailability
);

export const doctorRoutes = router;
