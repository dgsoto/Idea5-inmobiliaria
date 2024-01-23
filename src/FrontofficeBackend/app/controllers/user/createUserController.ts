import { type Request, type NextFunction, type Response } from 'express'
import { UserRepository } from '../../../context/User/infrastructure/UserRepository'
import { CreateUserUseCase } from '../../../context/User/application/create/CreateUserUseCase'
import { User } from '../../../context/User/domain/User'

export const createUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id, firstname, lastname, email, password } = req.body
  const _repository = new UserRepository()
  const _createUserUsercase = new CreateUserUseCase(_repository)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const user = new User(id, firstname, lastname, email, password)

  try {
    await _createUserUsercase.run(user)
    res.status(201).send('')
  } catch (e) {
    next(e)
  }
}
