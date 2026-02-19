import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { getReferralDashboard } from "../controllers/referrals.controller.js";

const router = Router();

router.get("/", authRequired, getReferralDashboard);

export default router;