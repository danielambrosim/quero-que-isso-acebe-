import express from 'express';
import {
  getCarteiras,
  createCarteira,
  updateCarteira,
  deleteCarteira,
} from '../controllers/carteiraController';

const router = express.Router();

router.get('/', getCarteiras);
router.post('/', createCarteira);
router.put('/:id', updateCarteira);
router.delete('/:id', deleteCarteira);

export default router;
