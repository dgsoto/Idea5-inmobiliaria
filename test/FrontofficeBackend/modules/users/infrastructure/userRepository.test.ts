import { faker } from '@faker-js/faker';
import { IUserRepository } from '../../../../../src/FrontofficeBackend/modules/User/domain/IUserRepository';
import { User } from '../../../../../src/FrontofficeBackend/modules/User/domain/User';
import { UserEmail } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserEmail';
import { UserFirstname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserFirstname';
import { UserId } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserId';
import { UserLastname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserLastname';
import { UserPassword } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPassword';
import { UserPhone } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPhone';
import { container } from 'tsyringe';
import { IHashService } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/IHashService';

describe('LocalUserRepository', () => {
  let repository: IUserRepository;
  let hashPassword: IHashService;

  beforeAll(async () => {});

  beforeEach(() => {
    repository = container.resolve<IUserRepository>('UserRepository');
    hashPassword = container.resolve('HashService');
  });

  it('should create a new account for the user', async () => {
    const userId = new UserId(faker.string.uuid());
    const firstname = new UserFirstname(faker.person.firstName());
    const lastname = new UserLastname(faker.person.lastName());
    const phone = new UserPhone(faker.string.numeric('##########'));
    const email = new UserEmail(faker.internet.email());
    const password = new UserPassword(faker.internet.password(), hashPassword);

    const expectedUser = new User(userId, firstname, lastname, email, password, phone);

    repository.create(expectedUser);

    const user = await repository.getByEmail(email.toString());
    expect(user).toEqual(expectedUser);
  });
});
