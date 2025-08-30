/**
 * __tests__/unit/userService.test.ts
 * Testes unitários para userService
 */

import * as userService from '../../src/services/userService';
import prisma from '../../src/database/prismaClient';
import bcrypt from 'bcryptjs';

// Mock do Prisma para não acessar banco real
jest.mock('../../src/database/prismaClient', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
}));

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve registrar usuário com senha criptografada', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.create as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@test.com',
      name: 'Test',
      password: 'hashed'
    });

    const user = await userService.registerUser({
      email: 'test@test.com',
      name: 'Test',
      password: '123456'
    });

    expect(user).toHaveProperty('id', 1);
    expect(user).toHaveProperty('email', 'test@test.com');
    expect(bcrypt.hash).toBeDefined();
  });

  it('não deve registrar se email já existe', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, email: 'exist@test.com' });

    await expect(
      userService.registerUser({ email: 'exist@test.com', password: '123456' })
    ).rejects.toMatchObject({ status: 400 });
  });
});
