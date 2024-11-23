import express from 'express';
import { createUsuario, getUsuarios } from '../controllers/usuarioController';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', createUsuario);

export default router;
