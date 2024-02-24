import { NextFunction, Request, Response, Router } from 'express';
import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { authContainer } from '../auth.container';
import { NotExistEmailError } from '../../application/errors/NotExistEmailError';
import { NotMatchedPasswordError } from '../../application/errors/NotMatchedPassError';
import { ResponseBase } from '../../../../modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';
import { LoginValidator } from '../../application/validations/auth.validator';
import { validateReqSchema } from '../../../../modules/Shared/infrastructure/api/validationErrorHandler';

const router = Router();

const controller: IController = authContainer.resolve('AuthController');

router.post('/', LoginValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  await controller.run(req, res, next);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof NotExistEmailError) {
    res
      .status(400)
      .json(new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error logging User', undefined, ['User is not register']));
  } else if (err instanceof NotMatchedPasswordError) {
    res
      .status(400)
      .json(new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error logging User', undefined, ['Incorrect Password']));
  } else {
    next(err);
  }
});

export default router;
