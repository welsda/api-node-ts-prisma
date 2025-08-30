/**
 * src/services/userService.ts
 * Lógica de negócio de usuário (acessa Prisma e aplica regras)
 */

import prisma from '../database/prismaClient';
import { IUser } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function registerUser(data: IUser) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw { status: 400, message: 'Email já cadastrado' };
  }

  const hashed = await bcrypt.hash(data.password!, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashed
    }
  });

  return { id: user.id, email: user.email, name: user.name };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { status: 401, message: 'Credenciais inválidas' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: 'Credenciais inválidas' };

  const secret = process.env.JWT_SECRET || 'changeme';
  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

  return { token };
}

export async function getUserProfile(userId: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw { status: 404, message: 'Usuário não encontrado' };

  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
}
