import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';

type DeleteRoleRequest = Request & {
  params: {
    id: string;
  };
};

@injectable()
export class DeleteRoleController implements IController {
  private _deleteRoleUseCase: IUseCase<string, void>;

  constructor(@inject('DeleteRoleUseCase') deleteRoleUseCase: IUseCase<string, void>) {
    this._deleteRoleUseCase = deleteRoleUseCase;
  }

  public async run(req: DeleteRoleRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const result = await this._deleteRoleUseCase.run(id);

      const response = new ResponseBase<void>(true, httpStatus.OK, httpStatus[200], undefined, result);

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
