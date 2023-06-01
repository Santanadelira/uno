-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('ADMIN', 'ANALISTA', 'VENDEDOR', 'EXPEDICAO');

-- CreateEnum
CREATE TYPE "TipoDeAnalise" AS ENUM ('Desenvolvimento', 'Degradacao_Forcada', 'Validacao', 'Controle', 'Solubilidade', 'Estabilidade', 'Perfil_de_Dissolucao', 'Solventes_Residuais', 'Sumario_de_Validacao');

-- CreateEnum
CREATE TYPE "Ensaios" AS ENUM ('Desintegracao', 'Dissolucao', 'pH', 'Dureza', 'Friabilidade', 'Umidade', 'Viscosidade', 'Solubilidade', 'Teor_do_Ativo', 'Teor_de_Impurezas', 'Particulas_Visiveis', 'Peso_Medio', 'Karl_Fischer');

-- CreateEnum
CREATE TYPE "ModoDeEnvioResultado" AS ENUM ('VIRTUAL', 'VALER', 'CLIENTE', 'CORREIOS');

-- CreateEnum
CREATE TYPE "StatusEnsaio" AS ENUM ('Pendente', 'EmAnalise', 'Concluida');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL DEFAULT (concat('US_', substring(gen_random_uuid()::text from 1 for 5))),
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" "Cargo" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitante" (
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Solicitante_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "SolicitacaoDeAnalise" (
    "id" TEXT NOT NULL DEFAULT (concat('SA_', substring(gen_random_uuid()::text from 1 for 5))),
    "nomeProjeto" TEXT NOT NULL,
    "aberturaSA" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inicioDoProjeto" TIMESTAMP(3),
    "entradaDosMateriais" TIMESTAMP(3),
    "conclusaoDoProjeto" TIMESTAMP(3),
    "prazoAcordado" TIMESTAMP(3) NOT NULL,
    "tipoDeAnalise" "TipoDeAnalise" NOT NULL,
    "descricaoDosServicos" TEXT NOT NULL,
    "ensaios" "Ensaios"[],
    "informacoesAdicionais" TEXT,
    "modoEnvioResultado" "ModoDeEnvioResultado" NOT NULL,
    "responsavelPeloEnvio" TEXT NOT NULL,
    "dataEnvioResultados" TIMESTAMP(3),
    "responsavelAbertura" TEXT NOT NULL,
    "solicitanteCnpj" TEXT,

    CONSTRAINT "SolicitacaoDeAnalise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemDeAnalise" (
    "id" TEXT NOT NULL DEFAULT (concat('AM_', substring(gen_random_uuid()::text from 1 for 7))),
    "quantidade" INTEGER NOT NULL,
    "unidade" TEXT NOT NULL,
    "tipoMaterial" TEXT NOT NULL,
    "lote" TEXT,
    "notaFiscal" TEXT,
    "condicao" TEXT,
    "observacao" TEXT,
    "solicitacaoDeAnaliseNumSA" TEXT,

    CONSTRAINT "ItemDeAnalise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ensaio" (
    "id" TEXT NOT NULL DEFAULT (concat('EN_', substring(gen_random_uuid()::text from 1 for 5))),
    "nomeEnsaio" "Ensaios" NOT NULL,
    "especificacao" TEXT NOT NULL,
    "dataDeAnalise" TIMESTAMP(3),
    "statusEnsaio" "StatusEnsaio" NOT NULL,
    "resultado" TEXT,
    "itemDeAnaliseId" TEXT NOT NULL,

    CONSTRAINT "Ensaio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "SolicitacaoDeAnalise" ADD CONSTRAINT "SolicitacaoDeAnalise_solicitanteCnpj_fkey" FOREIGN KEY ("solicitanteCnpj") REFERENCES "Solicitante"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemDeAnalise" ADD CONSTRAINT "ItemDeAnalise_solicitacaoDeAnaliseNumSA_fkey" FOREIGN KEY ("solicitacaoDeAnaliseNumSA") REFERENCES "SolicitacaoDeAnalise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ensaio" ADD CONSTRAINT "Ensaio_itemDeAnaliseId_fkey" FOREIGN KEY ("itemDeAnaliseId") REFERENCES "ItemDeAnalise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
