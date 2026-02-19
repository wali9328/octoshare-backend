/*
  Warnings:

  - You are about to alter the column `grossAmountUSD` on the `EarningsRecord` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `netAmountUSD` on the `EarningsRecord` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[userId,providerId,date]` on the table `EarningsRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EarningsRecord" ALTER COLUMN "grossAmountUSD" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "netAmountUSD" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "SharingSession" ALTER COLUMN "durationSec" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Device_userId_idx" ON "Device"("userId");

-- CreateIndex
CREATE INDEX "EarningsRecord_date_idx" ON "EarningsRecord"("date");

-- CreateIndex
CREATE UNIQUE INDEX "EarningsRecord_userId_providerId_date_key" ON "EarningsRecord"("userId", "providerId", "date");

-- CreateIndex
CREATE INDEX "SharingSession_userId_idx" ON "SharingSession"("userId");

-- CreateIndex
CREATE INDEX "SharingSession_providerId_idx" ON "SharingSession"("providerId");

-- CreateIndex
CREATE INDEX "SharingSession_startedAt_idx" ON "SharingSession"("startedAt");
