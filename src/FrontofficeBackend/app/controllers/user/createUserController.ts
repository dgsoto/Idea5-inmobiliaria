import { type Request, type NextFunction, type Response } from 'express'
import { CreateUserUseCase } from '../../../context/User/application/create/CreateUserUseCase'
import { User } from '../../../context/User/domain/User'
import { UserRepository } from '../../../context/User/infrastructure/UserRepository'

type CreatePutRequest = Request & {
  body: {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  }
}

export const createUserController = async (req: CreatePutRequest, res: Response, next: NextFunction, userRepository: UserRepository): Promise<void> => {
  const { id, firstname, lastname, email, password } = req.body
  const _createUserUsercase = new CreateUserUseCase(userRepository)

  const user = new User(id, firstname, lastname, email, password)

  try {
    await _createUserUsercase.run(user)
    res.status(201).send('')
  } catch (e) {
    next(e)
  }
}
