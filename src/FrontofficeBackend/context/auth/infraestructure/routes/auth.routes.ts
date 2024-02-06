import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { SigninValidator } from '../auth.validator';

const router = Router();

const authController = new AuthController();

router.post('/signin', SigninValidator, authController.signIn);

export default router;
