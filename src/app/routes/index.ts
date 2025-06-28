import { Router } from "express";
import { authRoutes } from "../modules/Auth/auth.routes";
import { doctorRoutes } from "../modules/Doctor/doctor.routes";

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
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
