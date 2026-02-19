import prisma from "../config/prisma.js";

export async function getReferralDashboard(req, res) {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      referrals: {
        include: {
          devices: true,
          sessions: true,
        },
      },
      referralEarnings: true,
    },
  });

  res.json({
    referralCode: user.referralCode,
    referrals: user.referrals.map((r) => ({
      email: r.email,
      online: r.devices.some((d) => d.isOnline),
      sharedGB:
        r.sessions.reduce((sum, s) => sum + s.dataSharedMB, 0) / 1024,
    })),
    totalReferralEarnings: user.referralEarnings.reduce(
      (sum, e) => sum + e.amountUSD,
      0
    ),
  });
}