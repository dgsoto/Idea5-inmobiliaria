import { NextFunction, Request, Response, Router } from 'express';
import { CreateUserValidator } from '../../context/User/application/create/CreateUserValidator';
import { validateReqSchema } from '../middlewares/validationHandleMiddleware';
import { userRepository } from '../services';
import { CreateUserController } from '../controllers';
import { CreateUserUseCase } from '../../context/User/application/create/CreateUserUseCase';

const router = Router();

const controller = new CreateUserController(new CreateUserUseCase(userRepository));
router.put('/:id', CreateUserValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  await controller.run(req, res, next);
});

export default router;
