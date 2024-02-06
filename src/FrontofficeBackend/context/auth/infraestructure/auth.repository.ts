import { Auth } from '../domain/auth';
import { ErrorProps, IAuthRepository, SignInProps } from '../domain/interfaces/auth.interface';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthRepository implements IAuthRepository {
  private prisma = new PrismaClient();

  public async signIn(auth: Auth): Promise<SignInProps | ErrorProps> {
    const findUser = await this.prisma.user.findFirst({ where: { email: auth.email } });
    if (!findUser) return { status: 404, message: 'User not found.' };
    const isMatched = await bcrypt.compare(auth.password, findUser?.password || '');
    if (!isMatched) return { status: 401, message: 'Wrong password.' };
    const token = jwt.sign({ id: findUser.id, name: findUser.firstName, email: findUser.email }, process.env.SECRET_KEY ?? '', {
      expiresIn: process.env.TOKEN_DURATION ?? '1d',
    });
    return { status: 200, user: { email: findUser.email, name: findUser.firstName }, token };
  }
}
