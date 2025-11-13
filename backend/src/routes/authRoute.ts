import { Router } from "express";
import AuthController from "../controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/auth/login", authController.login);
router.post("/auth/refresh", authController.refresh);
router.post("/auth/logout", authController.logout);

export default router;