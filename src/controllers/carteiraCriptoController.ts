import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Recupera todas as carteiras de criptoativos
export const getCarteiraCriptos = async (req: Request, res: Response) => {
  try {
    const carteiraCriptos = await prisma.carteira_cripto.findMany();
    res.json(carteiraCriptos);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao buscar carteiras de criptoativos', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao buscar carteiras de criptoativos' });
    }
  }
};

// Cria uma nova carteira de criptoativo
export const createCarteiraCripto = async (req: Request, res: Response) => {
  try {
    const { id_carteira, id_criptoativo, quantidade } = req.body;

    // Validação básica dos campos obrigatórios
    if (!id_carteira || !id_criptoativo || !quantidade) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se quantidade é um número
    if (isNaN(quantidade)) {
      return res.status(400).json({ message: 'A quantidade precisa ser um número.' });
    }

    // Cria a carteira de criptoativo
    const carteiraCripto = await prisma.carteira_cripto.create({
      data: { id_carteira, id_criptoativo, quantidade: parseFloat(quantidade) },
    });
    res.status(201).json(carteiraCripto);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao criar carteira de criptoativo', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao criar carteira de criptoativo' });
    }
  }
};

// Atualiza a quantidade de criptoativos em uma carteira
export const updateCarteiraCripto = async (req: Request, res: Response) => {
  try {
    const { id_carteira, id_criptoativo } = req.params;
    const { quantidade } = req.body;

    // Validação básica de dados
    if (!quantidade) {
      return res.status(400).json({ message: 'A quantidade é obrigatória para atualização.' });
    }

    // Verifica se quantidade é um número
    if (isNaN(quantidade)) {
      return res.status(400).json({ message: 'A quantidade precisa ser um número válido.' });
    }

    // Atualiza a quantidade de criptoativos na carteira
    const carteiraCripto = await prisma.carteira_cripto.update({
      where: {
        id_carteira: parseInt(id_carteira),  // Usando id_carteira diretamente
        id_criptoativo: parseInt(id_criptoativo),  // Usando id_criptoativo diretamente
      },
      data: { quantidade: parseFloat(quantidade) },  // Dados a serem atualizados
    });

    res.json(carteiraCripto);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao atualizar carteira de criptoativo', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao atualizar carteira de criptoativo' });
    }
  }
};

// Deleta uma carteira de criptoativo
export const deleteCarteiraCripto = async (req: Request, res: Response) => {
  try {
    const { id_carteira, id_criptoativo } = req.params;

    // Validação de ID
    if (!id_carteira || !id_criptoativo) {
      return res.status(400).json({ message: 'IDs são obrigatórios para deletar a carteira de criptoativo.' });
    }

    // Verifica se os IDs são números válidos
    const idCarteiraInt = parseInt(id_carteira);
    const idCriptoativoInt = parseInt(id_criptoativo);

    if (isNaN(idCarteiraInt) || isNaN(idCriptoativoInt)) {
      return res.status(400).json({ message: 'IDs devem ser números válidos.' });
    }

    // Deleta a carteira de criptoativo
    await prisma.carteira_cripto.delete({
      where: {
        id_carteira: idCarteiraInt,  // ID da carteira
        id_criptoativo: idCriptoativoInt,  // ID do criptoativo
      },
    });

    res.json({ message: 'Carteira de criptoativo deletada com sucesso!' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Erro ao deletar carteira de criptoativo', error: error.message });
    } else {
      res.status(500).json({ message: 'Erro desconhecido ao deletar carteira de criptoativo' });
    }
  }
};
