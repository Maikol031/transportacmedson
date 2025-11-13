import { Request, Response, NextFunction } from "express";
import { sql } from "../db/db_connection";

export const logAcesso = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioId = req.user?.id; // req.user vem do middleware auth

        if (!usuarioId) {
            return next(); // Não loga requisições sem usuário autenticado
        }

        await sql`
            INSERT INTO log_acesso (usuario_id, endpoint, metodo, ip, user_agent)
            VALUES (
                ${usuarioId},
                ${req.originalUrl},
                ${req.method},
                ${req.ip},
                ${req.headers["user-agent"] ?? ""}
        )`;

    } catch (err) {
        console.error("Erro ao registrar log de acesso:", err);
    }

    next();
}
