import { container, inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../domain/IUserRepository';
import { UseIdAlreadyExistError } from '../../domain/errors/UseIdAlreadyExistError';
import { UserEmailAlreadyExistError } from '../../domain/errors/UserEmailAlreadyExistError';
import { ExistUserByEmail } from '../../domain/services/ExistUserByEmail';
import { ExistUserById } from '../../domain/services/ExistUserById';
import 'reflect-metadata';
import { User } from '../../domain/User';
import { UserId } from '../../domain/UserId';
import { UserFirstname } from '../../domain/UserFirstname';
import { UserLastname } from '../../domain/UserLastname';
import { UserEmail } from '../../domain/UserEmail';
import { UserPassword } from '../../domain/UserPassword';
import { UserPhone } from '../../domain/UserPhone';

interface ICreateUserRequest {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
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

    const user = await User.create(
      new UserId(req.id),
      new UserFirstname(req.firstname),
      new UserLastname(req.lastname),
      new UserEmail(req.email),
      new UserPassword(req.password, container.resolve('HashService')),
      new UserPhone(req.phone),
    );
    await this._repository.create(user);
  }
}
