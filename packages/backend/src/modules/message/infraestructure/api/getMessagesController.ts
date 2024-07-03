import { inject, injectable } from 'tsyringe';
import { GetMessagesUseCase } from '../../application/getMessagesUseCase';
import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { Request, Response, NextFunction } from 'express';
import { ResponseBase } from 'src/modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';
import { Message } from '../../domain/message';

type CreatePutRequest = Request & {
  body: {
    email: string;
    user_id: string;
  };
};
@injectable()
export class GetMessagesController implements IController {
  private _getMessagesUseCase: GetMessagesUseCase;

  constructor(@inject('GetMessagesUseCase') getMessagesUseCase: GetMessagesUseCase) {
    this._getMessagesUseCase = getMessagesUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, user_id } = req.body;
      const result = await this._getMessagesUseCase.run(email, user_id);

      const response = new ResponseBase<Message[] | null>(true, httpStatus.OK, httpStatus[200], undefined, result);
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
