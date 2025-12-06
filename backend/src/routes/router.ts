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
routes.use(authMiddleware, logAcesso, caminhaoRoute);
routes.use(authMiddleware, logAcesso, motoristaRoute);
routes.use(authMiddleware, logAcesso, clienteRoute);
routes.use(authMiddleware, logAcesso, postoRoute);
routes.use(authMiddleware, logAcesso, contratoRoute);
routes.use(authMiddleware, testeRouter);

export default routes;
