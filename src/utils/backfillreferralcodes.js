import prisma from "../config/prisma.js";
import crypto from "crypto";

async function run() {
  const users = await prisma.user.findMany({
    where: { referralCode: null },
  });

  for (const user of users) {
    const code = crypto.randomBytes(4).toString("hex"); // 8 chars

    await prisma.user.update({
      where: { id: user.id },
      data: { referralCode: code },
    });
  }

  console.log("✅ Referral codes backfilled");
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());