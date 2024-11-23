import express from 'express';
import {
  getTransacoes,
  createTransacao,
  updateTransacao,
  deleteTransacao,
} from '../controllers/transacaoController';

const router = express.Router();

router.get('/', getTransacoes);
router.post('/', createTransacao);
router.put('/:id', updateTransacao);
router.delete('/:id', deleteTransacao);

export default router;
