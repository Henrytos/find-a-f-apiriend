/*
  Warnings:

  - You are about to drop the column `environment` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roadway` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_environment` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `size` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level_independence` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORG');

-- CreateEnum
CREATE TYPE "PET_AGE" AS ENUM ('FILHOTE', 'ADULTO', 'IDOSO');

-- CreateEnum
CREATE TYPE "PET_SIZE" AS ENUM ('PEQUENO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "PET_LEVEL_INDEPENDENCE" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "PET_LEVEL_ENVIRONMENT" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_organization_id_fkey";

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "roadway" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ORG',
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "environment",
ADD COLUMN     "level_environment" "PET_LEVEL_ENVIRONMENT" NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" "PET_AGE" NOT NULL,
DROP COLUMN "size",
ADD COLUMN     "size" "PET_SIZE" NOT NULL,
DROP COLUMN "level_independence",
ADD COLUMN     "level_independence" "PET_LEVEL_INDEPENDENCE" NOT NULL;

-- DropTable
DROP TABLE "Address";
