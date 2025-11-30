import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30, 
    message: { error: "Too many requests." },
    standardHeaders: true,    // retorno no header RateLimit-*
    legacyHeaders: false,     // desativa headers antigos
});

export default authLimiter;