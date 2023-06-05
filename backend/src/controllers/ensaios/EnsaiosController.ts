import express from "express";
import { prisma } from "../../prisma/prisma";
import { z } from "zod";
import { Ensaios, StatusEnsaio } from "@prisma/client";

export const cadastrarEnsaios = async (
  req: express.Request,
  res: express.Response
) => {
  const reqBodySchema = z.object({
    nomeEnsaio: z.string().nonempty("Campo obrigatório!"),
    especificacao: z.string().nonempty("Campo obrigatório!"),
    itemDeAnaliseId: z.string().nonempty("Campo obrigatório!"),
  });

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  const itemDeAnalise = await prisma.itemDeAnalise.findUnique({
    where: {
      id: body.data.itemDeAnaliseId,
    },
  });

  if (itemDeAnalise?.quantidadeDisponivel === 0) {
    return res
      .status(400)
      .json({ error: "Não há material disponível para realizar o ensaio!" });
  } else {
    await prisma.ensaio.create({
      data: {
        nomeEnsaio: body.data.nomeEnsaio as Ensaios,
        especificacao: body.data.especificacao,
        itemDeAnalise: {
          connect: {
            id: body.data.itemDeAnaliseId,
          },
        },
      },
    });

    await prisma.itemDeAnalise.update({
      where: {
        id: body.data.itemDeAnaliseId,
      },
      data: {
        quantidadeDisponivel: {
          decrement: 1,
        },
      },
    });
  }

  return res.status(201).json({ message: "Ensaio criado!" });
};

export const listarEnsaiosPorItemDeAnalise = async (
  req: express.Request,
  res: express.Response
) => {
  const paramsSchema = z.object({
    id: z.string().nonempty("Campo obrigatório!"),
  });

  const params = paramsSchema.safeParse(req.params);

  if (!params.success) {
    return res.status(400).json({ error: params.error });
  }

  const dadosEnsaios = await prisma.ensaio.findMany({
    where: { itemDeAnaliseId: params.data.id },
  });

  return res.status(200).json(dadosEnsaios);
};

export const resultadoEnsaio = async (
  req: express.Request,
  res: express.Response
) => {
  const paramsSchema = z.object({
    id: z.string().nonempty("Campo obrigatório!"),
  });

  const params = paramsSchema.safeParse(req.params);

  if (!params.success) {
    return res.status(400).json({ error: params.error });
  }

  const reqBodySchema = z.object({
    resultado: z.string().nonempty("Campo obrigatório!"),
  });

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  const ensaio = await prisma.ensaio.findUnique({
    where: {
      id: params.data.id,
    },
  });

  await prisma.ensaio.update({
    where: {
      id: params.data.id,
    },
    data: {
      resultado: body.data.resultado,
      statusEnsaio: "Concluído" as StatusEnsaio,
      dataDeAnalise: new Date(),
    },
  });

  await prisma.itemDeAnalise.update({
    where: {
      id: ensaio?.itemDeAnaliseId,
    },
    data: {
      quantidadeDisponivel: {
        decrement: 1,
      },
    },
  });

  return res.status(200).json({ message: "Resultado do ensaio atualizado!" });
};
