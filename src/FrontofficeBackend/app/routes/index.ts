import { Router, type Request, type Response, type NextFunction } from 'express';
import { UserEmailAlreadyExistError } from '../../context/User/domain/errors/UserEmailAlreadyExistError';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import { UseIdAlreadyExistError } from '../../context/User/domain/errors/UseIdAlreadyExistError';
import { ResponseBase } from '../../context/Shared/application/ResponseBase';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof UserEmailAlreadyExistError) {
    res.status(400).json(new ResponseBase<void>(false, 'User with this email already has been registred'));
  } else if (err instanceof UseIdAlreadyExistError) {
    res.status(400).json(new ResponseBase(false, 'User with this Id already has been registred'));
  } else {
    next(err);
  }
});

router.use((err: Error, req: Request, res: Response) => {
  console.log(err);
  res.status(500).json({ error: err });
});

export default router;
