// src/utils/createDevUser.js
import prisma from "../config/prisma.js";

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "dev@octoshare.app" },
    update: {},
    create: {
      email: "dev@octoshare.app",
      passwordHash: "dev",
    },
  });

  console.log("DEV USER ID:", user.id);
}

main();