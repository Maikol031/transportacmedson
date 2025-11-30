import { Request, Response } from "express";
import PostoService from "./PostoService";
import Posto, { IPostoDB } from "../../db/models/Posto";

export default class PostoController {
    constructor(private readonly service: PostoService) {}

    async get(req: Request, res: Response) {
        try {
            const data: { data: IPostoDB[], total: number } = await this.service.get(req.query);
            res.json({ result: Posto.fromDBArray(data.data) });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao buscar postos" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const posto: IPostoDB = req.body;
            const result = await this.service.create(posto);
            res.status(201).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao criar posto" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const posto = await this.service.update(Number(id), req.body);

            if (!posto) return res.status(404).json({ error: "Posto não encontrado" });

            res.json(posto);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao atualizar posto" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { ids } = req.body;

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ error: "Envie um array de IDs para deletar" });
            }

            await this.service.delete(ids);
            res.json({ message: "Postos removidos com sucesso" });

        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao excluir posto(s)" });
        }
    }
}
