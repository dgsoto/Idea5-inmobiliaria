import type { Privilege } from './Privilege';

export interface IPrivilegeRepository {
  create: (privilege: Privilege) => Promise<void>;
  update: (privilege: Privilege) => Promise<void>;
  delete: (id: string) => Promise<void>;
  getById: (id: string) => Promise<Privilege | null>;
  getAll: () => Promise<Privilege[]>;
}
