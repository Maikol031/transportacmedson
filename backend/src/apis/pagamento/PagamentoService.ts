// src/apis/pagamento/PagamentoService.ts
import { sql } from "../../db/db_connection";
import { IPagamentoDB } from "../../db/models/Pagamento";

export default class PagamentoService {

    async get(contratoId: number, queryParams: any): Promise<{ data: IPagamentoDB[]; total: number }> {
        const { page = 1, pageSize = 10 } = queryParams;

        const [{ total }] = await sql<{ total: number }[]>`
            SELECT COUNT(*)::int AS total FROM PAGAMENTO WHERE CONTRATO_ID = ${contratoId}
        `;

        const offset = (Number(page) - 1) * Number(pageSize);

        const rows = await sql<IPagamentoDB[]>`
            SELECT *
            FROM pagamento
            WHERE CONTRATO_ID = ${contratoId}
            ORDER BY ID
            LIMIT ${Number(pageSize)} OFFSET ${Number(offset)};
        `;

        return { data: rows, total };
    }

    async getById(contratoId: number, id: number): Promise<IPagamentoDB | null> {
        const [pagamento] = await sql<IPagamentoDB[]>`
            SELECT * FROM PAGAMENTO WHERE CONTRATO_ID = ${contratoId} AND ID = ${id} LIMIT 1
        `;
        return pagamento ?? null;
    }

    async create(contratoId: number, data: Partial<IPagamentoDB>): Promise<IPagamentoDB> {
        // Normalize types to avoid cached-plan errors
        const tipo = String(data.tipo);
        const valor = Number(data.valor);
        const data_pagamento = String(data.data_pagamento);
        const caminhao_id = data.caminhao_id ? Number(data.caminhao_id) : null;
        const posto_id = data.posto_id ? Number(data.posto_id) : null;

        // Optional: verify contrato exists before insert (prevents orphan inserts)
        const [contrato] = await sql`
            SELECT id FROM CONTRATO WHERE ID = ${contratoId} LIMIT 1
        `;
        if (!contrato) throw new Error("Contrato não encontrado");

        const [inserted] = await sql<IPagamentoDB[]>`
            INSERT INTO PAGAMENTO (
                CONTRATO_ID, TIPO, VALOR, CAMINHAO_ID, POSTO_ID, DATA_PAGAMENTO
            )
            VALUES (${contratoId}, ${tipo}, ${valor}, ${caminhao_id}, ${posto_id}, ${data_pagamento})
            RETURNING *;
        `;
        return inserted;
    }

    async update(contratoId: number, id: number, data: Partial<IPagamentoDB>): Promise<IPagamentoDB | null> {
        // Ensure the payment belongs to the contract and update atomically
        const [existing] = await sql<IPagamentoDB[]>`
            SELECT * FROM PAGAMENTO WHERE ID = ${id} AND CONTRATO_ID = ${contratoId} LIMIT 1
        `;
        if (!existing) return null;

        const tipo = data.tipo ? String(data.tipo) : null;
        const valor = data.valor !== undefined ? Number(data.valor) : null;
        const caminhao_id = data.caminhao_id !== undefined ? (data.caminhao_id ? Number(data.caminhao_id) : null) : null;
        const posto_id = data.posto_id !== undefined ? (data.posto_id ? Number(data.posto_id) : null) : null;
        const data_pagamento = data.data_pagamento ? String(data.data_pagamento) : null;

        const [updated] = await sql<IPagamentoDB[]>`
            UPDATE PAGAMENTO
            SET 
                TIPO = COALESCE(${tipo}, TIPO),
                VALOR = COALESCE(${valor}, VALOR),
                CAMINHAO_ID = COALESCE(${caminhao_id}, CAMINHAO_ID),
                POSTO_ID = COALESCE(${posto_id}, POSTO_ID),
                DATA_PAGAMENTO = COALESCE(${data_pagamento}, DATA_PAGAMENTO)
            WHERE ID = ${id} AND CONTRATO_ID = ${contratoId}
            RETURNING *;
        `;
        return updated ?? null;
    }

    async delete(contratoId: number, ids: number[]): Promise<void> {
        // Delete only payments that belong to the provided contract
        await sql`
            DELETE FROM PAGAMENTO 
            WHERE CONTRATO_ID = ${contratoId} AND ID IN ${sql(ids)}
        `;
    }
}
