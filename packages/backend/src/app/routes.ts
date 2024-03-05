import { Router, type Request, type Response, type NextFunction } from 'express';
import { invalidArgumentErrorHandler } from '../modules/Shared/infrastructure/api/invalidArgumentErrorHandler';
import userRoutes from '../modules/User/infrastructure/api/userRoutes';
import authRoutes from '../modules/auth/infrastructure/api/authRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

router.use(invalidArgumentErrorHandler);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).end();
  next();
});

export default router;
