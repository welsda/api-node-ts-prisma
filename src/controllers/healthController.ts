/**
 * src/controllers/healthController.ts
 * Exemplo de controller simples.
 */

import { Request, Response } from 'express';

export default function healthController(req: Request, res: Response) {
  return res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
}