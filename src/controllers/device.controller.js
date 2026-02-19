import prisma from "../config/prisma.js";

export async function registerDevice(req, res) {
  const { deviceId, platform, appVersion } = req.body;

  if (!deviceId) {
    return res.status(400).json({ error: "deviceId required" });
  }

  const device = await prisma.device.upsert({
    where: { deviceId },
    update: {
      lastSeenAt: new Date(),
      appVersion,
    },
    create: {
      deviceId,
      platform,
      appVersion,
      userId: req.user.id,
    },
  });

  res.json({ success: true, device });
}