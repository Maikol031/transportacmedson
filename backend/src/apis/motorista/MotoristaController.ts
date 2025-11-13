import { Request, Response } from "express";
import MotoristaService from "./MotoristaService";
import Motorista, { IMotoristaDB } from "../../db/models/Motorista";

export default class MotoristaController {
    constructor(private readonly service: MotoristaService) {}

    async get(req: Request, res: Response) {
        try {
            const data: { data: IMotoristaDB[], total: number } = await this.service.get(req.query);
            res.json({ result: Motorista.fromDBArray(data.data) });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao buscar motoristas" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const novoMotorista: IMotoristaDB = req.body;
            const result = await this.service.create(novoMotorista);
            res.status(201).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao criar motorista" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const motorista = await this.service.update(Number(id), req.body);

            if (!motorista) return res.status(404).json({ error: "Motorista não encontrado" });

            res.json(motorista);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao atualizar motorista" });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.service.delete(Number(id));

            res.json({ message: "Motorista removido com sucesso" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao excluir motorista" });
        }
    }
}
