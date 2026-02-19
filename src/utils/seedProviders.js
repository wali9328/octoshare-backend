import dotenv from "dotenv";
dotenv.config();

import prisma from "../config/prisma.js";

async function seed() {
  const providers = [
    { name: "Pawns" },
    { name: "FutureProvider1" }
  ];

  for (const provider of providers) {
    await prisma.bandwidthProvider.upsert({
      where: { name: provider.name },
      update: {},
      create: provider,
    });
  }

  console.log("✅ Bandwidth providers seeded");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
