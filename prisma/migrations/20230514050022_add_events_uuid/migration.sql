/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "event_uuid_key" ON "event"("uuid");
