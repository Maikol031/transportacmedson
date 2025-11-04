import express from "express";
import AuthService from "../services/AuthService";

const router = express.Router();
const service = new AuthService();

router.post("/register", async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const result = await service.register(email, password, role);
        res.json(result);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await service.login(email, password);
        res.json(result);
    } catch (e: any) {
        res.status(400).json({ error: e.message });
    }
});

export default router;
