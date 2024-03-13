import 'reflect-metadata';
import { NextFunction, Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../Shared/infrastructure/api/validationErrorHandler';
import { IController } from '../../../Shared/infrastructure/api/IController';
import { CreateRoleValidator } from '../../application/create/CreateRoleValidator';
import { roleContainer } from '../../roleContainer';
import httpStatus from 'http-status';
import { ResponseBase } from '../../../Shared/application/ResponseBase';
import { RoleIdAlreadyExistError } from '../../domain/errors/RoleIdAlreadyExistError';
import { RoleIdNotExistError } from '../../domain/errors/RoleIdNotExistError';
import { UpdateRoleValidator } from '../../application/update/UpdateRoleValidator';
import { DeleteRoleValidator } from '../../application/delete/DeleteRoleValidator';

const router = Router();

const createController: IController = roleContainer.resolve('CreateRoleController');
const updateController: IController = roleContainer.resolve('UpdateRoleController');
const deleteController: IController = roleContainer.resolve('DeleteRoleController');

router.post('/', CreateRoleValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  /**
    #swagger.tags = ['Roles']
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/CreateRoleRequest" }
    }
     */
  await createController.run(req, res, next);
});

router.put('/:id', UpdateRoleValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  /**
    #swagger.tags = ['Roles']
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/components/schemas/UpdateRoleRequest" }
    }
     */
  await updateController.run(req, res, next);
});

router.delete('/:id', DeleteRoleValidator, validateReqSchema, async (req: Request, res: Response, next: NextFunction) => {
  /**
    #swagger.tags = ['Roles']
    }
     */
  await deleteController.run(req, res, next);
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
  } else if (err instanceof RoleIdNotExistError) {
    res
      .status(400)
      .json(
        new ResponseBase<void>(false, httpStatus.BAD_REQUEST, httpStatus[400], 'Error processing Role', undefined, [
          "Role with this 'id' was not been registred",
        ]),
      );
  } else {
    next(err);
  }
});
export default router;
