import prisma from "../config/prisma.js";

async function test() {
  console.log(Object.keys(prisma));
  await prisma.$disconnect();
}

test();