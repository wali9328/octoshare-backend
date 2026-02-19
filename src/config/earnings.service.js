import prisma from "../config/prisma.js";
import { PROVIDER_RATES } from "../config/providerRates.js";

export async function calculateAndStoreEarnings({
  userId,
  providerId,
  providerName,
  dataSharedMB,
  sessionDate,
}) {
  const rate = PROVIDER_RATES[providerName.toLowerCase()];

  if (!rate) {
    throw new Error(`No rate configured for provider ${providerName}`);
  }

  const dataSharedGB = dataSharedMB / 1024;

  const grossAmountUSD = dataSharedGB * rate.usdPerGB;
  const netAmountUSD =
    grossAmountUSD * (1 - rate.platformFeePercent / 100);

  const date = new Date(sessionDate);
  date.setUTCHours(0, 0, 0, 0);

  return prisma.earningsRecord.upsert({
    where: {
      userId_providerId_date: {
        userId,
        providerId,
        date,
      },
    },
    update: {
      grossAmountUSD: { increment: grossAmountUSD },
      netAmountUSD: { increment: netAmountUSD },
    },
    create: {
      userId,
      providerId,
      date,
      grossAmountUSD,
      netAmountUSD,
    },
  });
}