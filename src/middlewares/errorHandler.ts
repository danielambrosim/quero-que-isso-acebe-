import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para tratar erros globais.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro:', err);

  // Verifica se o erro é uma instância customizada
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // Tratar erros de validação (exemplo com Zod)
  if (err.name === 'ZodError') {
    return res.status(400).json({
      message: 'Erro de validação.',
      errors: err.errors,
    });
  }

  // Erro padrão do Prisma
  if (err.code) {
    return res.status(500).json({
      message: 'Erro interno no banco de dados.',
      code: err.code,
    });
  }

  // Erro genérico (não tratado)
  return res.status(500).json({
    message: 'Ocorreu um erro inesperado.',
  });
};
