/**
 * jest.config.ts
 * Configuração para rodar Jest com TypeScript
 */

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  clearMocks: true,
  moduleFileExtensions: ['ts', 'js', 'json', 'node']
};

export default config;
