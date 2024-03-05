import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { inject, injectable } from 'tsyringe';
import { LoginUseCase } from '../../application/login/LoginUseCase';
import { NextFunction, Request, Response } from 'express';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import httpStatus from 'http-status';
import { LoginDTO } from '../../application/login/LoginDto';

type LoginRequest = Request & {
  body: {
    email: string;
    password: string;
  };
};

@injectable()
export class AuthController implements IController {
  private _loginUseCase: LoginUseCase;

  constructor(@inject('LoginUseCase') loginUseCase: LoginUseCase) {
    this._loginUseCase = loginUseCase;
  }

  public async run(req: LoginRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this._loginUseCase.run({ email, password });

      const response = new ResponseBase<LoginDTO>(true, httpStatus.OK, httpStatus[200], 'Login successfully!!', result);

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
