import type { Role } from './Role';

export interface IRoleRepository {
  create: (role: Role) => Promise<void>;
  update: (role: Role) => Promise<void>;
  delete: (id: string) => Promise<void>;
  getById: (id: string) => Promise<Role | null>;
  getAll: () => Promise<Role[]>;
}
