import 'reflect-metadata';
import { CreateUserUseCase } from '../../../../src/modules/User/application/create/CreateUserUseCase';
import { ExistUserByEmail } from '../../../../src/modules/User/domain/services/ExistUserByEmail';
import { ExistUserById } from '../../../../src/modules/User/domain/services/ExistUserById';
import { CreateUserMother } from './CreateUserMother';
import { UserMother } from '../domain/UserMother';
import { UserRepositoryMock } from '../mocks/UserRepositoryMock';

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
