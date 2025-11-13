import express, { Application } from "express";
import cors from "cors";
import route from "./routes/router";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute";
import errorLogger from "./middleware/erroLogger";

const app: Application = express();

const allowedOrigins = ['http://localhost:5173', 'https://your-frontend-domain.com'];
const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins
};

const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5, 
    message: "Limite de tentativas excedido. Tente novamente em alguns minutos."
});

app.use(cookieParser());
app.use(express.json())
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // garante segurança para cookies/tokens se um dia for necessário
}));

app.use(helmet());
app.use("/auth/login", authLimiter);

app.use(authRoutes);
app.use(route);

app.use(errorLogger);

export default app;