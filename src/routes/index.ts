import { Router } from 'express';
import healthController from '../controllers/healthController';
import userRoutes from './userRoutes';

const router = Router();

router.get('/', (req, res) => res.json({ status: 'ok', version: '0.1.0' }));
router.get('/health', healthController);

// Rotas de usuário
router.use('/users', userRoutes);

export default router;