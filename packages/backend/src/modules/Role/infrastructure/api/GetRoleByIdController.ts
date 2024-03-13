import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { GetRoleByIdUseCase } from '../../application/getById/GetRoleByIdUseCase';
import { GetRoleByIdResponse } from '../../application/getById/GetRoleByIdResponse';

type GetRoleByIdRequest = Request & {
  params: {
    id: string;
  };
};

@injectable()
export class GetRoleByIdController implements IController {
  private _getRoleByIdUseCase: GetRoleByIdUseCase;

  constructor(@inject('GetRoleByIdUseCase') getRoleByIdUseCase: GetRoleByIdUseCase) {
    this._getRoleByIdUseCase = getRoleByIdUseCase;
  }

  public async run(req: GetRoleByIdRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const result = await this._getRoleByIdUseCase.run(id);

      const response = new ResponseBase<GetRoleByIdResponse>(true, httpStatus.OK, httpStatus[200], undefined, result);

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
