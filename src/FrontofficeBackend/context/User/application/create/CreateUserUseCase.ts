import { IUserRepository } from '../../domain/IUserRepository';
import { UseIdAlreadyExistError } from '../../domain/errors/UseIdAlreadyExistError';
import { UserEmailAlreadyExistError } from '../../domain/errors/UserEmailAlreadyExistError';
import { ExistUserByEmail } from '../../domain/services/ExistUserByEmail';
import { ExistUserById } from '../../domain/services/ExistUserById';
import { hashPassword } from '../../infrastructure/security/hashPassword';

interface ICreateUserRequest {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export class CreateUserUseCase {
  private readonly _repository: IUserRepository;
  private readonly checkByEmail: ExistUserByEmail;
  private readonly checkById: ExistUserById;

  constructor(repository: IUserRepository) {
    this._repository = repository;
    this.checkByEmail = new ExistUserByEmail(this._repository);
    this.checkById = new ExistUserById(this._repository);
  }

  async run(req: ICreateUserRequest): Promise<void> {
    const checkUserByEmail = await this.checkByEmail.check(req.email);
    if (checkUserByEmail) throw new UserEmailAlreadyExistError();

    const checkUserById = await this.checkById.check(req.id);
    if (checkUserById) throw new UseIdAlreadyExistError();

    req.password = await hashPassword(req.password);

    await this._repository.create(req);
  }
}
