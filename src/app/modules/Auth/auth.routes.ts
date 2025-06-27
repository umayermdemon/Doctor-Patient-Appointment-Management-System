import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

router.post("/register-doctor", authControllers.registerDoctor);

export const authRoutes = router;
