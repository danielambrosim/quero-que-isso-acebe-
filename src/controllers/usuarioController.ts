import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await prisma.usuario.findMany();
  res.json(usuarios);
};

export const createUsuario = async (req: Request, res: Response) => {
  const { nome, login, senha } = req.body;
  const novoUsuario = await prisma.usuario.create({
    data: { nome, login, senha },
  });
  res.json(novoUsuario);
};
