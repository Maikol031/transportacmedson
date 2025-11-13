import { Router } from "express";
import AuthController from "../controllers/AuthController";
import authMiddleware from "../middleware/auth";

const testeRouter = Router();

testeRouter.get("/erro-teste", async (req, res) => {
    throw new Error("Erro proposital para testes!");
});

export default testeRouter;