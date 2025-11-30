import { Request, Response } from "express";
import ClienteService from "./ClienteService";
import Cliente, { IClienteDB } from "../../db/models/Cliente";

export default class ClienteController {
    constructor(private readonly service: ClienteService) {}

    async get(req: Request, res: Response) {
        try {
            const data: { data: IClienteDB[], total: number } = await this.service.get(req.query);
            res.json({ result: Cliente.fromDBArray(data.data) });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao buscar clientes" });
        }
    }

    async search(req: Request, res: Response) {
        try {
            const { text } = req.params;
            const cliente: { clientes: IClienteDB[] } = await this.service.search(text);
            res.json(cliente);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao buscar clientes" });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const novoCliente: IClienteDB = req.body;
            const result = await this.service.create(novoCliente);
            res.status(201).json(result);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao criar cliente" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const cliente = await this.service.update(Number(id), req.body);

            if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

            res.json(cliente);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao atualizar cliente" });
        }
    }

    // DELETE com IN
    async delete(req: Request, res: Response) {
        try {
            const { ids } = req.body; // ids: number[]

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ error: "Envie um array de IDs para deletar" });
            }

            await this.service.delete(ids);

            res.json({ message: "Clientes removidos com sucesso" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao excluir clientes" });
        }
    }
}
