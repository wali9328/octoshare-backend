import prisma from "../config/prisma.js";
import { calculateAndStoreEarnings } from "./earnings.service.js";

export async function endSharingSession(sessionId, dataSharedMB) {
  const session = await prisma.sharingSession.update({
    where: { id: sessionId },
    data: {
      endedAt: new Date(),
      dataSharedMB,
    },
    include: {
      provider: true,
    },
  });

  await calculateAndStoreEarnings({
    userId: session.userId,
    providerId: session.providerId,
    providerName: session.provider.name,
    dataSharedMB,
    sessionDate: session.startedAt,
  });

  return session;
}