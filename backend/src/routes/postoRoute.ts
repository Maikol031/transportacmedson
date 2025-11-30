import { Router, Request, Response } from "express";
import PostoService from "../apis/posto/PostoService";
import PostoController from "../apis/posto/PostoController";

const postoRoute = Router();

const postoService = new PostoService();
const postoController: PostoController = new PostoController(postoService);

postoRoute.get("/postos", async(req: Request, res: Response) => postoController.get(req, res));
postoRoute.post("/postos", async(req: Request, res: Response) => postoController.create(req, res));
postoRoute.put("/postos/:id", async(req: Request, res: Response) => postoController.update(req, res));
postoRoute.delete("/postos", async(req: Request, res: Response) => postoController.delete(req, res)); // delete múltiplos

export default postoRoute;
