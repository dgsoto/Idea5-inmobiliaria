import { PrismaClient } from '@prisma/client';
import { EnvironmentArranger } from './EnvironmentArranger';

export class PrismaEnvironmentArranger extends EnvironmentArranger {
  private prisma: PrismaClient;

  constructor() {
    super();
    this.prisma = new PrismaClient();
  }

  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  private async cleanDatabase(): Promise<void> {
    try {
      await this.prisma.user.deleteMany({});
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`);
    }
  }

  public async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}
