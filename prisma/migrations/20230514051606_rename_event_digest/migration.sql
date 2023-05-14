/*
  Warnings:

  - You are about to drop the column `path` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path_digest]` on the table `event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `path_digest` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "event_path_key";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "path",
ADD COLUMN     "path_digest" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "event_path_digest_key" ON "event"("path_digest");
