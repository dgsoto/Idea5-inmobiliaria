import { inject, injectable } from 'tsyringe';
import type { IUserRepository } from '../IUserRepository';
import 'reflect-metadata';

@injectable()
export class ExistUserByEmail {
  private readonly _repository: IUserRepository;

  constructor(@inject('UserRepository') repository: IUserRepository) {
    this._repository = repository;
  }

  async check(email: string): Promise<boolean> {
    const existUser = await this._repository.getByEmail(email);
    if (existUser !== null) {
      return true;
    } else {
      return false;
    }
  }
}
