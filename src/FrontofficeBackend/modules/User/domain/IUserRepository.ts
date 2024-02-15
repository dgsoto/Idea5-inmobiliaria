import type { User } from './User';

export interface IUserRepository {
  create: (user: User) => Promise<void>;
  getById: (id: string) => Promise<User | null>;
  getByEmail: (email: string) => Promise<User | null>;
}
