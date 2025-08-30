/**
 * src/middlewares/auth.ts
 * Middleware de autenticação que verifica o token JWT.
 * Exemplo didático: armazena user id em req.user se token válido.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: number;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Token malformado' });
  }

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'troque_essa_chave';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    // anexo simples do ID do usuário na request (em app real, anexe mais info)
    (req as any).user = { id: decoded.userId };
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};