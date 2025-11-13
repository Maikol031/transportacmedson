import { Request, Response, NextFunction } from "express";
import { sql } from "../db/db_connection"; // ajuste o caminho conforme seu projeto

const errorLogger = async (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    // const usuarioId = (req as any).user?.id ?? null;
    const usuarioId = req.user?.id ? Number(req.user.id) : null;

    try {
        await sql`
            INSERT INTO log_excecao (usuario_id, endpoint, metodo, mensagem, stacktrace)
            VALUES (
                ${usuarioId ? Number(usuarioId) : null},
                ${req.originalUrl},
                ${req.method},
                ${err.message},
                ${err.stack}
            )
        `;
    } catch (dbError) {
        console.error("Erro ao registrar exceção no banco:", dbError);
    }

    // Retorna resposta ao cliente
    return res.status(500).json({
        error: "Erro interno no servidor",
        message: err.message // pode remover se quiser esconder do client
    });
};

export default errorLogger;
