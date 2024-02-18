import { Router, type Request, type Response, type NextFunction } from 'express';
import userRoutes from '../modules/User/infrastructure/api/user.routes';
import { invalidArgumentErrorHandler } from '../modules/Shared/infrastructure/api/invalidArgumentErrorHandler';

const router = Router();

router.use('/users', userRoutes);

router.use(invalidArgumentErrorHandler);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).end();
  next();
});

export default router;
