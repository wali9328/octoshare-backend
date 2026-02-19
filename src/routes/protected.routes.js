import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authRequired, (req, res) => {
  res.json({
    success: true,
    message: "Protected route working",
    user: req.user
  });
});

export default router;