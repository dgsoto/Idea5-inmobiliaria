import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRoleRepository } from '../../domain/IRoleRepository';
import { RoleIdNotExistError } from '../../domain/errors/RoleIdNotExistError';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';

@injectable()
export class DeleteRoleUseCase implements IUseCase<string, void> {
  private readonly _repository: IRoleRepository;

  constructor(@inject('RoleRepository') repository: IRoleRepository) {
    this._repository = repository;
  }
  public async run(id: string): Promise<void> {
    const role = await this._repository.getById(id);
    if (role === null) throw new RoleIdNotExistError();

    await this._repository.delete(id);
  }
}
