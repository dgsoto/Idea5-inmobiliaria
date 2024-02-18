import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ResponseBase } from '../../application/ResponseBase';
import { InvalidArgumentError } from '../../domain/InvalidArgumentError';

export function invalidArgumentErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof InvalidArgumentError) {
    const response = new ResponseBase(false, httpStatus.BAD_REQUEST, httpStatus[400], err.message);
    res.status(httpStatus.BAD_REQUEST).json(response);
    return;
  }
  next(err);
}
