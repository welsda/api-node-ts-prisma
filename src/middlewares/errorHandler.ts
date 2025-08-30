/**
 * src/middlewares/errorHandler.ts
 * Handler global de erros — padrão simples para aprendizado.
 */

import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  // Em produção, integre um logger (Sentry/LogRocket/…)
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    error: message,
    // em dev podemos enviar stack para aprendizado (remover em prod)
    ...(process.env.NODE_ENV !== 'production' ? { stack: err.stack } : {})
  });
}