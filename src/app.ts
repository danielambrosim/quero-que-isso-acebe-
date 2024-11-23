import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler'; // Middleware de erro

import usuarioRoutes from './routes/usuarioRoutes';
import carteiraRoutes from './routes/carteiraRoutes';
import criptoativoRoutes from './routes/criptoativoRoutes';
import transacaoRoutes from './routes/transacaoRoutes';
import carteiraCriptoRoutes from './routes/carteiraCriptoRoutes';

dotenv.config();

const app = express();

app.use(express.json()); // Middleware para interpretar o corpo das requisições como JSON

// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/carteiras', carteiraRoutes);
app.use('/criptoativos', criptoativoRoutes);
app.use('/transacoes', transacaoRoutes);
app.use('/carteira-cripto', carteiraCriptoRoutes);

// Middleware de tratamento de erros (deve vir após todas as rotas)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next); // Chama o middleware de erro personalizado
});

export default app;
