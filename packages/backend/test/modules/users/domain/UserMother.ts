import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { User } from '../../../../../src/FrontofficeBackend/modules/User/domain/User';
import { UserEmail } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserEmail';
import { UserFirstname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserFirstname';
import { UserId } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserId';
import { UserLastname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserLastname';
import { UserPassword } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPassword';
import { UserPhone } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPhone';
import { IHashService } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/IHashService';
import { container } from '../../../../../src/FrontofficeBackend/app/container';
import { ICreateUserRequest } from '../../../../../src/FrontofficeBackend/modules/User/application/create/ICreateUserRequest';

export class UserMother {
  static hashService: IHashService;
  constructor(private hashService: IHashService) {
    this.hashService = hashService;
  }

  static create(id: UserId, firstname: UserFirstname, lastname: UserLastname, email: UserEmail, password: UserPassword, phone: UserPhone): User {
    return new User(id, firstname, lastname, email, password, phone);
  }

  static async random(): Promise<User> {
    const hashedPassword = await new UserPassword(faker.internet.password(), container.resolve('HashService')).validate();
    return this.create(
      new UserId(faker.string.uuid()),
      new UserFirstname(faker.person.firstName()),
      new UserLastname(faker.person.lastName()),
      new UserEmail(faker.internet.email()),
      hashedPassword,
      new UserPhone(faker.string.numeric('##########')),
    );
  }
  static async from(request: ICreateUserRequest): Promise<User> {
    const hashedPassword = await new UserPassword(request.password, container.resolve('HashService')).validate();
    return this.create(
      new UserId(request.id),
      new UserFirstname(request.firstname),
      new UserLastname(request.lastname),
      new UserEmail(request.email),
      hashedPassword,
      new UserPhone(request.phone),
    );
  }
}
