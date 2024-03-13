import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../domain/IUserRepository';
import { UserIdAlreadyExistError } from '../../domain/errors/UserIdAlreadyExistError';
import { UserEmailAlreadyExistError } from '../../domain/errors/UserEmailAlreadyExistError';
import { ExistUserByEmail } from '../../domain/services/ExistUserByEmail';
import { ExistUserById } from '../../domain/services/ExistUserById';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserFirstname } from '../../domain/UserFirstname';
import { UserLastname } from '../../domain/UserLastname';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { UserPhone } from '../../domain/UserPhone';
import { ICreateUserRequest } from './ICreateUserRequest';
import { userContainer } from '../../userContainer';

@injectable()
export class CreateUserUseCase {
  private readonly _repository: IUserRepository;
  private readonly checkByEmail: ExistUserByEmail;
  private readonly checkById: ExistUserById;

  constructor(
    @inject('UserRepository') repository: IUserRepository,
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
    if (checkUserById) throw new UserIdAlreadyExistError();

    const user = await User.create(
      new UserId(req.id),
      new UserFirstname(req.firstname),
      new UserLastname(req.lastname),
      new UserEmail(req.email),
      await new UserPassword(req.password, userContainer.resolve('HashService')).validate(),
      new UserPhone(req.phone),
    );
    await this._repository.create(user);
  }
}
