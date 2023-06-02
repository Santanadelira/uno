/*
  Warnings:

  - You are about to drop the column `solicitacaoDeAnaliseNumSA` on the `ItemDeAnalise` table. All the data in the column will be lost.
  - Added the required column `solicitacaoDeAnaliseId` to the `ItemDeAnalise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ItemDeAnalise" DROP CONSTRAINT "ItemDeAnalise_solicitacaoDeAnaliseNumSA_fkey";

-- AlterTable
ALTER TABLE "Ensaio" ALTER COLUMN "id" SET DEFAULT (concat('EN_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "ItemDeAnalise" DROP COLUMN "solicitacaoDeAnaliseNumSA",
ADD COLUMN     "solicitacaoDeAnaliseId" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT (concat('AM_', substring(gen_random_uuid()::text from 1 for 7)));

-- AlterTable
ALTER TABLE "SolicitacaoDeAnalise" ALTER COLUMN "id" SET DEFAULT (concat('SA_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "id" SET DEFAULT (concat('US_', substring(gen_random_uuid()::text from 1 for 5)));

-- AddForeignKey
ALTER TABLE "ItemDeAnalise" ADD CONSTRAINT "ItemDeAnalise_solicitacaoDeAnaliseId_fkey" FOREIGN KEY ("solicitacaoDeAnaliseId") REFERENCES "SolicitacaoDeAnalise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
