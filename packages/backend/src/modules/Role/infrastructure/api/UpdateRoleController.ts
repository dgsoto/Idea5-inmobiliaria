import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { IUpdateRoleRequest } from '../../application/update/IUpdateRoleRequest';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';

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
  private _updateRoleUseCase: IUseCase<IUpdateRoleRequest, void>;

  constructor(@inject('UpdateRoleUseCase') updateRoleUseCase: IUseCase<IUpdateRoleRequest, void>) {
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
