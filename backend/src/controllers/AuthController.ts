import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sql } from "../db/db_connection";
import { registerSchema } from "../validations/userValidation";
import { ZodError } from "zod";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

function generateAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

export default class AuthController {

    async register(req: Request, res: Response) {
        try {

            const { email, senha, role } = registerSchema.parse(req.body);

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            // Verifica se usuário já existe
            const [exists] = await sql`
                SELECT * FROM usuario WHERE email = ${email};
            `;

            if (exists) {
                return res.status(409).json({ error: "E-mail já cadastrado" });
            }

            // Criptografa senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // Insere usuário
            const [user] = await sql`
                INSERT INTO usuario (email, senha, role)
                VALUES (${email}, ${senhaHash}, ${role ?? "user"})
                RETURNING id, email, role, dh_inc;
            `;

            return res.status(201).json({
                message: "Usuário criado com sucesso!",
                user
            });

        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: err.issues.map((e) => e.message)
                });
            }

            console.error("Erro ao registrar usuário:", err);
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }

    async login(req: Request, res: Response) {
        try {

            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            const normalizedEmail = email.trim().toLowerCase();

            const [user] = await sql`
                SELECT id, senha, role FROM usuario WHERE email = ${normalizedEmail} LIMIT 1
            `;

            const fakeHash = "$2b$10$..............................................";

            if (!user) {
                await bcrypt.compare(senha, fakeHash);
                return res.status(404).json({ error: "Credenciais inválidas!" });
            }

            const senhaCorreta = await bcrypt.compare(senha, user.senha);
            if (!senhaCorreta) {
                return res.status(404).json({ error: "Credenciais inválidas!" });
            }

            const accessToken = generateAccessToken({ id: user.id, role: user.role });
            const refreshToken = generateRefreshToken({ id: user.id });

            await sql`UPDATE usuario SET refresh_token = ${refreshToken} WHERE id = ${user.id}`;

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production",          // exige HTTPS em produção
                // secure: true,
                sameSite: "strict",    // impede CSRF
                maxAge: 1000 * 60 * 60 * 24 * 7
            });

            return res.json({
                accessToken,
                refreshToken,
                user: { id: user.id, email: user.email, role: user.role }
            });

        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ error: "Erro interno no servidor" });
        }
    }

    async refresh(req, res) {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) return res.status(401).json({ error: "Sem refresh token" });

        const [user] = await sql`
            SELECT * FROM usuario WHERE refresh_token = ${refreshToken}
        `;
        if (!user) return res.status(403).json({ error: "Refresh token inválido" });

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, decoded: any) => {

            if (err) return res.status(403).json({ error: "Token inválido" });

            const newAccessToken = generateAccessToken({ id: user.id, role: user.role });
            return res.json({ accessToken: newAccessToken });

        });
    }

    async logout(req: Request, res: Response) {
        res.clearCookie("refreshToken");

        await sql`UPDATE usuario SET refresh_token = NULL WHERE id = ${req.user.id}`;

        return res.json({ message: "Logout realizado com sucesso" });
    }

}
