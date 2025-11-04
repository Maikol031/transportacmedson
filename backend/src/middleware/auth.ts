import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../@types/express"; // se necessário ajuste o caminho

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não enviado" });
    }

    const [, token] = authHeader.split(" ");

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
        req.user = decoded; // <-- agora qualquer rota pode acessar req.user
        next();
    } catch {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
}

export function onlyAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Acesso negado" });
    }
    next();
}

