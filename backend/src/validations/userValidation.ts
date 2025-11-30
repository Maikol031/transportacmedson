import { z } from "zod";
import { passwordSchema } from "./passwordValidadtion";

export const registerSchema = z.object({
    email: z.email({ message: "E-mail inválido" }),
    senha: passwordSchema,
    role: z.string().optional()
});