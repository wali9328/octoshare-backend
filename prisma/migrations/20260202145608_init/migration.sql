/*
  Warnings:

  - You are about to drop the column `deviceName` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `lastSeen` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `grossAmount` on the `Earning` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Earning` table. All the data in the column will be lost.
  - You are about to drop the column `netAmount` on the `Earning` table. All the data in the column will be lost.
  - You are about to drop the column `platformFee` on the `Earning` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `DeviceProvider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayoutExport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UptimeLog` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[deviceId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appVersion` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceId` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amountUsd` to the `Earning` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uptimeMin` to the `Earning` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DeviceProvider" DROP CONSTRAINT "DeviceProvider_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "DeviceProvider" DROP CONSTRAINT "DeviceProvider_providerId_fkey";

-- DropForeignKey
ALTER TABLE "UptimeLog" DROP CONSTRAINT "UptimeLog_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "UptimeLog" DROP CONSTRAINT "UptimeLog_providerId_fkey";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "deviceName",
DROP COLUMN "isOnline",
DROP COLUMN "lastSeen",
ADD COLUMN     "appVersion" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deviceId" TEXT NOT NULL,
ADD COLUMN     "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Earning" DROP COLUMN "grossAmount",
DROP COLUMN "isPaid",
DROP COLUMN "netAmount",
DROP COLUMN "platformFee",
ADD COLUMN     "amountUsd" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "uptimeMin" INTEGER NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullName",
DROP COLUMN "isActive";

-- DropTable
DROP TABLE "DeviceProvider";

-- DropTable
DROP TABLE "PayoutExport";

-- DropTable
DROP TABLE "UptimeLog";

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceId_key" ON "Device"("deviceId");

-- CreateIndex
CREATE INDEX "Earning_userId_providerId_idx" ON "Earning"("userId", "providerId");
