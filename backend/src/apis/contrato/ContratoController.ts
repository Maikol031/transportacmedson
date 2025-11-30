import { Request, Response } from "express";
import Contrato from "../../db/models/Contrato";
import ContratoService from "./ContratoService";

export default class ContratoController {

    constructor(private readonly service: ContratoService) {}

    async get(req: Request, res: Response) {
        try {
            const result = await this.service.get(req.query);
            res.json({ result: Contrato.fromDBArray(result.data), total: result.total });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao buscar contratos" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const contrato = await this.service.getById(id);

            if (!contrato) return res.status(404).json({ error: "Contrato não encontrado" });

            res.json(contrato);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao buscar contrato" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const created = await this.service.create(req.body);
            res.status(201).json(created);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: "Erro ao criar contrato" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updated = await this.service.update(id, req.body);

            if (!updated) return res.status(404).json({ error: "Contrato não encontrado" });

            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: "Erro ao atualizar contrato" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { ids } = req.body;

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ error: "Envie um array de IDs para deletar" });
            }

            await this.service.delete(ids.map(Number));
            res.json({ message: "Contratos excluídos com sucesso" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao excluir contratos" });
        }
    }
}
