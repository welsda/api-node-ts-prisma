/**
 * __tests__/integration/userRoutes.test.ts
 * Testa rotas reais da API com supertest.
 * Aqui usamos o banco real SQLite (dev.db).
 */

import request from 'supertest';
import app from '../../src/app';
import prisma from '../../src/database/prismaClient';

// Antes de rodar os testes, zera o banco
beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Routes', () => {
  it('deve registrar novo usuário', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Alice', email: 'alice@test.com', password: '123456' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('deve logar e retornar token', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'alice@test.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('deve acessar /profile com token válido', async () => {
    const login = await request(app)
      .post('/api/users/login')
      .send({ email: 'alice@test.com', password: '123456' });

    const token = login.body.token;

    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', 'alice@test.com');
  });
});
