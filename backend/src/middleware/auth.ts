import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../@types/express"; // se necessário ajuste o caminho

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Token não fornecido" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err: any, decoded: any) => {
        if (err) return res.status(401).json({ error: "Token inválido ou expirado" });

        req.user = decoded;
        next();
    });
}

export function onlyAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Acesso negado" });
    }
    next();
}

