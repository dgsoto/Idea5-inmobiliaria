import { inject, injectable } from 'tsyringe';
import { DeleteMessageUseCase } from '../../application/deleteMessageUsecase';
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
export class DeleteMessageController implements IController {
  private _deleteMessageUseCase: DeleteMessageUseCase;

  constructor(@inject('DeleteMessageUseCase') deleteMessageUseCase: DeleteMessageUseCase) {
    this._deleteMessageUseCase = deleteMessageUseCase;
  }

  public async run(req: CreatePutRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.body;
      const result = await this._deleteMessageUseCase.run(id);

      const response = new ResponseBase<void>(true, httpStatus.OK, httpStatus[201], undefined, result);

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
