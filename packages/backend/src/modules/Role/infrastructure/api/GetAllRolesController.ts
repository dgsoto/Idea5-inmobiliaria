import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import { IController } from '../../../Shared/infrastructure/api/IController';
import httpStatus from 'http-status';
import { inject, injectable } from 'tsyringe';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { IUseCase } from 'src/modules/Shared/application/IUseCase';
import { GetAllRolesResponse } from '../../application/getAll/GetAllRolesResponse';

@injectable()
export class GetAllRolesController implements IController {
  private _getAllRolesUseCase: IUseCase<void, GetAllRolesResponse[]>;

  constructor(@inject('GetAllRolesUseCase') getAllRolesUseCase: IUseCase<void, GetAllRolesResponse[]>) {
    this._getAllRolesUseCase = getAllRolesUseCase;
  }

  public async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this._getAllRolesUseCase.run();

      const response = new ResponseBase<GetAllRolesResponse[]>(true, httpStatus.OK, httpStatus[200], undefined, result);

      res.status(httpStatus.OK).send(response);
    } catch (error) {
      next(error);
    }
  }
}
