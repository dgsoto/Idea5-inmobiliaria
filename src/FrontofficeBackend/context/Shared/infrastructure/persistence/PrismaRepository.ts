import { Prisma, PrismaClient } from '@prisma/client';
import type { IRepository } from '../../domain/IRepository';
import type { BaseEntity } from '../../domain/BaseEntity';

export class PrismaRepository<T extends BaseEntity> implements IRepository<T> {
  protected prisma: PrismaClient;
  private model: Prisma.ModelName;

  constructor(model: Prisma.ModelName) {
    this.prisma = new PrismaClient();
    this.model = model;
  }

  protected getModel(): any {
    // Usa el objeto prisma para acceder a los modelos de manera dinámica
    return this.prisma[this.model];
  }
  async create(entity: T): Promise<void> {
    await this.getModel().create({
      data: entity,
    });
  }

  async update(entity: T): Promise<void> {
    await this.getModel().update({
      where: { id: entity.id },
      data: entity,
    });
  }

  async delete(entity: T): Promise<void> {
    await this.getModel().delete({ where: { id: entity.id } });
  }

  async getAll(): Promise<T[]> {
    return await this.getModel().findMany();
  }

  async getById(id: string): Promise<T | null> {
    return await this.getModel().findUnique({ where: { id } });
  }
}
