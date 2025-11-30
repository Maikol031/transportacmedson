import { sql } from "../../db/db_connection";
import { IClienteDB } from "../../db/models/Cliente";
import buildSequentialPattern from "../../utils/searchSequentialPattern";

export default class ClienteService {

    async get(queryParams: any): Promise<{ data: IClienteDB[]; total: number }> {
        const { page = 1, pageSize = 10 } = queryParams;

        const [{ total }] = await sql<{ total: number }[]>`
            SELECT COUNT(*)::int AS TOTAL FROM CLIENTE
        `;

        const offset = (Number(page) - 1) * Number(pageSize);

        const rows = await sql<IClienteDB[]>`
            SELECT *
            FROM CLIENTE
            ORDER BY ID
            LIMIT ${Number(pageSize)} OFFSET ${Number(offset)};
        `;

        return { data: rows, total };
    }

    async getById(id: number): Promise<IClienteDB | null> {
        const [cliente] = await sql<IClienteDB[]>`
            SELECT * FROM CLIENTE WHERE ID = ${id};
        `;
        return cliente ?? null;
    }

    async search(text: string): Promise<{clientes: IClienteDB[]} | null> {

        const conditions = buildSequentialPattern(text);

        const whereClause = sql`
            WHERE ${conditions.reduce((acc, c, i) => i === 0 ? c : sql`${acc} AND ${c}`)}
        `;

        const cliente = await sql<IClienteDB[]>`
            SELECT *
            FROM CLIENTE
            ${whereClause} 
            LIMIT 10
        `;
        
        return { clientes: cliente };
    }

    async create(data: IClienteDB): Promise<IClienteDB> {
            const nome = String(data.nome);
            const razao_social = data.razao_social ? String(data.razao_social) : null;
            const documento = String(data.documento);
            const email = data.email ? String(data.email) : null;
            const celular = data.celular ? String(data.celular) : null;

            const [inserted] = await sql<IClienteDB[]>`
                INSERT INTO CLIENTE (NOME, RAZAO_SOCIAL, DOCUMENTO, EMAIL, CELULAR)
                VALUES (${nome}, ${razao_social}, ${documento}, ${email}, ${celular})
                RETURNING *;
            `;

            return inserted;
    }

    async update(id: number, data: Partial<IClienteDB>): Promise<IClienteDB | null> {
        const [updated] = await sql<IClienteDB[]>`
            UPDATE CLIENTE
            SET NOME = COALESCE(${data.nome}, NOME),
                RAZAO_SOCIAL = COALESCE(${data.razao_social}, RAZAO_SOCIAL),
                DOCUMENTO = COALESCE(${data.documento}, DOCUMENTO),
                EMAIL = COALESCE(${data.email}, EMAIL),
                CELULAR = COALESCE(${data.celular}, CELULAR)
            WHERE ID = ${id}
            RETURNING *;
        `;

        return updated ?? null;
    }

    // DELETE com IN
    async delete(ids: number[]): Promise<void> {
        await sql`
            DELETE FROM CLIENTE 
            WHERE ID IN ${sql(ids)}
        `;
    }
}
