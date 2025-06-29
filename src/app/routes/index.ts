import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { doctorRoutes } from "../modules/Doctor/doctor.routes";
import { patientRoutes } from "../modules/Patient/patient.routes";

const router = Router();

const routes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/doctor",
    route: doctorRoutes,
  },
  {
    path: "/patient",
    route: patientRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
