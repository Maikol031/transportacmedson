import AuthController from "../controllers/AuthController";
import validateRefresh from "../middleware/validateRefresh";
import authLimiter from "../rateLimites/authLimiter";
import refreshLimiter from "../rateLimites/refreshLimiter";
import { Request, Response } from "express";
import { Router } from "express";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/auth/login", authLimiter, authController.login);
authRoute.post("/auth/refresh", validateRefresh, authController.refresh);
authRoute.post("/auth/logout", refreshLimiter, authController.logout);

export default authRoute;