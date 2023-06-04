import express from "express";
import { z } from "zod";
import { prisma } from "../../prisma/prisma";
import {
  Solicitante,
} from "../../entities/entities";

export const cadastrarSolicitante = async (
  req: express.Request,
  res: express.Response
) => {
  const reqBodySchema = z.object({
    cnpj: z
      .string()
      .nonempty("Campo obrigatório!")
      .length(14, "CNPJ deve conter 14 caractéres!"),
    nome: z.string().nonempty("Campo obrigatório!"),
    cep: z
      .string()
      .nonempty("Campo obrigatório!")
      .length(8, "CEP deve conter 8 caractéres!"),
    endereco: z.string().nonempty("Campo obrigatório!"),
    numero: z.string().nonempty("Campo obrigatório!"),
    cidade: z.string().nonempty("Campo obrigatório!"),
    estado: z.string().nonempty("Campo obrigatório!"),
    responsavel: z.string().nonempty("Campo obrigatório!"),
    telefone: z.string().nonempty("Campo obrigatório!"),
    email: z.string().nonempty("Campo obrigatório!").email("Email inválido!"),
  });

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  const solicitanteEmail = await prisma.solicitante.findUnique({
    where: { cnpj: body.data.cnpj },
  });

  if (solicitanteEmail) {
    return res.status(409).json({ error: "CNPJ já cadastrado!" });
  }

  await prisma.solicitante.create({
    data: {
      cnpj: body.data.cnpj,
      nome: body.data.nome,
      cep: body.data.cep,
      endereco: body.data.endereco,
      numero: body.data.numero,
      cidade: body.data.cidade,
      estado: body.data.estado,
      telefone: body.data.telefone,
      email: body.data.email,
      responsavel: body.data.responsavel,
    },
  });

  return res.status(201).json({ message: "Solicitante criado com sucesso!" });
};

export const listarSolicitantes = async (
  req: express.Request,
  res: express.Response
) => {
  const dadosSolicitantes = await prisma.solicitante.findMany({
    include: {
      solicitacoesDeAnalise: true,
    }
  });
  return res.status(200).json(dadosSolicitantes);
};

export const procurarSolicitante = async (
  req: express.Request,
  res: express.Response
) => {
  const paramsSchema = z.object({
    cnpj: z.string().length(14, "CNPJ deve conter 14 caractéres!"),
  });

  const params = paramsSchema.safeParse(req.params);

  if (!params.success) {
    return res.status(400).json({ error: params.error });
  }

  const solicitante = await prisma.solicitante.findUnique({
    where: { cnpj: params.data.cnpj },
  });

  if (!solicitante) {
    return res.status(404).json({ error: "Solicitante não encontrado!" });
  }

  return res.status(200).json({ solicitante });
};

export const editarContato = async (
  req: express.Request,
  res: express.Response
) => {
  const reqBodySchema = z.object({
    email: z.string().email("Email inválido!").nonempty("Campo obrigatório!"),
    telefone: z.string().nonempty("Campo obrigatório!"),
    responsavel: z.string().nonempty("Campo obrigatório!"),
  });

  const paramsSchema = z.object({
    cnpj: z.string().length(14, "CNPJ deve ter 14 caractéres!"),
  });

  const params = paramsSchema.safeParse(req.params);

  if (!params.success) {
    return res.status(400).json({ error: params.error });
  }

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  const solicitante = await prisma.solicitante.findUnique({
    where: { cnpj: params.data.cnpj },
  });

  if (!solicitante) {
    return res.status(404).json({ error: "Solicitante não encontrado!" });
  }

  const solicitanteAtualizado = await prisma.solicitante.update({
    where: { cnpj: params.data.cnpj },
    data: {
      telefone: body.data.telefone,
      email: body.data.email,
      responsavel: body.data.responsavel,
    },
  });

  return res.status(200).json({ solicitanteAtualizado });
};
