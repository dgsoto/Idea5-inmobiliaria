import { container } from 'tsyringe';
import { PrismaEnvironmentArranger } from './infrastructure/PrismaEnvironmentArranger';
import { IUserRepository } from '../../../src/modules/User/domain/IUserRepository';
import { UserRepositoryMock } from '../users/mocks/UserRepositoryMock';

container.register('PrismaEnvironmentArranger', { useClass: PrismaEnvironmentArranger });
container.register<IUserRepository>('UserRepositoryMock', { useClass: UserRepositoryMock });

export { container as testContainer };
