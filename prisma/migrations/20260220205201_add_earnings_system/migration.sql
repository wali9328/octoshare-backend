/*
  Warnings:

  - You are about to alter the column `grossAmountUSD` on the `EarningsRecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `netAmountUSD` on the `EarningsRecord` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - Made the column `durationSec` on table `SharingSession` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EarningsRecord" ALTER COLUMN "grossAmountUSD" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "netAmountUSD" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "SharingSession" ALTER COLUMN "durationSec" SET NOT NULL;

-- CreateTable
CREATE TABLE "TrafficLog" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "bytes" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrafficLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyUsage" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalBytes" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "DailyUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Earnings" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "totalGB" DOUBLE PRECISION NOT NULL,
    "userShare" DOUBLE PRECISION NOT NULL,
    "platformShare" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Earnings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyUsage_userId_date_key" ON "DailyUsage"("userId", "date");

-- AddForeignKey
ALTER TABLE "TrafficLog" ADD CONSTRAINT "TrafficLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyUsage" ADD CONSTRAINT "DailyUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
