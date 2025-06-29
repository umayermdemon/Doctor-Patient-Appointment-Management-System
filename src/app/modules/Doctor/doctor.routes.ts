import { Router } from "express";
import { doctorControllers } from "./doctor.controller";
import validateRequest from "../../middlewares/validateRequest";
import { doctorValidationSchema } from "./doctor.validation";
import auth from "../../middlewares/auth";

const router = Router();
router.post(
  "/services",
  auth("doctor"),
  validateRequest(doctorValidationSchema.doctorServiceValidationSchema),
  doctorControllers.doctorService
);
router.patch(
  "/services/:id",
  auth("doctor"),
  doctorControllers.updateDoctorService
);

router.put(
  "/services/:id/availability",
  auth("doctor"),
  // validateRequest(doctorValidationSchema.setAvailabilityValidationSchema),
  doctorControllers.setAvailability
);

router.delete("/services/:id", auth("doctor"), doctorControllers.deleteService);

export const doctorRoutes = router;
