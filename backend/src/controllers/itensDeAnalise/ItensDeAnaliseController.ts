import express from "express";
import { z } from "zod";
import { prisma } from "../../prisma/prisma";

export const cadastrarItensDeAnalise = async (
  req: express.Request,
  res: express.Response
) => {
  const reqBodySchema = z.object({
    quantidade: z.number(),
    unidade: z.string().nonempty("Campo obrigatório!"),
    tipoMaterial: z.string().nonempty("Campo obrigatório!"),
    lote: z.string().nonempty("Campo obrigatório!"),
    notaFiscal: z.string().nonempty("Campo obrigatório!"),
    condicao: z.string().nonempty("Campo obrigatório!"),
    observacao: z.string().nullable(),
    solicitacaoDeAnaliseId: z.string().nonempty("Campo obrigatório!"),
  });

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  await prisma.itemDeAnalise.create({
    data: {
      quantidadeRecebida: body.data.quantidade,
      quantidadeDisponivel: body.data.quantidade,
      unidade: body.data.unidade,
      tipoMaterial: body.data.tipoMaterial,
      lote: body.data.lote,
      notaFiscal: body.data.notaFiscal,
      condicao: body.data.condicao,
      observacao: body.data.observacao,
      solicitacaoDeAnalise: {
        connect: {
          id: body.data.solicitacaoDeAnaliseId,
        }
      }
    },
  });

  await prisma.solicitacaoDeAnalise.update({
    where: {
      id: body.data.solicitacaoDeAnaliseId,
    },
    data: {
      entradaDosMateriais: new Date(),
    }
  });

  return res.status(201).json({ message: "Item de análise criado!" });
};

export const listarItensDeAnalise = async (
  req: express.Request,
  res: express.Response
) => {
  const dadosItensDeAnalise = await prisma.itemDeAnalise.findMany({
    include: {
      solicitacaoDeAnalise: true,
      Ensaio: true,
    },
    orderBy: {
      tipoMaterial: "asc",
    },
  });
  return res.status(200).json(dadosItensDeAnalise);
};

export const listarItensDeAnalisePorSolicitacao = async (
    req: express.Request,
    res: express.Response
    ) => {
    const { id } = req.params;
    
    const solicitacaoDeAnalise = await prisma.solicitacaoDeAnalise.findUnique({
        where: {
            id: id
        }
    });

    const dadosItensDeAnalise = await prisma.itemDeAnalise.findMany({
        where: {
            solicitacaoDeAnaliseId: id
        }
    });

    return res.status(200).json(dadosItensDeAnalise);
};

export const procurarItemDeAnalise = async (
    req: express.Request,
    res: express.Response
    ) => {
    const { id } = req.params;

    const itemDeAnalise = await prisma.itemDeAnalise.findUnique({
        where: {
            id: id
        }
    });

    return res.status(200).json(itemDeAnalise);
};





