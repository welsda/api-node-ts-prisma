/**
 * src/database/prismaClient.ts
 * Instância única do Prisma Client para ser usada pela aplicação.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;