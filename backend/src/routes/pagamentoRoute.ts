// src/routes/pagamento.routes.ts
import { Router } from "express";
import PagamentoController from "../apis/pagamento/PagamentoController";
import PagamentoService from "../apis/pagamento/PagamentoService";

const pagamentoRoute = Router();
const pagamentoService = new PagamentoService();

// routes are nested under /contratos/:contratoId
const pagamentoController = new PagamentoController(pagamentoService);

pagamentoRoute.get("/contratos/:contratoId/pagamentos", async(req, res) => pagamentoController.get(req, res));
pagamentoRoute.post("/contratos/:contratoId/pagamentos", async(req, res) => pagamentoController.create(req, res));
pagamentoRoute.get("/contratos/:contratoId/pagamentos/:id", async(req, res) => pagamentoController.getById(req, res));
pagamentoRoute.put("/contratos/:contratoId/pagamentos/:id", async(req, res) => pagamentoController.update(req, res));
pagamentoRoute.delete("/contratos/:contratoId/pagamentos", async(req, res) => pagamentoController.delete(req, res)); // delete múltiplos

export default pagamentoRoute;
