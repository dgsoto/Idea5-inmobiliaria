import { inject, injectable } from 'tsyringe';
import type { IRoleRepository } from '../IRoleRepository';
import 'reflect-metadata';

@injectable()
export class ExistRoleById {
  private readonly _repository: IRoleRepository;

  constructor(@inject('RoleRepository') repository: IRoleRepository) {
    this._repository = repository;
  }

  async check(id: string): Promise<boolean> {
    const existRole = await this._repository.getById(id);
    if (existRole !== null) {
      return true;
    } else {
      return false;
    }
  }
}
