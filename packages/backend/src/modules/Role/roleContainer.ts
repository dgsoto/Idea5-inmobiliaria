import { container } from 'tsyringe';
import { IController } from '../Shared/infrastructure/api/IController';
import { CreateRoleUseCase } from './application/create/CreateRoleUseCase';
import { IRoleRepository } from './domain/IRoleRepository';
import { ExistRoleById } from './domain/services/ExistRoleById';
import { CreateRoleController } from './infrastructure/api/CreateRoleController';
import { RoleRepository } from './infrastructure/persistence/RoleRepository';

container.register<IRoleRepository>('RoleRepository', { useClass: RoleRepository });
container.register('ExistRoleById', { useClass: ExistRoleById });
container.register('CreateRoleUseCase', { useClass: CreateRoleUseCase });
container.register<IController>('CreateRoleController', { useClass: CreateRoleController });

export { container as roleContainer };
