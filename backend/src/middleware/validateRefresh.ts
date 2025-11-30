import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sql } from "../db/db_connection";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

export default async function validateRefresh(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies?.refreshToken;
        const accessToken = req.body?.accessToken;

        if (!refreshToken) {
            return res.status(401).json({ error: "Refresh token ausente" });
        }

        if (!accessToken) {
            return res.status(400).json({ error: "Access token é obrigatório no corpo da requisição" });
        }

        // Apenas extrair payload do access token sem verificar expiração
        let decodedAccess: any;
        try {
            decodedAccess = jwt.verify(accessToken, ACCESS_TOKEN_SECRET, { ignoreExpiration: true });
        } catch (err) {
            return res.status(401).json({ error: "Access token inválido" });
        }

        let decodedRefresh: any;
        try {
            decodedRefresh = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        } catch (err) {
            return res.status(403).json({ error: "Refresh token inválido" });
        }

        if (decodedRefresh.id !== decodedAccess.id) {
            return res.status(403).json({ error: "Tokens não pertencem ao mesmo usuário" });
        }

        const [user] = await sql`
            SELECT id, role FROM usuario WHERE refresh_token = ${refreshToken}
        `;

        if (!user) {
            return res.status(403).json({ error: "Refresh token não registrado" });
        }

        (req as any).tokenUser = user;

        next();

    } catch (error) {
        console.error("Erro no validateRefresh:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
}
