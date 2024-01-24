import { type Request, type NextFunction, type Response } from 'express'
import { CreateUserUseCase } from '../../../context/User/application/create/CreateUserUseCase'
import { User } from '../../../context/User/domain/User'
import { UserRepository } from '../../../context/User/infrastructure/UserRepository'

export const createUserController = async (req: Request, res: Response, next: NextFunction, userRepository: UserRepository): Promise<void> => {
  const { id, firstname, lastname, email, password } = req.body
  const _createUserUsercase = new CreateUserUseCase(userRepository)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const user = new User(id, firstname, lastname, email, password)

  try {
    await _createUserUsercase.run(user)
    res.status(201).send('')
  } catch (e) {
    next(e)
  }
}
