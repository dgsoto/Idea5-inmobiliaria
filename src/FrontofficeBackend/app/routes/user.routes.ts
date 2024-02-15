import { NextFunction, Request, Response, Router } from 'express';
import { createUserController } from '../controllers/user/createUserController';
import { CreateUserValidator } from '../../context/User/application/create/CreateUserValidator';
import { validateReqSchema } from '../middlewares/validationHandleMiddleware';
import { userRepository } from '../services';

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).send('lista de usuarios');
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put('/:id', CreateUserValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  await createUserController(req, res, next, userRepository);
});

export default router;
