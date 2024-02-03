import { UserRepository } from '../context/User/infrastructure/UserRepository';
import { CreateUserUseCase } from '../context/User/application/create/CreateUserUseCase';
import { container } from 'tsyringe';
import { IUserRepository } from '../context/User/domain/IUserRepository';
import { ExistUserByEmail } from '../context/User/domain/services/ExistUserByEmail';
import { ExistUserById } from '../context/User/domain/services/ExistUserById';
import { CreateUserController } from './controllers';
import { IController } from './controllers/IController';

container.register<IUserRepository>('IUserRepository', { useClass: UserRepository });
container.register('ExistUserByEmail', { useClass: ExistUserByEmail });
container.register('ExistUserById', { useClass: ExistUserById });
container.register('CreateUserUseCase', { useClass: CreateUserUseCase });
container.register<IController>('CreateUserController', { useClass: CreateUserController });

export { container };
