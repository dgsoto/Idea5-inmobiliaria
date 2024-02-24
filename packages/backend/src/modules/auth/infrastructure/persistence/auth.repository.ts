import { PrismaClient } from '@prisma/client';
import { IAuthRepository } from '../../domain/interfaces/auth.interface';

export class AuthRepository implements IAuthRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getByEmail(email: string): Promise<any> {
    const userData = await this.prisma.users.findFirst({ where: { email: email } });
    return userData;
  }
}
