// src/apis/pagamento/PagamentoController.ts
import { Request, Response } from "express";
import PagamentoService from "./PagamentoService";
import Pagamento, { IPagamentoDB } from "../../db/models/Pagamento";

export default class PagamentoController {

    constructor(private readonly service: PagamentoService) {}

    // GET /contratos/:contratoId/pagamentos
    async get(req: Request, res: Response) {
        try {
            const contratoId = Number(req.params.contratoId);
            const result = await this.service.get(contratoId, req.query);
            return res.json({ result: Pagamento.fromDBArray(result.data), total: result.total });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar pagamentos" });
        }
    }

    // GET /contratos/:contratoId/pagamentos/:id
    async getById(req: Request, res: Response) {
        try {
            const contratoId = Number(req.params.contratoId);
            const id = Number(req.params.id);

            const pagamento = await this.service.getById(contratoId, id);
            if (!pagamento) return res.status(404).json({ error: "Pagamento não encontrado" });

            return res.json(pagamento);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao buscar pagamento" });
        }
    }

    // POST /contratos/:contratoId/pagamentos
    async create(req: Request, res: Response) {
        try {
            const contratoId = Number(req.params.contratoId);
            const payload = req.body as Partial<IPagamentoDB>;

            const created = await this.service.create(contratoId, payload);
            return res.status(201).json(created);
        } catch (err: any) {
            console.error(err);
            return res.status(400).json({ error: err.message ?? "Erro ao criar pagamento" });
        }
    }

    // PUT /contratos/:contratoId/pagamentos/:id
    async update(req: Request, res: Response) {
        try {
            const contratoId = Number(req.params.contratoId);
            const id = Number(req.params.id);
            const payload = req.body as Partial<IPagamentoDB>;

            const updated = await this.service.update(contratoId, id, payload);
            if (!updated) return res.status(404).json({ error: "Pagamento não encontrado" });

            return res.json(updated);
        } catch (err) {
            console.error(err);
            return res.status(400).json({ error: "Erro ao atualizar pagamento" });
        }
    }

    // DELETE /contratos/:contratoId/pagamentos  (body: { ids: [1,2,3] })
    async delete(req: Request, res: Response) {
        try {
            const contratoId = Number(req.params.contratoId);
            const { ids } = req.body;

            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({ error: "Envie um array de IDs para deletar" });
            }

            await this.service.delete(contratoId, ids.map(Number));
            return res.json({ message: "Pagamentos removidos com sucesso" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro ao excluir pagamento(s)" });
        }
    }
}
