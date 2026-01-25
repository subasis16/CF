/*
  Warnings:

  - You are about to drop the `lesson` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `lesson` DROP FOREIGN KEY `Lesson_courseId_fkey`;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `videoUrl` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `lesson`;
