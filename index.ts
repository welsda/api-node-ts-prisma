/**
 * index.ts - ponto de entrada do servidor
 * Carrega variáveis de ambiente e inicializa o app Express exportado por src/app.ts
 */

import 'dotenv/config';
import app from './src/app';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT} (PORT=${PORT})`);
});