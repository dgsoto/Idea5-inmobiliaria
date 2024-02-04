import { Request, Response, NextFunction } from 'express';
import { CreateUserUseCase } from '../../../context/User/application/create/CreateUserUseCase';
import { IController } from '../IController';
import httpStatus from 'http-status';
import { ResponseBase } from '../../../context/Shared/application/ResponseBase';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

type CreatePutRequest = Request & {
  body: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
};

@injectable()
export class CreateUserController implements IController {
  private _createUserUseCase: CreateUserUseCase;

  constructor(@inject('CreateUserUseCase') createUserUseCase: CreateUserUseCase) {
    this._createUserUseCase = createUserUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, firstname, lastname, email, password } = req.body;

      const result = await this._createUserUseCase.run({ id, firstname, lastname, email, password });

      const response = new ResponseBase<void>(true, '', result);

      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      next(error);
    }
  }
}
