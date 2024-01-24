import { Router } from 'express'
import { createUserController } from '../controllers/user/createUserController'
import { CreateUserValidator } from '../../context/User/application/create/CreateUserValidator'
import { validateReqSchema } from '../middlewares/validationHandleMiddleware'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', CreateUserValidator, validateReqSchema, createUserController)

export default router
