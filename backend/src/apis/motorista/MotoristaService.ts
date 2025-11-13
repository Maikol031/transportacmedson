import { sql } from "../../db/db_connection";
import { IMotoristaDB } from "../../db/models/Motorista";

export default class MotoristaService {

    async get(queryParams: any): Promise<{ data: IMotoristaDB[]; total: number }> {
        const { page = 1, pageSize = 10 } = queryParams;

        const [{ total }] = await sql<{ total: number }[]>`
        SELECT COUNT(*)::int AS total FROM MOTORISTA
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
            SELECT * FROM MOTORISTA WHERE id = ${id};
        `;
        return motorista ?? null;
    }

    async create(data: IMotoristaDB): Promise<IMotoristaDB> {
        const [inserted] = await sql<IMotoristaDB[]>`
            INSERT INTO motorista (nome, cpf, celular, cnh, categoria_cnh, validade_cnh, status)
            VALUES (${data.nome}, ${data.cpf}, ${data.celular}, ${data.cnh}, ${data.categoria_cnh}, ${data.validade_cnh}, ${data.status})
            RETURNING *;
        `;
        return inserted;
    }

    async update(id: number, data: Partial<IMotoristaDB>): Promise<IMotoristaDB | null> {
        const [updated] = await sql<IMotoristaDB[]>`
            UPDATE motorista
            SET nome = COALESCE(${data.nome}, nome),
                cpf = COALESCE(${data.cpf}, cpf),
                celular = COALESCE(${data.celular}, celular),
                cnh = COALESCE(${data.cnh}, cnh),
                categoria_cnh = COALESCE(${data.categoria_cnh}, categoria_cnh),
                validade_cnh = COALESCE(${data.validade_cnh}, validade_cnh),
                status = COALESCE(${data.status}, status)
            WHERE id = ${id}
            RETURNING *;
        `;
        return updated ?? null;
    }

    async delete(id: number): Promise<void> {
        await sql`DELETE FROM motorista WHERE id = ${id}`;
    }
}
