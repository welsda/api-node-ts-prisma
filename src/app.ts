/**
 * src/app.ts
 * Configura o Express: middlewares globais, rotas e handler de erros.
 */

import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

// Middlewares globais
app.use(cors()); // permite CORS (em dev você pode ajustar)
app.use(express.json()); // parse de JSON

// Prefixo das APIs
app.use('/api', routes);

// Middleware final de tratamento de erros (sempre por último)
app.use(errorHandler);

export default app;