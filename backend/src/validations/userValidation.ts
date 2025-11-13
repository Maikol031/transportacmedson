import { z } from "zod";

export const registerSchema = z.object({
    email: z.email({ message: "E-mail inválido" }),

    senha: z.string()
    .min(10, "A senha deve ter no mínimo 10 caracteres")
    .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve ter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve ter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "A senha deve ter pelo menos um caractere especial"),

    role: z.string().optional()
});