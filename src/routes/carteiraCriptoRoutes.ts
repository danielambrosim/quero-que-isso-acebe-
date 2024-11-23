import express from 'express';
import {
  getCarteiraCriptos,
  createCarteiraCripto,
  updateCarteiraCripto,
  deleteCarteiraCripto,
} from '../controllers/carteiraCriptoController';

const router = express.Router();

router.get('/', getCarteiraCriptos); // Método GET
router.post('/', createCarteiraCripto); // Método POST
router.put('/:idCarteira/:idCriptoativo', updateCarteiraCripto); // Método PUT
router.delete('/:idCarteira/:idCriptoativo', deleteCarteiraCripto); // Método DELETE

export default router;
