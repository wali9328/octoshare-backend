import express from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { registerDevice } from "../controllers/device.controller.js";

const router = express.Router();

router.post("/register", authRequired, registerDevice);

export default router;