/*
  Warnings:

  - Added the required column `price` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `rating` DOUBLE NOT NULL;
