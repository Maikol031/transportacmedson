import { Router } from "express";
import ClienteService from "../apis/cliente/ClienteService";
import ClienteController from "../apis/cliente/ClienteControlle";

const clienteRoute = Router();

const clienteService = new ClienteService();
const clienteController = new ClienteController(clienteService);

clienteRoute.get("/clientes", (req, res) => clienteController.get(req, res));
clienteRoute.get("/clientes/search/:text", (req, res) => clienteController.search(req, res));
clienteRoute.post("/clientes", (req, res) => clienteController.create(req, res));
clienteRoute.put("/clientes/:id", (req, res) => clienteController.update(req, res));
clienteRoute.delete("/clientes", (req, res) => clienteController.delete(req, res)); // delete múltiplos

export default clienteRoute;
