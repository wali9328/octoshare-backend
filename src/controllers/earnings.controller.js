import prisma from "../config/prisma.js";

/**
 * Record user earnings and referral earnings
 */
export async function recordEarnings(req, res) {
  try {
    const userId = req.user.id;
    const { providerId, amountUSD } = req.body;

    if (!providerId || !amountUSD) {
      return res.status(400).json({ error: "providerId and amountUSD are required" });
    }

    // ✅ Fetch user ONCE
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Record main earnings
    await prisma.earningsRecord.create({
      data: {
        userId,
        providerId,
        date: new Date(),
        grossAmountUSD: amountUSD,
        netAmountUSD: amountUSD,
      },
    });

    // ✅ Referral logic (10%)
    if (user.referredById) {
      const referralAmount = amountUSD * 0.1;

      await prisma.referralEarning.create({
        data: {
          referrerId: user.referredById,
          referredUserId: userId,
          providerId,
          amountUSD: referralAmount,
          date: new Date(),
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("RECORD EARNINGS ERROR:", error);
    res.status(500).json({ error: "Failed to record earnings" });
  }
}

/**
 * Get earnings summary for logged-in user
 */
export async function getEarningsSummary(req, res) {
  try {
    const userId = req.user.id;

    // User earnings
    const earnings = await prisma.earningsRecord.aggregate({
      where: { userId },
      _sum: {
        grossAmountUSD: true,
        netAmountUSD: true,
      },
    });

    // Referral earnings
    const referralEarnings = await prisma.referralEarning.aggregate({
      where: { referrerId: userId },
      _sum: {
        amountUSD: true,
      },
    });

    res.json({
      totalGrossUSD: earnings._sum.grossAmountUSD || 0,
      totalNetUSD: earnings._sum.netAmountUSD || 0,
      referralUSD: referralEarnings._sum.amountUSD || 0,
    });
  } catch (error) {
    console.error("GET EARNINGS SUMMARY ERROR:", error);
    res.status(500).json({ error: "Failed to fetch earnings summary" });
  }
}