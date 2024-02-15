import { CreateUserUseCase } from '../modules/User/application/create/CreateUserUseCase';
import { container } from 'tsyringe';
import { IUserRepository } from '../modules/User/domain/IUserRepository';
import { ExistUserByEmail } from '../modules/User/domain/services/ExistUserByEmail';
import { ExistUserById } from '../modules/User/domain/services/ExistUserById';
import { IController } from '../modules/Shared/infrastructure/api/IController';
import { UserRepository } from '../modules/User/infrastructure/persistence/UserRepository';

container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
container.register('ExistUserByEmail', { useClass: ExistUserByEmail });
container.register('ExistUserById', { useClass: ExistUserById });
container.register('CreateUserUseCase', { useClass: CreateUserUseCase });
container.register<IController>('CreateUserController', { useClass: CreateUserController });
container.register<IHashService>('HashService', { useClass: HashService });

export { container };
