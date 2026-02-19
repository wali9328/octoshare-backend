import prisma from "../config/prisma.js";

export async function startSession(req, res) {
  const userId = req.user.id;
  const { providerId } = req.body;

  if (!providerId) {
    return res.status(400).json({ error: "providerId is required" });
  }

  const provider = await prisma.bandwidthProvider.findUnique({
    where: { id: providerId },
  });

  if (!provider) {
    return res.status(400).json({ error: "Invalid providerId" });
  }

  const session = await prisma.sharingSession.create({
    data: {
      userId,
      providerId,
      startedAt: new Date(),
      durationSec: 0,
      dataSharedMB: 0,
    },
  });

  res.json({ sessionId: session.id });
}

export async function endSession(req, res) {
  const { sessionId, durationSec, dataSharedMB } = req.body;

  await prisma.sharingSession.update({
    where: { id: sessionId },
    data: {
      endedAt: new Date(),
      durationSec,
      dataSharedMB,
    },
  });

  res.json({ success: true });
}