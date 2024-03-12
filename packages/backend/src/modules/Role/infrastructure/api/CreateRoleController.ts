import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { CreateRoleUseCase } from '../../application/create/CreateRoleUseCase';
import { ResponseBase } from '../../../Shared/application/ResponseBase';

type CreateRoleRequest = Request & {
  body: {
    id: string;
    roleName: string;
    roleState: string;
  };
};

@injectable()
export class CreateRoleController implements IController {
  private _createRoleUseCase: CreateRoleUseCase;

  constructor(@inject('CreateRoleUseCase') createRoleUseCase: CreateRoleUseCase) {
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
