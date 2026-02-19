import express from "express";
import { getEarningsSummary } from "../controllers/earnings.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authRequired, getEarningsSummary);

export default router;