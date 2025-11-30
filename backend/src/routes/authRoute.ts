import { Router } from "express";
import AuthController from "../controllers/AuthController";
import validateRefresh from "../middleware/validateRefresh";
import authLimiter from "../rateLimites/authLimiter";
import refreshLimiter from "../rateLimites/refreshLimiter";

const router = Router();
const authController = new AuthController();

router.post("/auth/login", authLimiter, authController.login);
router.post("/auth/refresh", validateRefresh, authController.refresh);
router.post("/auth/logout", refreshLimiter, authController.logout);

export default router;