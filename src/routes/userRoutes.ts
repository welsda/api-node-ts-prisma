/**
 * src/routes/userRoutes.ts
 * Define endpoints de usuário.
 */

import { Router } from 'express';
import { register, login, profile } from '../controllers/userController';
import { validateBody } from '../middlewares/validate';
import { registerSchema, loginSchema } from '../validators/userSchemas';
import { authenticate } from '../middlewares/auth';

const router = Router();

// POST /api/users/register
router.post('/register', validateBody(registerSchema), register);

// POST /api/users/login
router.post('/login', validateBody(loginSchema), login);

// GET /api/users/profile (rota protegida)
router.get('/profile', authenticate, profile);

export default router;
