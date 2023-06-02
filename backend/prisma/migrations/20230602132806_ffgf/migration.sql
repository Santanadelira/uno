/*
  Warnings:

  - You are about to drop the column `quantidade` on the `ItemDeAnalise` table. All the data in the column will be lost.
  - Added the required column `quantidadeDisponivel` to the `ItemDeAnalise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidadeRecebida` to the `ItemDeAnalise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ensaio" ALTER COLUMN "id" SET DEFAULT (concat('EN_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "ItemDeAnalise" DROP COLUMN "quantidade",
ADD COLUMN     "quantidadeDisponivel" INTEGER NOT NULL,
ADD COLUMN     "quantidadeRecebida" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT (concat('AM_', substring(gen_random_uuid()::text from 1 for 7)));

-- AlterTable
ALTER TABLE "SolicitacaoDeAnalise" ALTER COLUMN "id" SET DEFAULT (concat('SA_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "id" SET DEFAULT (concat('US_', substring(gen_random_uuid()::text from 1 for 5)));
