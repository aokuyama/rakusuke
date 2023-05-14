/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_token_digest_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_uuid_key" ON "user"("uuid");
