import type { BaseEntity } from './AggregateRoot';

export interface IRepository<T extends BaseEntity> {
  create: (entity: T) => Promise<void>;
  update: (entity: T) => Promise<void>;
  delete: (entity: T) => Promise<void>;
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
}
