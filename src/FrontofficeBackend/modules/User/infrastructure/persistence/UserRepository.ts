import { User } from '../../domain/User';
import type { IUserRepository } from '../../domain/IUserRepository';
import { PrismaClient } from '@prisma/client';
import 'reflect-metadata';
import { container, injectable } from 'tsyringe';
import { UserEmail } from '../../domain/UserEmail';
import { UserFirstname } from '../../domain/UserFirstname';
import { UserId } from '../../domain/UserId';
import { UserLastname } from '../../domain/UserLastname';
import { UserPassword } from '../../domain/UserPassword';
import { UserPhone } from '../../domain/UserPhone';

@injectable()
export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(userData: User): Promise<void> {
    const userPassword: UserPassword = await UserPassword.createAndHash(userData.password.getValue(), container.resolve('HashService'));
    console.log(userPassword.getHashedValue());

    userPassword.validate();
    console.log(userPassword.getHashedValue());
    await this.prisma.user.create({
      data: {
        id: userData.id.value,
        firstname: userData.firstname.toString(),
        lastname: userData.lastname.toString(),
        email: userData.email.toString(),
        password: userPassword.getHashedValue(),
        phone: userData.phone.toString(),
      },
    });
  }

  async getById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({ where: { id } });
    return userData
      ? new User(
          new UserId(userData.id),
          new UserFirstname(userData.firstname),
          new UserLastname(userData.lastname),
          new UserEmail(userData.email),
          new UserPassword(userData.password, container.resolve('HashService')),
          new UserPhone(userData.phone),
        )
      : null;
  }

  async getByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({ where: { email } });
    return userData
      ? new User(
          new UserId(userData.id),
          new UserFirstname(userData.firstname),
          new UserLastname(userData.lastname),
          new UserEmail(userData.email),
          new UserPassword(userData.password, container.resolve('HashService')),
          new UserPhone(userData.phone),
        )
      : null;
  }
}
