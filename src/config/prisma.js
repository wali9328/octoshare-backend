import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be first

import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is not defined. Check your .env file.");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;