import express from "express";
import { Cargo } from "../../entities/enums";
import { z } from "zod";
import { prisma } from "../../prisma/prisma";
import { Cargos } from "@prisma/client";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import { Usuario } from "../../entities/entities";

dotenv.config();

export const cadastrarUsuario = async (
  req: express.Request,
  res: express.Response
) => {
  const valores = Object.values(Cargo);
  const reqBodySchema = z
    .object({
      nome: z.string().nonempty("Campo nome é obrigatório!"),
      cargo: z.string().nonempty("Campo cargo é obrigatório!"),
      email: z
        .string()
        .nonempty("Campo email é obrigatório")
        .email("Email inválido!"),
      senha: z
        .string()
        .nonempty("Campo senha é obrigatório!")
        .min(8, "Senha deve conter no mínimo 8 caractéres"),
      confirmarSenha: z
        .string()
        .nonempty("Campo confirmar senha é obrigatório!"),
    })
    .refine((data) => data.senha === data.confirmarSenha, {
      message: "Senhas não são iguais!",
      path: ["confirmarSenha"],
    })
    .refine((data) => valores.includes(data.cargo), {
      message: "Cargo inválido!",
      path: ["cargo"],
    });

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  const usuario = await prisma.usuario.findUnique({
    where: {
      email: body.data.email,
    },
  });

  if (usuario) {
    return res.status(409).json({ error: "Email já cadastrado!" });
  }

  await prisma.usuario.create({
    data: {
      nome: body.data.nome,
      cargo: body.data.cargo as Cargos,
      email: body.data.email,
      senha: bcrypt.hashSync(body.data.senha, 10),
    },
  });

  return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
};

export const logar = async (req: express.Request, res: express.Response) => {
  const reqBodySchema = z.object({
    email: z
      .string()
      .nonempty("Campo email é obrigatório!")
      .email("Email inválido!"),
    senha: z.string().nonempty("Campo senha é obrigatório!"),
  });

  const body = reqBodySchema.safeParse(req.body);

  if (!body.success) {
    return res.status(400).json({ error: body.error });
  }

  const usuario = await prisma.usuario.findUnique({
    where: { email: body.data.email },
  });

  if (!usuario) {
    return res.status(404).json({ error: "Email não cadastrado!" });
  }

  if (!bcrypt.compareSync(body.data.senha, usuario.senha)) {
    return res.status(401).json({ error: "Senha incorreta!" });
  }

  const token = jsonwebtoken.sign(
    {
      id: usuario.id,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "8h",
    }
  );

  const horarioAtual = new Date();

  const expiracaoToken = new Date(horarioAtual.getTime() + 8 * 60 * 60 * 1000);

  const usuarioInfo = new Usuario(
    usuario.id,
    usuario.nome,
    usuario.email,
    null,
    usuario.cargo
  );

  return res
    .status(200)
    .json({ userToken: token, userInfo: usuarioInfo, expiracaoToken });
};

export const listarUsuarios = async (
  req: express.Request,
  res: express.Response
) => {
  const dadosUsuario = await prisma.usuario.findMany();
  const usuarios = dadosUsuario.map(
    (usuario) =>
      new Usuario(usuario.id, usuario.nome, usuario.email, null, usuario.cargo)
  );
  return res.status(200).json(usuarios);
};

export const procurarUsuario = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.params;

  const dadosUsuario = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!dadosUsuario)
    return res.status(404).json({ error: "Email não cadastrado!" });

  const usuario = new Usuario(
    dadosUsuario.id,
    dadosUsuario.nome,
    dadosUsuario.email,
    null,
    dadosUsuario.cargo
  );

  return res.status(200).json(usuario);
};

export const excluirUsuarios = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.params;

  try {
    await prisma.usuario.delete({
      where: { email },
    });

    return res.status(200).json("Usuário deletado com sucesso!");
  } catch (error) {
    return res.status(400).json("Erro ao deletar usuário!");
  }
};
