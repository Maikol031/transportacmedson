import { Router } from "express";
import ContratoService from "../apis/contrato/ContratoService";
import ContratoController from "../apis/contrato/ContratoController";

const contratoRoute = Router();
const contratoService = new ContratoService();
const contratoController = new ContratoController(contratoService);

contratoRoute.get("/contratos", async(req, res) => contratoController.get(req, res));
contratoRoute.get("/contratos/:id", async(req, res) => contratoController.getById(req, res));
contratoRoute.post("/contratos", async(req, res) => contratoController.create(req, res));
contratoRoute.put("/contratos/:id", async(req, res) => contratoController.update(req, res));
contratoRoute.delete("/contratos", async(req, res) => contratoController.delete(req, res)); 

export default contratoRoute;
