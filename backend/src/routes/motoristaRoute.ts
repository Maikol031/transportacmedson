import { Router, Request, Response } from "express";
import MotoristaService from "../apis/motorista/MotoristaService";
import MotoristaController from "../apis/motorista/MotoristaController";
import authMiddleware from "../middleware/auth";

const motoristaRoute = Router();

const motoristaService = new MotoristaService();
const motoristaController = new MotoristaController(motoristaService);

motoristaRoute.get("motoristas", (req, res) => motoristaController.get(req, res));
motoristaRoute.post("motoristas", (req, res) => motoristaController.create(req, res));
motoristaRoute.put("motoristas/:id", (req, res) => motoristaController.update(req, res));
motoristaRoute.delete("motoristas/:id", (req, res) => motoristaController.delete(req, res));

export default motoristaRoute;
