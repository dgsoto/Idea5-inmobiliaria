import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { inject, injectable } from 'tsyringe';
import { GetMessageByContentUseCase } from '../../application/getMessageByContentUseCase';
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
export class GetMessageByContentController implements IController {
  private _getMessageByContentUseCase: GetMessageByContentUseCase;

  constructor(@inject('GetMessageByContentUseCase') getMessageByContentUseCase: GetMessageByContentUseCase) {
    this._getMessageByContentUseCase = getMessageByContentUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const content = req.body;
      const result = await this._getMessageByContentUseCase.run(content);

      const response = new ResponseBase<Message[] | null>(true, httpStatus.OK, httpStatus[200], undefined, result);
      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
