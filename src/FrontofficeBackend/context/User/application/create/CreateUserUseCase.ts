import { type IUserRepository } from '../../domain/IUserRepository';
import { type User } from '../../domain/User';
import { UseIdAlreadyExistError } from '../../domain/errors/UseIdAlreadyExistError';
import { UserEmailAlreadyExistError } from '../../domain/errors/UserEmailAlreadyExistError';
import { ExistUserByEmail } from '../../domain/services/ExistUserByEmail';
import { ExistUserById } from '../../domain/services/ExistUserById';
import { hashPassword } from '../../infrastructure/security/hashPassword';

export class CreateUserUseCase {
  private readonly _repository: IUserRepository;
  private readonly checkByEmail: ExistUserByEmail;
  private readonly checkById: ExistUserById;

  constructor(repository: IUserRepository) {
    this._repository = repository;
    this.checkByEmail = new ExistUserByEmail(this._repository);
    this.checkById = new ExistUserById(this._repository);
  }

  async run(user: User): Promise<void> {
    const checkUserByEmail = await this.checkByEmail.check(user.email);
    if (checkUserByEmail) throw new UserEmailAlreadyExistError();

    const checkUserById = await this.checkById.check(user.id);
    if (checkUserById) throw new UseIdAlreadyExistError();

    user.password = await hashPassword(user.password);

    await this._repository.create(user);
  }
}
