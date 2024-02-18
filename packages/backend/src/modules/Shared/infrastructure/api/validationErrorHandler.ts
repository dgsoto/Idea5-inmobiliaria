import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import { ResponseBase } from '../../application/ResponseBase';

export function validateReqSchema(req: Request, res: Response, next: NextFunction): void {
  const validationsErrors = validationResult(req);

  if (validationsErrors.isEmpty() as boolean) {
    next();
    return;
  }

  const errors: string[] = validationsErrors.array().map((err: ValidationError) => err.msg);

  const response = new ResponseBase(false, httpStatus.UNPROCESSABLE_ENTITY, httpStatus[422], 'Error validating registration data', undefined, errors);
  res.status(httpStatus.UNPROCESSABLE_ENTITY).json(response);
}
