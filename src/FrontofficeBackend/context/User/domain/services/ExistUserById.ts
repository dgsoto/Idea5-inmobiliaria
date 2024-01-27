import type { IUserRepository } from '../IUserRepository'

export class ExistUserById {
  private readonly _repository: IUserRepository

  constructor(repository: IUserRepository) {
    this._repository = repository
  }

  async check(id: string): Promise<boolean> {
    const existUser = await this._repository.getById(id)
    if (existUser !== null) {
      return true
    } else {
      return false
    }
  }
}
