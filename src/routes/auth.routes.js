import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login",authLimiter, login);

export default router;