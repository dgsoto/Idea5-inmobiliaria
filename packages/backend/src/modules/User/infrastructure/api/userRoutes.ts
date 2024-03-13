import 'reflect-metadata';
import { NextFunction, Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../Shared/infrastructure/api/validationErrorHandler';
import { IController } from '../../../Shared/infrastructure/api/IController';
import { CreateUserValidator } from '../../application/create/CreateUserValidator';
import { userContainer } from '../../userContainer';
import httpStatus from 'http-status';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { UseIdAlreadyExistError } from '../../domain/errors/UseIdAlreadyExistError';
import { UserEmailAlreadyExistError } from '../../domain/errors/UserEmailAlreadyExistError';

const router = Router();

const controller: IController = userContainer.resolve('CreateUserController');

router.post('/', CreateUserValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  /**
    #swagger.tags = ['Users']
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/CreateUserRequest" }
    }
     */
  await controller.run(req, res, next);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserEmailAlreadyExistError) {
    res
      .status(400)
      .json(
        new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error registering new User', undefined, [
          "User with this 'email' already has been registred",
        ]),
      );
  } else if (err instanceof UseIdAlreadyExistError) {
    res
      .status(400)
      .json(
        new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error registering new User', undefined, [
          "User with this 'id' already has been registred",
        ]),
      );
  } else {
    next(err);
  }
});
export default router;
