import { Request, Response, NextFunction } from 'express';
import { AuthRepository } from '../auth.repository';
import { AuthService } from '../../application/auth.service';

type SignInRequest = Request & {
  body: {
    email: string;
    password: string;
  };
};

export class AuthController {
  private readonly authService: AuthService;

  constructor() {
    const authRepository = new AuthRepository();
    this.authService = new AuthService(authRepository);
  }

  signIn = async (req: SignInRequest, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers);
      const { email, password } = req.body;
      const data = await this.authService.signIn(email, password);
      res.status(data.status).json({ ...data });
    } catch (error) {
      next(error);
    }
  };
}
