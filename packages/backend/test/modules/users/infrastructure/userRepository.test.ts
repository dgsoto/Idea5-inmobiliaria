import 'reflect-metadata';
import { IUserRepository } from '../../../../src/modules/User/domain/IUserRepository';
import { UserMother } from '../domain/UserMother';
import { EnvironmentArranger } from '../../shared/infrastructure/EnvironmentArranger';
import { testContainer } from '../../shared/testContainer';
import { userContainer } from '../../../../src/modules/User/userContainer';

const repository: IUserRepository = userContainer.resolve<IUserRepository>('UserRepository');
const environmentArranger: EnvironmentArranger = testContainer.resolve('PrismaEnvironmentArranger');

beforeAll(async () => {
  await environmentArranger.arrange();
});

beforeEach(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});
afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('UserRepository', () => {
  describe('Create new User', () => {
    it('should create a new account for the user', async () => {
      const user = await UserMother.random();
      await repository.create(user);

      const createdUser = await repository.getById(user.id.value);
      expect(createdUser).toBeDefined();
      expect(createdUser?.id.value).toEqual(user.id.value);
    }, 10000);
  });
});
