import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRoleRepository } from '../../domain/IRoleRepository';
import { RoleIdAlreadyExistError } from '../../domain/errors/RoleIdAlreadyExistError';
import { ExistRoleById } from '../../domain/services/ExistRoleById';
import { Role } from '../../domain/Role';
import { RoleId } from '../../domain/RoleId';
import { RoleName } from '../../domain/RoleName';
import { RoleState } from '../../domain/RoleState';
import { ICreateRoleRequest } from './ICreateRoleRequest';

@injectable()
export class CreateRoleUseCase {
  private readonly _repository: IRoleRepository;
  private readonly checkById: ExistRoleById;

  constructor(@inject('RoleRepository') repository: IRoleRepository, @inject('ExistRoleById') checkById: ExistRoleById) {
    this._repository = repository;
    this.checkById = checkById;
  }
  public async run(req: ICreateRoleRequest): Promise<void> {
    const checkRoleById = await this.checkById.check(req.id);
    if (checkRoleById) throw new RoleIdAlreadyExistError();

    const role = await Role.create(new RoleId(req.id), new RoleName(req.roleName), new RoleState(req.roleState));
    await this._repository.create(role);
  }
}
