import { LocalRepository } from '../../Shared/infrastructure/LocalRepository'
import type { IUserRepository } from '../domain/IUserRepository'
import type { User } from '../domain/User'

export class UserRepository extends LocalRepository<User> implements IUserRepository {
  async getByEmail(email: string): Promise<User | null> {
    const user = this.entities.find(u => u.email === email)
    console.log(email)
    console.log(user?.email)
    return user ?? null
  }
}
