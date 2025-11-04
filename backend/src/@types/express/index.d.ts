import "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
  id: string;
  email: string;
  role: "admin" | "user";  // ✅ agora o TS sabe quais roles existem
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload; // ✅ agora user é do tipo certo
    }
  }
}
