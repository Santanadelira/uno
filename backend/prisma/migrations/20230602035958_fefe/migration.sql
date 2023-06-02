-- AlterTable
ALTER TABLE "Ensaio" ALTER COLUMN "id" SET DEFAULT (concat('EN_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "ItemDeAnalise" ALTER COLUMN "id" SET DEFAULT (concat('AM_', substring(gen_random_uuid()::text from 1 for 7)));

-- AlterTable
ALTER TABLE "SolicitacaoDeAnalise" ALTER COLUMN "id" SET DEFAULT (concat('SA_', substring(gen_random_uuid()::text from 1 for 5)));

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "id" SET DEFAULT (concat('US_', substring(gen_random_uuid()::text from 1 for 5)));
