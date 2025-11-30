import { Router } from "express";
import caminhaoRoute from "./caminhaoRoute";
import motoristaRoute from "./motoristaRoute";
import clienteRoute from "./clienteRoute";
import postoRoute from "./postoRoute";
import contratoRoute from "./contratoRoute";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/auth";
import { logAcesso } from "../middleware/logAcesso";
import testeRouter from "./testeRoutes";


const routes = Router();


// ROTAS PÚBLICAS
// routes.post("/auth/register", (req, res) => authController.register(req, res));
// routes.post("/auth/login", (req, res) => authController.login(req, res));
// routes.post("/auth/refresh", (req, res) => authController.refresh(req, res));

// ROTAS PROTEGIDAS
routes.use("/api", authMiddleware, logAcesso, caminhaoRoute);
routes.use("/api", authMiddleware, logAcesso, motoristaRoute);
routes.use("/api", authMiddleware, logAcesso, clienteRoute);
routes.use("/api", authMiddleware, logAcesso, postoRoute);
routes.use("/api", authMiddleware, logAcesso, contratoRoute);
routes.use("/api", authMiddleware, testeRouter);

export default routes;
