/*
  Warnings:

  - Changed the type of `cargo` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Cargos" AS ENUM ('ADMIN', 'ANALISTA', 'VENDEDOR', 'EXPEDICAO');

-- AlterTable
ALTER TABLE "Ensaio" ALTER COLUMN "id" SET DEFAULT (concat('EN_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "ItemDeAnalise" ALTER COLUMN "id" SET DEFAULT (concat('AM_', substring(gen_random_uuid()::text from 1 for 7)));

-- AlterTable
ALTER TABLE "SolicitacaoDeAnalise" ALTER COLUMN "id" SET DEFAULT (concat('SA_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "id" SET DEFAULT (concat('US_', substring(gen_random_uuid()::text from 1 for 5))),
DROP COLUMN "cargo",
ADD COLUMN     "cargo" "Cargos" NOT NULL;

-- DropEnum
DROP TYPE "Cargo";
