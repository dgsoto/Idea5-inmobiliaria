import 'reflect-metadata';
import { NextFunction, Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../Shared/infrastructure/api/validationErrorHandler';
import { IController } from '../../../Shared/infrastructure/api/IController';
import { CreateRoleValidator } from '../../application/create/CreateRoleValidator';
import { roleContainer } from '../../roleContainer';
import httpStatus from 'http-status';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { RoleIdAlreadyExistError } from '../../domain/errors/RoleIdAlreadyExistError';

const router = Router();

const controller: IController = roleContainer.resolve('CreateRoleController');

router.post('/', CreateRoleValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  /**
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/CreateRoleRequest" }
    }
     */
  await controller.run(req, res, next);
});

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof RoleIdAlreadyExistError) {
    res
      .status(400)
      .json(
        new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error registering new Role', undefined, [
          "Role with this 'id' already has been registred",
        ]),
      );
  } else {
    next(err);
  }
});
export default router;
