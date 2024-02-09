import { NextFunction, Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../Shared/infrastructure/api/validationHandleMiddleware';
import { container } from '../../../../app/container';
import { IController } from '../../../Shared/infrastructure/api/IController';
import { CreateUserValidator } from '../../application/create/CreateUserValidator';
import 'reflect-metadata';

const router = Router();

const controller: IController = container.resolve('CreateUserController');
router.put('/:id', CreateUserValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  await controller.run(req, res, next);
});

export default router;
