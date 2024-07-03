import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { inject, injectable } from 'tsyringe';
import { GetSentMessagesUseCase } from '../../application/getSentMessagesUseCase';
import { Message } from '../../domain/message';
import { Request, Response, NextFunction } from 'express';
import { ResponseBase } from 'src/modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';

type CreatePutRequest = Request & {
  body: {
    user_id: string;
  };
};

@injectable()
export class GetSentMessagesController implements IController {
  private _getSentMessagesUseCase: GetSentMessagesUseCase;

  constructor(@inject('GetSentMessagesUseCase') getSentMessagesUseCase: GetSentMessagesUseCase) {
    this._getSentMessagesUseCase = getSentMessagesUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const user_id = req.body;
      const result = await this._getSentMessagesUseCase.run(user_id);

      const response = new ResponseBase<Message[] | null>(true, httpStatus.OK, httpStatus[200], undefined, result);
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
