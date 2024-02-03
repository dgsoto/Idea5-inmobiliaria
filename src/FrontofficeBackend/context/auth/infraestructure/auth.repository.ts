import { Auth, SignInProps } from '../domain/auth';
import { IAuthRepository } from '../domain/interfaces/auth.interface';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

export class AuthRepository implements IAuthRepository {
  private prisma = new PrismaClient();

  public async signIn(auth: Auth): Promise<SignInProps> {
    const findUser = await this.prisma.user.findFirst({ where: { email: auth.email } });
    if (!findUser) throw new Error('No se encontro al usuario ');
    const isMatched = await bcrypt.compare(auth.password, findUser?.password || '');
    if (!isMatched) throw new Error('La contraseña es incorrecta');
    return { status: 200, user: { email: findUser.email, name: findUser.name }, token: '' };
  }
}
