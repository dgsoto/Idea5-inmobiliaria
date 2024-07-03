import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { inject, injectable } from 'tsyringe';
import { GetMessageByEmailUseCase } from '../../application/getMessageByEmailUseCase';
import { Message } from '../../domain/message';
import { Request, Response, NextFunction } from 'express';
import { ResponseBase } from 'src/modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';

type CreatePutRequest = Request & {
  body: {
    email: string;
  };
};

@injectable()
export class GetMessagesByEmailController implements IController {
  private _getMessageByEmailUseCase: GetMessageByEmailUseCase;

  constructor(@inject('GetMessageByEmailUseCase') getMessageByEmailUseCase: GetMessageByEmailUseCase) {
    this._getMessageByEmailUseCase = getMessageByEmailUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const email = req.body;
      const result = await this._getMessageByEmailUseCase.run(email);

      const response = new ResponseBase<Message[] | null>(true, httpStatus.OK, httpStatus[200], undefined, result);
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
