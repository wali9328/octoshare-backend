/*
  Warnings:

  - You are about to drop the `Earning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Earning" DROP CONSTRAINT "Earning_providerId_fkey";

-- DropForeignKey
ALTER TABLE "Earning" DROP CONSTRAINT "Earning_userId_fkey";

-- DropTable
DROP TABLE "Earning";

-- DropTable
DROP TABLE "Provider";

-- CreateTable
CREATE TABLE "BandwidthProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BandwidthProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SharingSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "durationSec" INTEGER NOT NULL,
    "dataSharedMB" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SharingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarningsRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "grossAmountUSD" DOUBLE PRECISION NOT NULL,
    "netAmountUSD" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "EarningsRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BandwidthProvider_name_key" ON "BandwidthProvider"("name");

-- AddForeignKey
ALTER TABLE "SharingSession" ADD CONSTRAINT "SharingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharingSession" ADD CONSTRAINT "SharingSession_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "BandwidthProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningsRecord" ADD CONSTRAINT "EarningsRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EarningsRecord" ADD CONSTRAINT "EarningsRecord_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "BandwidthProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
