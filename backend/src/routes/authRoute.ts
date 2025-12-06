import AuthController from "../controllers/AuthController";
import validateRefresh from "../middleware/validateRefresh";
import authLimiter from "../rateLimites/authLimiter";
import refreshLimiter from "../rateLimites/refreshLimiter";
import { Request, Response } from "express";
import { Router } from "express";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/login", authLimiter, authController.login);
authRoute.post("/refresh",  authController.refresh);
authRoute.post("/logout", refreshLimiter, authController.logout);

export default authRoute;