/*
  Warnings:

  - Added the required column `topMenuId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "topMenuId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_topMenuId_fkey" FOREIGN KEY ("topMenuId") REFERENCES "topMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
