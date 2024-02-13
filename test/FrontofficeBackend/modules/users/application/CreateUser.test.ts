import 'reflect-metadata';
import { CreateUserUseCase } from '../../../../../src/FrontofficeBackend/modules/User/application/create/CreateUserUseCase';
import { User } from '../../../../../src/FrontofficeBackend/modules/User/domain/User';
import { ExistUserByEmail } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/ExistUserByEmail';
import { ExistUserById } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/ExistUserById';
import { UserRepositoryMock } from '../mocks/UserRepositoryMock';
import { faker } from '@faker-js/faker';
import { UserFirstname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserFirstname';
import { UserId } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserId';
import { UserLastname } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserLastname';
import { UserEmail } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserEmail';
import { IHashService } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/IHashService';
import { UserPassword } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPassword';
import { UserPhone } from '../../../../../src/FrontofficeBackend/modules/User/domain/UserPhone';
import { container } from 'tsyringe';

let repository: UserRepositoryMock;
let useCase: CreateUserUseCase;
let existUserByEmail: ExistUserByEmail;
let existUserById: ExistUserById;
let hashPassword: IHashService;

beforeEach(() => {
  repository = new UserRepositoryMock();
  existUserByEmail = new ExistUserByEmail(repository);
  existUserById = new ExistUserById(repository);
  useCase = new CreateUserUseCase(repository, existUserByEmail, existUserById);
  hashPassword = container.resolve('HashService');
});

describe('UserCreator', () => {
  it('should create a valid account for user', async () => {
    jest.spyOn(existUserByEmail, 'check').mockResolvedValue(false);
    jest.spyOn(existUserById, 'check').mockResolvedValue(false);

    const id = faker.string.uuid();
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const phone = faker.string.numeric('##########');
    const expectedUser = await User.create(
      new UserId(id),
      new UserFirstname(firstname),
      new UserLastname(lastname),
      new UserEmail(email),
      new UserPassword(password, hashPassword),
      new UserPhone(phone),
    );
    await useCase.run({ id, firstname, lastname, email, password, phone });

    await repository.assertSaveHaveBeenCalledWith(expectedUser);
  });
});
