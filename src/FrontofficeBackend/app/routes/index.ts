import { Router, type Request, type Response, type NextFunction } from 'express'
import { UserAlreadyExistError } from '../../context/User/domain/errors/UserAlreadyExistError'
import userRoutes from './user.routes'

const router = Router()

router.use('/users', userRoutes)

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserAlreadyExistError) {
    res.status(400).json({ message: 'User already has ben registred' })
  } else {
    next(err)
  }
})

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err)
  res.status(500).json({ error: err })
})

export default router
