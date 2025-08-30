/**
 * src/middlewares/validate.ts
 * Middleware utilitário para validar bodies com Joi.
 */

import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateBody = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const details = error.details.map(d => d.message);
    return res.status(400).json({ errors: details });
  }
  req.body = value;
  return next();
};