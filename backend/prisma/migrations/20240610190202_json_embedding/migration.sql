/*
  Warnings:

  - You are about to alter the column `embedding` on the `Embedding` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `Embedding` MODIFY `embedding` JSON NOT NULL;
