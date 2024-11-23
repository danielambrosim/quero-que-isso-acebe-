import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Recupera todas as transações
export const getTransacoes = async (req: Request, res: Response) => {
  try {
    const transacoes = await prisma.transacao.findMany();
    res.json(transacoes);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar transações',
      error: (error as Error).message,
    });
  }
};

// Cria uma nova transação
export const createTransacao = async (req: Request, res: Response) => {
  try {
    const {
      idCarteiraOrigem,
      idCarteiraDestino,
      idCriptoativo,
      quantidade,
      tipo,
      data,
    } = req.body;

    // Validação básica dos campos obrigatórios
    if (!idCarteiraOrigem || !idCarteiraDestino || !idCriptoativo || !quantidade || !tipo || !data) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Validação de quantidade como número positivo
    const quantidadeNum = parseFloat(quantidade);
    if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
      return res.status(400).json({ message: 'A quantidade deve ser um número válido e positivo.' });
    }

    // Validação de data
    const dataDate = new Date(data);
    if (isNaN(dataDate.getTime())) {
      return res.status(400).json({ message: 'Data fornecida é inválida.' });
    }

    const transacao = await prisma.transacao.create({
      data: {
        id_carteira_origem: idCarteiraOrigem,
        id_carteira_destino: idCarteiraDestino,
        id_criptoativo: idCriptoativo,
        quatidade: quantidadeNum, // Corrigido o campo
        tipo,
        data: dataDate,
      },
    });
    res.status(201).json(transacao);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao criar transação',
      error: (error as Error).message,
    });
  }
};

// Atualiza uma transação existente
export const updateTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantidade, tipo, data } = req.body;

    if (!quantidade && !tipo && !data) {
      return res.status(400).json({ message: 'Nada para atualizar.' });
    }

    const dataUpdate: any = {};

    if (quantidade) {
      const quantidadeNum = parseFloat(quantidade);
      if (isNaN(quantidadeNum) || quantidadeNum <= 0) {
        return res.status(400).json({ message: 'A quantidade deve ser um número válido e positivo.' });
      }
      dataUpdate.quantidade = quantidadeNum;
    }

    if (tipo) {
      dataUpdate.tipo = tipo;
    }

    if (data) {
      const dataDate = new Date(data);
      if (isNaN(dataDate.getTime())) {
        return res.status(400).json({ message: 'Data fornecida é inválida.' });
      }
      dataUpdate.data = dataDate;
    }

    const transacao = await prisma.transacao.update({
      where: { id: parseInt(id) },
      data: dataUpdate,
    });
    res.json(transacao);
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao atualizar transação',
      error: (error as Error).message,
    });
  }
};

// Deleta uma transação
export const deleteTransacao = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'ID é obrigatório.' });
    }

    await prisma.transacao.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Transação deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({
      message: 'Erro ao deletar transação',
      error: (error as Error).message,
    });
  }
};
