
import { Router, Request, Response } from "express";
import CaminhaoController from "../apis/caminhao/CaminhaoController";
import CaminhaoService from "../apis/caminhao/CaminhaoService";

const caminhaoRoute = Router();

const caminhaoService = new CaminhaoService();
const caminhaoInstance: CaminhaoController = new CaminhaoController(caminhaoService);


caminhaoRoute.get("/caminhoes", async(req: Request, res: Response) => await caminhaoInstance.get(req, res));
caminhaoRoute.post("/caminhoes", async(req: Request, res: Response) => await caminhaoInstance.create(req, res));
caminhaoRoute.put("/caminhoes/:id", async(req: Request, res: Response) => await caminhaoInstance.update(req, res));
caminhaoRoute.delete("/caminhoes/:id", async(req: Request, res: Response) => await caminhaoInstance.delete(req, res));


export default caminhaoRoute;