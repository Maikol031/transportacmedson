import { sql } from "../../db/db_connection";
import { IMotoristaDB } from "../../db/models/Motorista";

export default class MotoristaService {

    async get(queryParams: any): Promise<{ data: IMotoristaDB[]; total: number }> {
        const { page = 1, pageSize = 10 } = queryParams;

        const [{ total }] = await sql<{ total: number }[]>`
        SELECT COUNT(*)::int AS TOTAL FROM MOTORISTA
        `;

        const offset = (Number(page) - 1) * Number(pageSize);

        const rows = await sql<IMotoristaDB[]>`
        SELECT *
        FROM MOTORISTA
        ORDER BY ID
        LIMIT ${Number(pageSize)} OFFSET ${Number(offset)};
        `;

        return { data: rows, total };
    }

    async getById(id: number): Promise<IMotoristaDB | null> {
        const [motorista] = await sql<IMotoristaDB[]>`
            SELECT * FROM MOTORISTA WHERE ID = ${id};
        `;
        return motorista ?? null;
    }

    async create(data: IMotoristaDB): Promise<IMotoristaDB> {
        const [inserted] = await sql<IMotoristaDB[]>`
            INSERT INTO MOTORISTA (NOME, CPF, CELULAR, CNH, CATEGORIA_CNH, VALIDADE_CNH, STATUS)
            VALUES (${data.nome}, ${data.cpf}, ${data.celular}, ${data.cnh}, ${data.categoria_cnh}, ${data.validade_cnh}, ${data.status})
            RETURNING *;
        `;
        return inserted;
    }

    async update(id: number, data: Partial<IMotoristaDB>): Promise<IMotoristaDB | null> {
        const [updated] = await sql<IMotoristaDB[]>`
            UPDATE MOTORISTA
            SET NOME = COALESCE(${data.nome}, NOME),
                CPF = COALESCE(${data.cpf}, CPF),
                CELULAR = COALESCE(${data.celular}, CELULAR),
                CNH = COALESCE(${data.cnh}, CNH),
                CATEGORIA_CNH = COALESCE(${data.categoria_cnh}, CATEGORIA_CNH),
                VALIDADE_CNH = COALESCE(${data.validade_cnh}, VALIDADE_CNH),
                STATUS = COALESCE(${data.status}, STATUS)
            WHERE ID = ${id}
            RETURNING *;
        `;
        return updated ?? null;
    }

    async delete(id: number): Promise<void> {
        await sql`DELETE FROM motorista WHERE id = ${id}`;
    }
}
