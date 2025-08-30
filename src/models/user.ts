/**
 * src/models/user.ts
 * Definição de tipos/contratos TypeScript para User
 */

export interface IUser {
  id?: number;
  name?: string;
  email: string;
  password?: string;
  createdAt?: Date;
}