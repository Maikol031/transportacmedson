import { Router } from "express";
import caminhaoRoute from "./caminhaoRoute";
import motoristaRoute from "./motoristaRoute";
import { logAcesso } from "../middleware/logAcesso";
import testeRouter from "./testeRoutes";


const routes = Router();


// ROTAS PÚBLICAS
// routes.post("/auth/register", (req, res) => authController.register(req, res));
// routes.post("/auth/login", (req, res) => authController.login(req, res));
// routes.post("/auth/refresh", (req, res) => authController.refresh(req, res));

// ROTAS PROTEGIDAS
routes.use("/", logAcesso, caminhaoRoute);
routes.use("/", logAcesso, motoristaRoute);
routes.use("/", testeRouter);


export default routes;
