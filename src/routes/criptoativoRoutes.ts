import express from 'express';
import {
  getCriptoativos,
  createCriptoativo,
  updateCriptoativo,
  deleteCriptoativo,
} from '../controllers/criptoativoController';

const router = express.Router();

router.get('/', getCriptoativos);
router.post('/', createCriptoativo);
router.put('/:id', updateCriptoativo);
router.delete('/:id', deleteCriptoativo);

export default router;
