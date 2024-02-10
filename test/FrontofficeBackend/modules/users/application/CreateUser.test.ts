import 'reflect-metadata';
import { CreateUserUseCase } from '../../../../../src/FrontofficeBackend/modules/User/application/create/CreateUserUseCase';
import { User } from '../../../../../src/FrontofficeBackend/modules/User/domain/User';
import { ExistUserByEmail } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/ExistUserByEmail';
import { ExistUserById } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/ExistUserById';
import { UserRepositoryMock } from '../mocks/UserRepositoryMock';
import { faker } from '@faker-js/faker';

let repository: UserRepositoryMock;
let useCase: CreateUserUseCase;
let existUserByEmail: ExistUserByEmail;
let existUserById: ExistUserById;

beforeEach(() => {
  repository = new UserRepositoryMock();
  existUserByEmail = new ExistUserByEmail(repository);
  existUserById = new ExistUserById(repository);
  useCase = new CreateUserUseCase(repository, existUserByEmail, existUserById);
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
    const expectedUser = await User.create(id, firstname, lastname, email, password);
    await useCase.run({ id, firstname, lastname, email, password });

    await repository.assertSaveHaveBeenCalledWith(expectedUser);
  });
});
