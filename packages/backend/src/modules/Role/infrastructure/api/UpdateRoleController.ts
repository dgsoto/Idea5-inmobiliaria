import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { UpdateRoleUseCase } from '../../application/update/UpdateRoleUseCase';
import { ResponseBase } from '../../../Shared/application/ResponseBase';

type UpdateRoleRequest = Request & {
  params: {
    id: string;
  };
  body: {
    roleName: string;
    roleState: string;
  };
};

@injectable()
export class UpdateRoleController implements IController {
  private _updateRoleUseCase: UpdateRoleUseCase;

  constructor(@inject('UpdateRoleUseCase') updateRoleUseCase: UpdateRoleUseCase) {
    this._updateRoleUseCase = updateRoleUseCase;
  }

  public async run(req: UpdateRoleRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { roleName, roleState } = req.body;

      const result = await this._updateRoleUseCase.run({ id, roleName, roleState });

      const response = new ResponseBase<void>(true, httpStatus.OK, httpStatus[200], undefined, result);

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
