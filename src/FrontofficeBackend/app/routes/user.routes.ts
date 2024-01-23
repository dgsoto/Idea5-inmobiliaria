import { Router } from 'express'
import { createUserController } from '../controllers/user/createUserController'

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', async (req, res, next) => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
  await new Promise<void>(async (resolve, reject) => {
    try {
      await createUserController(req, res, next)
      resolve()
    } catch (error) {
      reject(error)
    }
  })
})

export default router
