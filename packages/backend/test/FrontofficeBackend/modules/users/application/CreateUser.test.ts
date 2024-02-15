import 'reflect-metadata';
import { CreateUserUseCase } from '../../../../../src/FrontofficeBackend/modules/User/application/create/CreateUserUseCase';
import { ExistUserByEmail } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/ExistUserByEmail';
import { ExistUserById } from '../../../../../src/FrontofficeBackend/modules/User/domain/services/ExistUserById';
import { UserRepositoryMock } from '../mocks/UserRepositoryMock';
import { CreateUserMother } from './CreateUserMother';
import { UserMother } from '../domain/UserMother';

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

    const request = await CreateUserMother.random();
    const user = await UserMother.from(request);
    await useCase.run(request);

    await repository.assertSaveHaveBeenCalledWith(user);
  }, 10000);
});
