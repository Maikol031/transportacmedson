import { Router, Request, Response  } from "express";
import caminhaoRoute from "./caminhaoRoute";
import motoristaRoute from "./motoristaRoute";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/auth";
import { logAcesso } from "../middleware/logAcesso";
import testeRouter from "./testeRoutes";

const routes = Router();
const authController = new AuthController();

// ROTAS PÚBLICAS
// routes.post("/auth/register", (req, res) => authController.register(req, res));
// routes.post("/auth/login", (req, res) => authController.login(req, res));
// routes.post("/auth/refresh", (req, res) => authController.refresh(req, res));

// ROTAS PROTEGIDAS
routes.use("/api", authMiddleware, logAcesso, caminhaoRoute);
routes.use("/api", authMiddleware, logAcesso, motoristaRoute);
routes.use("/api", authMiddleware, testeRouter);

export default routes;
