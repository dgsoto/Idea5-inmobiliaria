import { container } from 'tsyringe';
import { AuthRepository } from './persistence/auth.repository';
import { AuthController } from './api/auth.controller';
import { IAuthRepository } from '../domain/interfaces/auth.interface';
import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { LoginUseCase } from '../application/logInUseCase';

container.register<IAuthRepository>('AuthRepository', { useClass: AuthRepository });
container.register<IController>('AuthController', { useClass: AuthController });
container.register('LoginUseCase', { useClass: LoginUseCase });

export { container as authContainer };
