import AuthController from "../controllers/AuthController";
import { Request, Response } from "express";
import { Router } from "express";

const authRoute = Router();
const authController = new AuthController();

authRoute.post("/auth/login", async (req: Request, res: Response) => await authController.login(req, res));
authRoute.get("/auth/refresh", async (req: Request, res: Response) => await authController.refresh(req, res));
authRoute.post("/auth/logout", async (req: Request, res: Response) => await authController.logout(req, res));

export default authRoute;