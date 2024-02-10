import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../domain/IUserRepository';
import { UseIdAlreadyExistError } from '../../domain/errors/UseIdAlreadyExistError';
import { UserEmailAlreadyExistError } from '../../domain/errors/UserEmailAlreadyExistError';
import { ExistUserByEmail } from '../../domain/services/ExistUserByEmail';
import { ExistUserById } from '../../domain/services/ExistUserById';
import 'reflect-metadata';
import { User } from '../../domain/User';

interface ICreateUserRequest {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

@injectable()
export class CreateUserUseCase {
  private readonly _repository: IUserRepository;
  private readonly checkByEmail: ExistUserByEmail;
  private readonly checkById: ExistUserById;

  constructor(
    @inject('IUserRepository') repository: IUserRepository,
    @inject('ExistUserByEmail') checkByEmail: ExistUserByEmail,
    @inject('ExistUserById') checkById: ExistUserById,
  ) {
    this._repository = repository;
    this.checkByEmail = checkByEmail;
    this.checkById = checkById;
  }
  public async run(req: ICreateUserRequest): Promise<void> {
    const checkUserByEmail = await this.checkByEmail.check(req.email);
    if (checkUserByEmail) throw new UserEmailAlreadyExistError();

    const checkUserById = await this.checkById.check(req.id);
    if (checkUserById) throw new UseIdAlreadyExistError();

    const user = new User(req.id, req.firstname, req.lastname, req.email, req.password);

    await this._repository.create(user);
  }
}
