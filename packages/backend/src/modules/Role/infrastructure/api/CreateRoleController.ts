import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';
import { ICreateRoleRequest } from '../../application/create/ICreateRoleRequest';

type CreateRoleRequest = Request & {
  body: {
    id: string;
    roleName: string;
    roleState: string;
  };
};

@injectable()
export class CreateRoleController implements IController {
  private _createRoleUseCase: IUseCase<ICreateRoleRequest, void>;

  constructor(@inject('CreateRoleUseCase') createRoleUseCase: IUseCase<ICreateRoleRequest, void>) {
    this._createRoleUseCase = createRoleUseCase;
  }

  public async run(req: CreateRoleRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id, roleName, roleState } = req.body;

      const result = await this._createRoleUseCase.run({ id, roleName, roleState });

      const response = new ResponseBase<void>(true, httpStatus.CREATED, httpStatus[201], undefined, result);

      res.status(httpStatus.CREATED).send(response);
    } catch (error) {
      next(error);
    }
  }
}
