import { inject, injectable } from 'tsyringe';
import { CreateMessageUseCase } from '../../application/createMessage/createMessageUseCase';
import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { Request, Response, NextFunction } from 'express';
import { ResponseBase } from 'src/modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';

type CreatePutRequest = Request & {
  body: {
    id: number;
    email: string;
    cellphone: string;
    subject: string;
    message: string;
    user_id: string;
  };
};

@injectable()
export class CreateMessageController implements IController {
  private _createMessageUseCase: CreateMessageUseCase;

  constructor(@inject('CreateMessageUseCase') createMessageUseCase: CreateMessageUseCase) {
    this._createMessageUseCase = createMessageUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, email, phone, subject, message, user_id } = req.body;

      const result = await this._createMessageUseCase.run({ id, email, phone, subject, message, user_id });

      const response = new ResponseBase<void>(true, httpStatus.CREATED, httpStatus[201], undefined, result);

      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      next(error);
    }
  }
}
