import express from "express";
import { z } from "zod";
import { prisma } from "../../prisma/prisma";
import { ModoDeEnvioResultado, TipoDeAnalise } from "@prisma/client";
import { SolicitacaoDeAnalise } from "../../entities/entities";

export const cadastrarSolicitacaoDeAnalise = async (
  req: express.Request,
  res: express.Response
) => {
  const reqBodySchema = z.object({
    nomeProjeto: z
      .string()
      .min(3, "Nome do projeto deve conter no mínimo 3 caractéres!"),
    prazoAcordado: z
      .string(),
    tipoDeAnalise: z
      .string()
      .min(3, "Tipo de análise deve conter no mínimo 3 caractéres!"),
    descricaoDosServicos: z
      .string()
      .min(3, "Descrição dos serviços deve conter no mínimo 3 caractéres!"),
    informacoesAdicionais: z
      .string()
      .min(3, "Informações adicionais deve conter no mínimo 3 caractéres!")
      .nullable(),
    modoEnvioResultado: z
      .string()
      .min(3, "Modo de envio do resultado deve conter no mínimo 3 caractéres!"),
    solicitante: z.string().length(14, "CNPJ deve conter 14 caractéres!"),
    responsavelAbertura: z
      .string()
      .min(3, "Responsável pela abertura deve conter no mínimo 3 caractéres!"),
  });

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  const {
    nomeProjeto,
    prazoAcordado,
    tipoDeAnalise,
    descricaoDosServicos,
    informacoesAdicionais,
    modoEnvioResultado,
    solicitante,
    responsavelAbertura,
  } = body.data;

  await prisma.solicitacaoDeAnalise.create({
    data: {
      nomeProjeto,
      prazoAcordado: new Date(prazoAcordado),
      tipoDeAnalise: tipoDeAnalise as TipoDeAnalise,
      descricaoDosServicos,
      informacoesAdicionais,
      modoEnvioResultado: modoEnvioResultado as ModoDeEnvioResultado,
      responsavelAbertura,
      Solicitante: {
        connect: {
          cnpj: solicitante,
        },
      },
    },
  });

  return res.status(201).json({ message: "Solicitação de análise criada!" });
};

export const listarSolicitacoesDeAnalise = async (
  req: express.Request,
  res: express.Response
) => {
  const solicitacoesDeAnaliseDados = await prisma.solicitacaoDeAnalise.findMany(
    {}
  );
  return res.status(200).json(solicitacoesDeAnaliseDados);
};

export const procurarSolicitacaoDeAnalise = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const solicitacaoDeAnalise = await prisma.solicitacaoDeAnalise.findUnique({
    where: { id },
  });

  if (!solicitacaoDeAnalise) {
    return res
      .status(404)
      .json({ error: "Solicitação de Análise não encontrada!" });
  }

  return res.status(200).json({ solicitacaoDeAnalise });
};

export const inicioDoProjeto = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  try {
    await prisma.solicitacaoDeAnalise.update({
      where: { id },
      data: { inicioDoProjeto: new Date() },
    });

    return res.status(200).json({ message: "Projeto iniciado!" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const conclusaoDoProjeto = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  try {
    await prisma.solicitacaoDeAnalise.update({
      where: { id },
      data: { conclusaoDoProjeto: new Date() },
    });

    return res.status(200).json({ message: "Projeto concluído!" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const envioResultados = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  const { responsavelPeloEnvio } = req.body;

  try {
    await prisma.solicitacaoDeAnalise.update({
      where: { id },
      data: { dataEnvioResultados: new Date(), responsavelPeloEnvio },
    });

    return res.status(200).json({ message: "Resultados enviados!" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

export const informacoesAdicionais = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { informacoesAdicionais } = req.body;

  try {
    await prisma.solicitacaoDeAnalise.update({
      where: { id },
      data: { informacoesAdicionais },
    });

    return res
      .status(200)
      .json({ message: "Informações adicionais atualizadas!" });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
