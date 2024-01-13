import type { IRepository } from '../../Shared/domain/IRepository'
import type { User } from './User'

export interface IUserRepository extends IRepository<User> {
  getByEmail: (email: string) => Promise<User | null>
}
