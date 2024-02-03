import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

const authController = new AuthController();

router.get(
  '/auth/signin',
  /*VALIDADORES*/ (req, res) => {
    return res.json('hola');
  },
);
router.post('/auth/signin', /*VALIDADORES*/ authController.signIn);
