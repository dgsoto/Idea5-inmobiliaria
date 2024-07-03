import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { inject, injectable } from 'tsyringe';
import { GetReceivedMessagesUseCase } from '../../application/getReceivedMessagesUseCase';
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
export class GetReceivedMessagesController implements IController {
  private _getReceivedMessagesUseCase: GetReceivedMessagesUseCase;

  constructor(@inject('GetReceivedMessagesUseCase') getReceivedMessagesUseCase: GetReceivedMessagesUseCase) {
    this._getReceivedMessagesUseCase = getReceivedMessagesUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userEmail = req.body;
      const result = await this._getReceivedMessagesUseCase.run(userEmail);

      const response = new ResponseBase<Message[] | null>(true, httpStatus.OK, httpStatus[200], undefined, result);
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
