import { sql } from "../../db/db_connection";
import { IContratoDB } from "../../db/models/Contrato";

export default class ContratoService {

    async get(query: any): Promise<{ data: IContratoDB[]; total: number }> {

        const {
            page = 1,
            pageSize = 10,
            nroContrato,
            clienteId,
            caminhaoId,
            origemId,
            destinoId,
            statusViagem,
            statusContrato,
            dataInicio,
            dataFim
        } = query;

        const conditions = [];

        if (nroContrato) {
            conditions.push(sql`c.nro_contrato = ${nroContrato}`);
        }

        if (clienteId) {
            conditions.push(sql`c.cliente_id = ${clienteId}`);
        }

        if (caminhaoId) {
            conditions.push(sql`c.caminhao_id = ${caminhaoId}`);
        }

        if (origemId) {
            conditions.push(sql`c.origem_id = ${origemId}`);
        }

        if (destinoId) {
            conditions.push(sql`c.destino_id = ${destinoId}`);
        }

        if (statusViagem) {
            conditions.push(sql`c.status_viagem = ${statusViagem}`);
        }

        if (statusContrato) {
            conditions.push(sql`c.status_contrato = ${statusContrato}`);
        }

        if (dataInicio || dataFim) {
            conditions.push(sql`c.data_emissao BETWEEN TO_DATE(${dataInicio ? dataInicio : '01/01/2000'}, 'DD/MM/YYYY') AND TO_DATE(${dataFim ? dataFim : '31/12/9999'}, 'DD/MM/YYYY')`);
        }

        let whereClause = sql``;

        if (conditions.length > 0) {
            whereClause = sql`WHERE ${conditions.reduce((acc, cond, i) => {
                return i === 0 ? cond : sql`${acc} AND ${cond}`;
            }, sql``)}`;
        }

        const offset = (Number(page) - 1) * Number(pageSize);

        const [{ total }] = await sql<{ total: number }[]>`
            SELECT COUNT(*)::int AS TOTAL
            FROM CONTRATO C
            ${whereClause}
        `;

        const data = await sql<IContratoDB[]>`
            SELECT
                c.*
            FROM CONTRATO C
            ${whereClause}
            ORDER BY C.ID DESC
            LIMIT ${Number(pageSize)} 
            OFFSET ${Number(offset)}
        `;

        return { data, total };
    }


    async getById(id: number): Promise<IContratoDB | null> {
        const [contrato] = await sql<IContratoDB[]>`
            SELECT * FROM CONTRATO WHERE ID = ${id} LIMIT 1
        `;
        return contrato ?? null;
    }

    async create(data: Partial<IContratoDB>): Promise<IContratoDB> {

        const nro_contrato = data.nro_contrato ? String(data.nro_contrato) : null;
        const cliente_id = Number(data.cliente_id);
        const origem_id = Number(data.origem_id);
        const destino_id = Number(data.destino_id);
        const caminhao_id = Number(data.caminhao_id);

        const data_emissao = String(data.data_emissao);
        const data_saida = data.data_saida ? String(data.data_saida) : null;

        const peso = Number(data.peso);
        const vlr_unitario = Number(data.vlr_unitario);
        const vlr_total = Number(data.vlr_total);
        const vlr_pago = Number(data.vlr_pago ?? 0);

        const status_viagem = (data.status_viagem ?? "em_andamento") as any;
        const status_contrato = (data.status_contrato ?? "pendente") as any;

        const [inserted] = await sql<IContratoDB[]>`
            INSERT INTO contrato (
                NRO_CONTRATO, CLIENTE_ID, ORIGEM_ID, DESTINO_ID, CAMINHAO_ID,
                DATA_EMISSAO, DATA_SAIDA, PESO, VLR_UNITARIO, VLR_TOTAL,
                VLR_PAGO, STATUS_VIAGEM, STATUS_CONTRATO
            )
            VALUES (
                ${nro_contrato}, ${cliente_id}, ${origem_id}, ${destino_id}, ${caminhao_id},
                ${data_emissao}, ${data_saida}, ${peso}, ${vlr_unitario}, ${vlr_total},
                ${vlr_pago}, ${status_viagem}, ${status_contrato}
            )
            RETURNING *;
        `;

        return inserted;
    }

    async update(id: number, data: Partial<IContratoDB>): Promise<IContratoDB | null> {

        const [updated] = await sql<IContratoDB[]>`
            UPDATE CONTRATO
            SET 
                NRO_CONTRATO = COALESCE(${data.nro_contrato ?? null}, NRO_CONTRATO),
                CLIENTE_ID = COALESCE(${data.cliente_id ? Number(data.cliente_id) : null}, CLIENTE_ID),
                ORIGEM_ID = COALESCE(${data.origem_id ? Number(data.origem_id) : null}, ORIGEM_ID),
                DESTINO_ID = COALESCE(${data.destino_id ? Number(data.destino_id) : null}, DESTINO_ID),
                CAMINHAO_ID = COALESCE(${data.caminhao_id ? Number(data.caminhao_id) : null}, CAMINHAO_ID),
                DATA_EMISSAO = COALESCE(${data.data_emissao ?? null}, DATA_EMISSAO),
                DATA_SAIDA = COALESCE(${data.data_saida ?? null}, DATA_SAIDA),
                PESO = COALESCE(${data.peso ? Number(data.peso) : null}, PESO),
                VLR_UNITARIO = COALESCE(${data.vlr_unitario ? Number(data.vlr_unitario) : null}, VLR_UNITARIO),
                VLR_TOTAL = COALESCE(${data.vlr_total ? Number(data.vlr_total) : null}, VLR_TOTAL),
                VLR_PAGO = COALESCE(${data.vlr_pago ? Number(data.vlr_pago) : null}, VLR_PAGO),
                STATUS_VIAGEM = COALESCE(${data.status_viagem ?? null}, STATUS_VIAGEM),
                STATUS_CONTRATO = COALESCE(${data.status_contrato ?? null}, STATUS_CONTRATO)
            WHERE ID = ${id}
            RETURNING *;
        `;

        return updated ?? null;
    }

    async delete(ids: number[]): Promise<void> {
        await sql`
            DELETE FROM CONTRATO
            WHERE ID IN ${sql(ids)}
        `;
    }
}
