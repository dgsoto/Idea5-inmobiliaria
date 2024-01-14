import { type IUserRepository } from '../../domain/IUserRepository'
import { type User } from '../../domain/User'
import { UserAlreadyExistError } from '../../domain/errors/UserAlreadyExistError'
import { ExistUserByEmail } from '../../domain/services/ExistUserByEmail'

export class CreateUserUseCase {
  private readonly _repository: IUserRepository
  private readonly _existUser: ExistUserByEmail

  constructor(repository: IUserRepository) {
    this._repository = repository
    this._existUser = new ExistUserByEmail(this._repository)
  }

  async run(user: User): Promise<void> {
    const existUser = await this._existUser.check(user.email)
    if (existUser) throw new UserAlreadyExistError()

    await this._repository.create(user)
  }
}
