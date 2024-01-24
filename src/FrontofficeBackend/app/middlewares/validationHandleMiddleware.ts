import { Request, Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import { ResponseBase } from '../../context/Shared/application/ResponseBase';

export function validateReqSchema(req: Request, res: Response, next: NextFunction): void {
  const validationsErrors = validationResult(req);

  if (validationsErrors.isEmpty() as boolean) {
    next();
    return;
  }

  const errors = validationsErrors.array().map((err: ValidationError) => ({ [err.type]: err.msg }));

  const response = new ResponseBase(false, 'One or more validation errors were found', errors);
  res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ response });
}
