import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { CreateUserUseCase } from '../../application/create/CreateUserUseCase';
import { ResponseBase } from '../../../Shared/application/ResponseBase';

type CreateUserRequest = Request & {
  body: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
  };
};

@injectable()
export class CreateUserController implements IController {
  private _createUserUseCase: CreateUserUseCase;

  constructor(@inject('CreateUserUseCase') createUserUseCase: CreateUserUseCase) {
    this._createUserUseCase = createUserUseCase;
  }

  public async run(req: CreateUserRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, firstname, lastname, email, password, phone } = req.body;

      const result = await this._createUserUseCase.run({ id, firstname, lastname, email, password, phone });

      const response = new ResponseBase<void>(true, httpStatus.CREATED, httpStatus[201], undefined, result);

      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      next(error);
    }
  }
}
