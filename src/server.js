import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import prisma from "./config/prisma.js";

// ROUTES (import only)
import earningsRoutes from "./routes/earnings.routes.js";
import deviceRoutes from "./routes/device.routes.js";
import authRoutes from "./routes/auth.routes.js";
import sessionsRoutes from "./routes/sessions.routes.js";
import providersRoutes from "./routes/providers.routes.js";
import referralRoutes from "./routes/referrals.routes.js";
import protectedRoutes from "./routes/protected.routes.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import helmet from "helmet";

dotenv.config({
path: process.env.NODE_ENV === "production"
? ".env.production": ".env"
});

const app = express();
app.set("trust proxy", 1);

/* ---------- GLOBAL MIDDLEWARE ---------- */
app.use(helmet());
app.use(cors());
app.use(express.json());

/* ---------- HEALTH CHECK ---------- */
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "octoshare-backend" });
});

/* ---------- API ROUTES ---------- */
app.use("/api/earnings", earningsRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/providers", providersRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api", apiLimiter);


/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`OctoShare backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed", error);
    process.exit(1);
  }
}

startServer();