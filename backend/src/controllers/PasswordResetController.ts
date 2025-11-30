import { Request, Response } from "express";
import { sql } from "../db/db_connection";
import { sendOTPEmail } from "../utils/sendEmail2";
import { passwordSchema } from "../validations/passwordValidadtion";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { generateAccessToken } from "../utils/generateAccessToken";

function generateOTP() {
    return Math.floor(100_000 + Math.random() * 900_000).toString();
}

function expiresAtUTC() {
    return new Date(Date.now() + 10 * 60 * 1000); // UTC correto
}

export default class PasswordResetController {

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        if (!email) return res.status(400).json({ error: "Email obrigatório" });

        const [user] = await sql`
            SELECT ID FROM USUARIO WHERE EMAIL = ${email}
        `;

        // Não revela se o email existe
        if (!user) {
            return res.json({ message: "Se o email existir, enviaremos um código." });
        }

        // Verifica se já existe OTP válido
        const [existingOtp] = await sql`
            SELECT COUNT(*) AS COUNT
            FROM PASSWORD_RESET_OTP
            WHERE USER_ID = ${user.id}
            AND USED = FALSE
            AND EXPIRES_AT > NOW()
        `;

        if (existingOtp.count == 0) {

            const otp = generateOTP();
            const otpHash = await bcrypt.hash(otp, 10);
            const expiresAt = expiresAtUTC();

            await sql`
                INSERT INTO PASSWORD_RESET_OTP (USER_ID, OTP, EXPIRES_AT)
                VALUES (${user.id}, ${otpHash}, ${expiresAt})
            `;
            // await generateAccessToken();
            await sendOTPEmail(email, otp);
        }

        return res.json({ message: "Se o email existir, enviaremos um código." });
    }


    async verifyOTP(req: Request, res: Response) {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: "Email e OTP são obrigatórios" });
        }

        const [user] = await sql`
            SELECT ID FROM USUARIO WHERE EMAIL = ${email}
        `;

        if (!user) return res.status(400).json({ error: "Código inválido" });

        const [record] = await sql`
            SELECT *
            FROM PASSWORD_RESET_OTP
            WHERE USER_ID = ${user.id}
            AND USED = FALSE
            AND EXPIRES_AT > NOW()
            ORDER BY ID DESC
            LIMIT 1
        `;

        if (!record) {
            return res.status(400).json({ error: "Código inválido ou expirado" });
        }

        // Verifica tentativas
        if (record.attempts >= 3) {
            return res.status(429).json({ error: "Muitas tentativas. Solicite outro código." });
        }

        // Compara hash
        const match = await bcrypt.compare(otp, record.otp_hash);

        if (!match) {
            await sql`
                UPDATE PASSWORD_RESET_OTP
                SET ATTEMPTS = ATTEMPTS + 1
                WHERE ID = ${record.id}
            `;
            return res.status(400).json({ error: "Código inválido" });
        }

        // Marca como usado
        await sql`
            UPDATE PASSWORD_RESET_OTP
            SET USED = TRUE
            WHERE ID = ${record.id}
        `;

        return res.json({ message: "OTP validado com sucesso" });
    }


    async resetPassword(req: Request, res: Response) {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ error: "Email, OTP e nova senha são obrigatórios" });
        }

        try {
            passwordSchema.parse(newPassword);
        } catch (err) {
            if (err instanceof ZodError) {
                return res.status(400).json({
                    error: err.issues.map(i => i.message)
                });
            }
            throw err;
        }

        const [user] = await sql`
            SELECT ID FROM USUARIO WHERE EMAIL = ${email}
        `;

        if (!user) {
            return res.status(400).json({ error: "Código inválido" });
        }

        // Atualizar senha
        const hashed = await bcrypt.hash(newPassword, 10);

        await sql`
            UPDATE USUARIO 
            SET SENHA = ${hashed}, REFRESH_TOKEN = NULL
            WHERE ID = ${user.id}
        `;

        return res.json({ message: "Senha atualizada com sucesso!" });
    }

}
