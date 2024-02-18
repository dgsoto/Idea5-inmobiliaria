import { container } from 'tsyringe';
import { IController } from '../Shared/infrastructure/api/IController';
import { CreateUserUseCase } from './application/create/CreateUserUseCase';
import { IUserRepository } from './domain/IUserRepository';
import { ExistUserByEmail } from './domain/services/ExistUserByEmail';
import { ExistUserById } from './domain/services/ExistUserById';
import { IHashService } from './domain/services/IHashService';
import { CreateUserController } from './infrastructure/api/CreateUserController';
import { UserRepository } from './infrastructure/persistence/UserRepository';
import { HashService } from './infrastructure/security/HashService';

container.register<IUserRepository>('UserRepository', { useClass: UserRepository });
container.register('ExistUserByEmail', { useClass: ExistUserByEmail });
container.register('ExistUserById', { useClass: ExistUserById });
container.register('CreateUserUseCase', { useClass: CreateUserUseCase });
container.register<IController>('CreateUserController', { useClass: CreateUserController });
container.register<IHashService>('HashService', { useClass: HashService });

export { container as userContainer };
