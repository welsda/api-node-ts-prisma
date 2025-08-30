/**
 * src/controllers/userController.ts
 * Controllers recebem req/res e chamam os services.
 */

import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);
    res.json(token);
  } catch (err) {
    next(err);
  }
}

export async function profile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id; // setado no middleware authenticate
    const profile = await userService.getUserProfile(userId);
    res.json(profile);
  } catch (err) {
    next(err);
  }
}
