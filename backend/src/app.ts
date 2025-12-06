import express, { Application } from "express";
import cors from "cors";
import route from "./routes/router";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute";
import passwordRoutes from "./routes/passwordResetRoute";
import errorLogger from "./middleware/erroLogger";
import authMiddleware from "./middleware/auth";

const app: Application = express();

const allowedOrigins = ['http://localhost:5173', 'https://your-frontend-domain.com'];
const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cookieParser());
app.use(express.json());
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

app.use("/auth", authRoutes);
app.use(passwordRoutes);
app.use("/api", route);

app.use(errorLogger);

export default app;