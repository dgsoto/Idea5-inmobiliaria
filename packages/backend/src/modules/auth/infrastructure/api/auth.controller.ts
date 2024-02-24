import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { inject, injectable } from 'tsyringe';
import { LoginUseCase } from '../../application/logInUseCase';
import { NextFunction, Request, Response } from 'express';
import { ResponseBase } from '../../../../modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';

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

      const result = await this._loginUseCase.login(email, password);

      const response = new ResponseBase<any>(true, httpStatus.OK, httpStatus[200], 'Login successfully!!', result);

      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      next(error);
    }
  }
}
