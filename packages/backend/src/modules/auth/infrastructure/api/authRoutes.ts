import { NextFunction, Request, Response, Router } from 'express';
import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { authContainer } from '../authContainer';
import { NotExistEmailError } from '../../domain/errors/NotExistEmailError';
import { NotMatchedPasswordError } from '../../domain/errors/NotMatchedPassError';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import httpStatus from 'http-status';
import { loginValidator } from '../../application/login/loginValidator';
import { validateReqSchema } from '../../../Shared/infrastructure/api/validationErrorHandler';

const router = Router();

const controller: IController = authContainer.resolve('AuthController');

router.post('/login', loginValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  /**
    #swagger.tags = ['Authentication']
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/LoginRequest" }
    }
     */
  await controller.run(req, res, next);
});

//router.post('/email/verify');
//router.post('/token/refresh');
//router.post('/password/reset');
//router.post('/password/confirm');
//router.post('/password/change');
//router.get('/logout');

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof NotExistEmailError) {
    res
      .status(400)
      .json(
        new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error logging User', undefined, [
          'User width this email was not register',
        ]),
      );
  } else if (err instanceof NotMatchedPasswordError) {
    res
      .status(400)
      .json(new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error logging User', undefined, ['Incorrect Password']));
  } else {
    next(err);
  }
});

export default router;
