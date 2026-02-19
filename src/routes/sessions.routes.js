import { Router } from "express";
import { startSession, endSession } from "../controllers/sessions.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/start", authRequired, startSession);
router.post("/end", authRequired, endSession);

export default router;