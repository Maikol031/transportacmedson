import { sql } from "../../db/db_connection";
import { IPostoDB } from "../../db/models/Posto";

export default class PostoService {

    async get(queryParams: any): Promise<{ data: IPostoDB[]; total: number }> {
        const { page = 1, pageSize = 10 } = queryParams;

        const [{ total }] = await sql<{ total: number }[]>`
            SELECT COUNT(*)::int AS TOTAL FROM POSTO
        `;

        const offset = (Number(page) - 1) * Number(pageSize);

        const rows = await sql<IPostoDB[]>`
            SELECT *
            FROM POSTO
            ORDER BY ID
            LIMIT ${Number(pageSize)} OFFSET ${Number(offset)};
        `;

        return { data: rows, total };
    }

    async getById(id: number): Promise<IPostoDB | null> {
        const [posto] = await sql<IPostoDB[]>`
            SELECT * FROM POSTO WHERE ID = ${id}
        `;
        return posto ?? null;
    }

    async create(data: IPostoDB): Promise<IPostoDB> {
        const [inserted] = await sql<IPostoDB[]>`
            INSERT INTO POSTO (NOME, CNPJ, CIDADE_ID, CEP)
            VALUES (${data.nome}, ${data.cnpj}, ${data.cidade_id}, ${data.cep})
            RETURNING *
        `;
        return inserted;
    }

    async update(id: number, data: Partial<IPostoDB>): Promise<IPostoDB | null> {
        const [updated] = await sql<IPostoDB[]>`
            UPDATE POSTO
            SET NOME = COALESCE(${data.nome}, NOME),
                CNPJ = COALESCE(${data.cnpj}, CNPJ),
                CIDADE_ID = COALESCE(${data.cidade_id}, CIDADE_ID),
                CEP = COALESCE(${data.cep}, CEP)
            WHERE ID = ${id}
            RETURNING *
        `;
        return updated ?? null;
    }

    async delete(ids: number[]): Promise<void> {
        await sql`
            DELETE FROM POSTO
            WHERE ID IN ${sql(ids)}
        `;
    }
}
