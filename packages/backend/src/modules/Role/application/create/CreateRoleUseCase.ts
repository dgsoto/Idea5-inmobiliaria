import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRoleRepository } from '../../domain/IRoleRepository';
import { RoleIdAlreadyExistError } from '../../domain/errors/RoleIdAlreadyExistError';
import { Role } from '../../domain/Role';
import { RoleId } from '../../domain/RoleId';
import { RoleName } from '../../domain/RoleName';
import { RoleState } from '../../domain/RoleState';
import { ICreateRoleRequest } from './ICreateRoleRequest';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';

@injectable()
export class CreateRoleUseCase implements IUseCase<ICreateRoleRequest, void> {
  private readonly _repository: IRoleRepository;

  constructor(@inject('RoleRepository') repository: IRoleRepository) {
    this._repository = repository;
  }
  public async run(req: ICreateRoleRequest): Promise<void> {
    const checkRoleById = await this._repository.getById(req.id);
    if (checkRoleById !== null) throw new RoleIdAlreadyExistError();

    const role = await Role.create(new RoleId(req.id), new RoleName(req.roleName), new RoleState(req.roleState));
    await this._repository.create(role);
  }
}
