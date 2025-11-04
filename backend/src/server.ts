import { pool } from "./db/connection";
import app from "./app";
import { sql } from "./db/db_connection";


const PORT: number = Number(process.env.PORT) || 3334;

// async function startServer() {
//   try {
//     const connection = await pool.getConnection();
//     await connection.ping();
//     connection.release();

//     console.log('✅ Conectado ao MySQL com sucesso!');

//     app.listen(PORT, () => {
//       console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error('❌ Erro ao conectar no MySQL:', (err as Error).message);
//     process.exit(1);
//   }
// }

// startServer();

async function startServer() {
  try {
    // Tenta executar uma query simples para verificar a conexão com o PostgreSQL
    await sql`SELECT 1`;

    console.log('✅ Conectado ao PostgreSQL com sucesso!');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao conectar no PostgreSQL:', (err as Error).message);
    process.exit(1);
  }
}

startServer();