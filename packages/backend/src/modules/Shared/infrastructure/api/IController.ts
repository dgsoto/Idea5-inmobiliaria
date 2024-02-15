import { NextFunction, Request, Response } from 'express';

export interface IController {
  run(req: Request, res: Response, next: NextFunction): Promise<void> | void;
}
