import type { IUserRepository } from '../IUserRepository'

export class ExistUserByEmail {
  private readonly _repository: IUserRepository

  constructor(repository: IUserRepository) {
    this._repository = repository
  }

  async check(email: string): Promise<boolean> {
    const existUser = await this._repository.getByEmail(email)
    if (existUser !== null) {
      return true
    } else {
      return false
    }
  }
}
