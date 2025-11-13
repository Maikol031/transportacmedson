import { pool } from "../../db/connection";
import Caminhao, { ICaminhaoDB } from "../../db/models/Caminhao";
import { sql } from "../../db/db_connection";

// export default class CaminhaoService {

//   async get(queryParams: any):  Promise<{ data: ICaminhaoDB[]; total: number; }> {

//     const { page, pageSize } = queryParams;

//     const [countResult] = await pool.query(
//       `SELECT COUNT(*) AS total FROM CAMINHAO`
//     );

//     const total = countResult[0].total;

//     const offset = (Number(page) - 1) * Number(pageSize);
//     const query = `
//       SELECT * FROM CAMINHAO
//       ORDER BY ID
//       LIMIT ? OFFSET ?;
//     `;

//     const [rows] = await pool.query(query, [Number(pageSize), Number(offset)]);
//     return {
//       data: rows as ICaminhaoDB[],
//       total,
//     }
//   }

//   async update(id: number, data) {

//   }

//   async create(data) {

//   }

//   async delete(id: number) {

//   }


// }

export default class CaminhaoService {
  async get(queryParams: any): Promise<{ data: ICaminhaoDB[]; total: number }> {
    const { page = 1, pageSize = 10 } = queryParams;

    const [{ total }] = await sql<{ total: number }[]>`
      SELECT COUNT(*)::int AS total FROM CAMINHAO
    `;

    const offset = (Number(page) - 1) * Number(pageSize);

    const rows = await sql<ICaminhaoDB[]>`
      SELECT *
      FROM CAMINHAO
      ORDER BY ID DESC
      LIMIT ${Number(pageSize)} OFFSET ${Number(offset)};
    `;

    return { data: rows, total };
  }

  async create(caminhao: Caminhao) {
    const [inserted] = await sql<ICaminhaoDB[]>`
      INSERT INTO CAMINHAO (placa, marca, modelo, licenciamento, aets, renavam)
      VALUES (${caminhao.placa}, ${caminhao.marca}, ${caminhao.modelo},
              ${caminhao.licenciamento}, ${caminhao.aets}, ${caminhao.renavam})
      RETURNING *;
    `;
    return inserted;
  }

  async update(id: string, caminhao: Partial<Caminhao>) {
    // Mapeia as chaves do objeto JS (camelCase) para as colunas do DB (UPPERCASE)
    const jsToDb: { [key: string]: string } = {
      placa: 'placa',
      marca: 'marca',
      modelo: 'modelo',
      licenciamento: 'licenciamento',
      aets: 'aets',
      renavam: 'renavam'
    };

    // Cria um objeto apenas com os campos que foram enviados na requisição,
    // mas com as chaves já no formato das colunas do banco de dados.
    const fieldsToUpdate = Object.entries(caminhao)
      .filter(([key, value]) => value !== undefined && jsToDb[key])
      .reduce((acc, [key, value]) => {
        acc[jsToDb[key]] = value;
        return acc;
      }, {} as { [key: string]: any });

    // Se nenhum campo válido foi enviado, não faz nada e retorna.
    if (Object.keys(fieldsToUpdate).length === 0) {
      // Opcional: você pode buscar e retornar o objeto atual ou lançar um erro.
      const [current] = await sql<ICaminhaoDB[]>`SELECT * FROM CAMINHAO WHERE ID = ${id}`;
      return current;
    }

    // Usa o helper sql(object) para gerar a cláusula SET dinamicamente e de forma segura.
    const [updated] = await sql<ICaminhaoDB[]>`
      UPDATE CAMINHAO
      SET ${sql(fieldsToUpdate)}
      WHERE ID = ${id}
      RETURNING *;
    `;
    return updated;
  }

  async delete(id: string) {
    await sql`DELETE FROM CAMINHAO WHERE ID = ${id}`;
  }
  
}
