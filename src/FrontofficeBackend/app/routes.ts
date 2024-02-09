import { Router, type Request, type Response, type NextFunction } from 'express';
import { UserEmailAlreadyExistError } from '../modules/User/domain/errors/UserEmailAlreadyExistError';
import userRoutes from '../modules/User/infrastructure/api/user.routes';
import { UseIdAlreadyExistError } from '../modules/User/domain/errors/UseIdAlreadyExistError';
import { ResponseBase } from '../modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';

const router = Router();

router.use('/users', userRoutes);

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

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).end();
  next();
});

export default router;
