import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRoleRepository } from '../../domain/IRoleRepository';
import { RoleIdNotExistError } from '../../domain/errors/RoleIdNotExistError';
import { GetAllRolesResponse } from './GetAllRolesResponse';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';

@injectable()
export class GetAllRolesUseCase implements IUseCase<void, GetAllRolesResponse[]> {
  private readonly _repository: IRoleRepository;

  constructor(@inject('RoleRepository') repository: IRoleRepository) {
    this._repository = repository;
  }
  public async run(): Promise<GetAllRolesResponse[]> {
    const roles = await this._repository.getAll();
    if (roles === null) throw new RoleIdNotExistError();

    const list: GetAllRolesResponse[] = roles.map((role) => ({
      id: role.id.value,
      roleName: role.roleName.getValue(),
      roleState: role.roleState.getValue(),
    }));
    return list;
  }
}
