import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sql } from "../db/db_connection";

export default class AuthService {

    async register(email: string, password: string, role: string = "user") {
        const hashed = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (email, password_hash, role)
            VALUES (${email}, ${hashed}, ${role})
        `;

        return { message: "Usuário criado com sucesso" };
    }

    async login(email: string, password: string) {
        const user = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;

        if (user.length === 0) {
            throw new Error("Usuário não encontrado");
        }

        const valid = await bcrypt.compare(password, user[0].password_hash);

        if (!valid) {
            throw new Error("Senha inválida");
        }

        const token = jwt.sign(
            {
                id: user[0].id,
                email: user[0].email,
                role: user[0].role
            },
            process.env.JWT_SECRET!, // defina no .env
            { expiresIn: "8h" }
        );

        return { token };
    }

}


