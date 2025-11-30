import PasswordResetController from "../controllers/PasswordResetController";
import { Router } from "express";

const router = Router();
const passwordResetController = new PasswordResetController();

router.post("/auth/forgot-password", passwordResetController.forgotPassword);
router.post("/auth/verify-otp", passwordResetController.verifyOTP);
router.post("/auth/reset-password", passwordResetController.resetPassword);

export default router;