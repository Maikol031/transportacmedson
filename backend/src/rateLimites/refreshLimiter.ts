import rateLimit from "express-rate-limit";

const refreshLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5, 
    message: { error: "Too many requests." },
    standardHeaders: true,    // retorno no header RateLimit-*
    legacyHeaders: false,     // desativa headers antigos
});

export default refreshLimiter;