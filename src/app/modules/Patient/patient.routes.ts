import { Router } from "express";
import { patientControllers } from "./patient.controller";

const router = Router();

router.get("/doctors", patientControllers.getAllDoctors);

export const patientRoutes = router;
