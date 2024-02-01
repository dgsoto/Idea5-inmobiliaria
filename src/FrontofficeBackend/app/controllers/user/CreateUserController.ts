import { type Request, type NextFunction, type Response } from 'express';
import { CreateUserUseCase } from '../../../context/User/application/create/CreateUserUseCase';
import { IController } from '../IController';
import httpStatus from 'http-status';
import { ResponseBase } from '../../../context/Shared/application/ResponseBase';

type CreatePutRequest = Request & {
  body: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
  };
};

export class CreateUserController implements IController {
  private _createUserUseCase: CreateUserUseCase;
  constructor(createUserUseCase: CreateUserUseCase) {
    this._createUserUseCase = createUserUseCase;
  }
  async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    const { id, firstname, lastname, email, password } = req.body;

    await this._createUserUseCase
      .run({ id, firstname, lastname, email, password })
      .then((result) => {
        const response = new ResponseBase<void>(true, '', {}, result);
        res.status(httpStatus.CREATED).send(response);
        return response;
      })
      .catch((error) => {
        next(error);
        const response = new ResponseBase<void>(false, 'Error occurred', error.message);
        return response;
      });
  }
}
