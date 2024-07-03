import { inject, injectable } from 'tsyringe';
import { ReadMessageUseCase } from '../../application/readMessageUseCase';
import { IController } from 'src/modules/Shared/infrastructure/api/IController';
import { Request, Response, NextFunction } from 'express';
import { ResponseBase } from 'src/modules/Shared/application/ResponseBase';
import httpStatus from 'http-status';

type CreatePutRequest = Request & {
  body: {
    id: string;
  };
};

@injectable()
export class ReadMessageController implements IController {
  private _readMessageUseCase: ReadMessageUseCase;

  constructor(@inject('ReadMessageUseCase') readMessageUseCase: ReadMessageUseCase) {
    this._readMessageUseCase = readMessageUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.body;
      const result = await this._readMessageUseCase.run(id);

      const response = new ResponseBase<void>(true, httpStatus.OK, httpStatus[200], undefined, result);

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
