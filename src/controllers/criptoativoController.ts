import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getCriptoativos = async (req: Request, res: Response) => {
  const criptoativos = await prisma.criptoativo.findMany();
  res.json(criptoativos);
};

export const createCriptoativo = async (req: Request, res: Response) => {
  const { nome, codigo, preco } = req.body;
  const criptoativo = await prisma.criptoativo.create({
    data: { nome, codigo, preco },
  });
  res.json(criptoativo);
};

export const updateCriptoativo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, codigo, preco } = req.body;
  const criptoativo = await prisma.criptoativo.update({
    where: { id: parseInt(id) },
    data: { nome, codigo, preco },
  });
  res.json(criptoativo);
};

export const deleteCriptoativo = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.criptoativo.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Criptoativo deletado com sucesso!' });
};
