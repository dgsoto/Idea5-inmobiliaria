import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IRoleRepository } from '../../domain/IRoleRepository';
import { RoleIdNotExistError } from '../../domain/errors/RoleIdNotExistError';

@injectable()
export class DeleteRoleUseCase {
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
