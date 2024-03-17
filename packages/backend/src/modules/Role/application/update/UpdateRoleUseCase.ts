import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRoleRepository } from '../../domain/IRoleRepository';
import { RoleName } from '../../domain/RoleName';
import { RoleState } from '../../domain/RoleState';
import { IUpdateRoleRequest } from './IUpdateRoleRequest';
import { RoleIdNotExistError } from '../../domain/errors/RoleIdNotExistError';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';

@injectable()
export class UpdateRoleUseCase implements IUseCase<IUpdateRoleRequest, void> {
  private readonly _repository: IRoleRepository;

  constructor(@inject('RoleRepository') repository: IRoleRepository) {
    this._repository = repository;
  }
  public async run(req: IUpdateRoleRequest): Promise<void> {
    const role = await this._repository.getById(req.id);
    if (role === null) throw new RoleIdNotExistError();
    role.updateFields(new RoleName(req.roleName), new RoleState(req.roleState));
    await this._repository.update(role);
  }
}
