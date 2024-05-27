/*
  Warnings:

  - You are about to drop the column `address_id` on the `organizations` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_address_id_fkey";

-- DropIndex
DROP INDEX "organizations_address_id_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "address_id";

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_organization_id_key" ON "Address"("organization_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
