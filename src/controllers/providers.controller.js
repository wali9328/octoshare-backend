import prisma from "../config/prisma.js";

export async function listProviders(req, res) {
  const providers = await prisma.bandwidthProvider.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
    },
  });

  res.json(providers);
}