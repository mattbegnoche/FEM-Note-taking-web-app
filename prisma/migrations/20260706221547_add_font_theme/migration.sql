-- CreateEnum
CREATE TYPE "FontTheme" AS ENUM ('SANS', 'SERIF', 'MONO');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fontTheme" "FontTheme" NOT NULL DEFAULT 'SANS';
